import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {Cluster} from "../models/cluster";
import {getStorage, setStorage} from "../core/utiles";
import {NbDialogService} from "@nebular/theme";
import {ClusterDialogComponent} from "./cluster-dialog/cluster-dialog.component";
import {DeviceType, FogDevice} from "../models/fogDevice/fogdevice.model";
import {Sensor} from "../models/sensor/sensor";
import {Broker} from "../models/broker.model";
import {Server} from "../models/server.model";
import {Gateway} from "../models/gateway.model";
import {SaveDialogComponent} from "./save-dialog/save-dialog.component";
import scenarios from '../../../../assets/iot/scenarios.json';
import {FogDeviceType} from "../models/fog_device_type.enum";
import { SensorType } from "../models/sensor_type.enum";

@Injectable({
  providedIn: "root",
})
export class ClusterService {

  currentClusterId: BehaviorSubject<string> = new BehaviorSubject(null);
  drawFogDeviceConnectionLines: Subject<any> = new Subject();
  private initClusters = this.getScenarioByJsonInfo(scenarios[0]);
  private currentClusters = [...this.initClusters];
  clusters$ = new BehaviorSubject<Cluster[]>([...this.initClusters]);
  clustersHistory$: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.clustersHistory
  );

  constructor(private dialogService: NbDialogService) {
  }

  get clusterList(): Cluster[] {
    return this.currentClusters;
  }

  resetClusters() {
    this.clusterList = this.initClusters;
  }

  private get clustersHistory(): {} {
    const t = getStorage("clusters");
    if (Object.keys(t)?.length) {
      return t
    } else {
      const clustersHistory = {}
      scenarios.forEach((scenario) => {
        clustersHistory[scenario.name] = this.getScenarioByJsonInfo(scenario)
      });
      return clustersHistory;

    }
  }

  addScenarioToLocalStorage(name: string, value: any): void {
    const clustersHistory = this.clustersHistory;
    clustersHistory[name] = value;
    const str = JSON.stringify(clustersHistory);
    localStorage.setItem("clusters", str);
    this.clustersHistory$.next(clustersHistory);
  }

  save(value: any): void {
    this.dialogService
      .open<any>(SaveDialogComponent)
      .onClose.subscribe((data: any) => {
      this.addScenarioToLocalStorage(data.name, value);
    });
  }

  deleteClustersFromHistory(name: string): void {
    const clustersHistory = this.clustersHistory;
    delete clustersHistory[name];
    setStorage("clusters", clustersHistory);
    this.clustersHistory$.next(clustersHistory);
  }

  set clusterList(clusters) {
    this.currentClusters = [...clusters];
    this.clusters$.next(this.currentClusters);
  }

  addToClusterList(cluster: Cluster): void {
    this.currentClusters.push(cluster);
    this.clusterList = this.currentClusters;
  }

  getScenarioByJsonInfo(scenario: any): Cluster[] {
    const devices = [];
    const sensors = [];
    const server = new Server(scenario.name + '-server');
    const broker = new Broker(scenario.name + '-broker');
    const gateway = new Gateway(scenario.name + '-gateway');
    for (let i = 1; i <= scenario.cluster.fogDevicesCount; i++) {
      const type = i <= scenario.cluster.laptopCount ? DeviceType.laptop : DeviceType.mobile;
      const device = new FogDevice(scenario.name + '-device-' + i, type);
      if (i === 1) {
        device.type = FogDeviceType.Warner;
      }
      devices.push(device);
    }
    for (let i = 1; i <= scenario.cluster.sensorsCount; i++) {
      const sensor = new Sensor(scenario.name + '-sensor-' + i);
      if (i == 1) {
        sensor.sensorType = SensorType.TEMPERATURE;
      }else if (i ==2) {
        sensor.sensorType = SensorType.GAS;
      }else if (i ===3) {
        sensor.sensorType = SensorType.SMOKE;
      }else if (i % 2===0) {
        sensor.sensorType = SensorType.HUMIDITY;
      }else if (i % 3===0) {
        sensor.sensorType = SensorType.SOUND;
      } else {
        sensor.sensorType = SensorType.PRESSURE;
      }


      sensors.push(sensor);
    }
    const cluster = new Cluster(scenario.name + '-cluster', devices, server, broker, sensors, gateway);
    return [cluster];
  }

  creatNewCluster(): void {
    this.dialogService
      .open(ClusterDialogComponent)
      .onClose.subscribe((cluster: Cluster) => {
      const newCluster = {...new Cluster(), ...cluster};

      if (newCluster) {
        this.addToClusterList(newCluster);
      }
    });
  }

  deleteDeviceFromCluster(fogDevice: FogDevice, cluster: Cluster): void {
    cluster.fogDeviceList = cluster.fogDeviceList.filter(
      (device) => device === fogDevice
    );
    this.drawFogDeviceConnectionLines.next();
  }

  addServer(cluster: Cluster, server: Server): void {
    cluster.server = server;
  }

  addSensor(cluster: Cluster, sensor: Sensor): void {
    cluster.sensorList.push(sensor);
  }

  addFogDevice(cluster: Cluster, fogDevice: FogDevice): void {
    cluster.fogDeviceList.push(fogDevice);
  }

  addGateway(cluster: Cluster, gateway: Gateway): void {
    cluster.gateway = gateway;
  }

  addBroker(cluster: Cluster, broker: Broker): void {
    cluster.broker = broker;
  }
}
