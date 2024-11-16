import {Injectable} from '@angular/core';
import {SensorService} from '../sensor/sensor.service';
import {GatewayService} from '../fog-gateway/gateway.service';
import {BrokerService} from '../broker/broker.service';
import {ServerService} from '../server/server.service';
import {FogDeviceService} from '../fog-device/fog-device.service';
import {CloudService} from '../cloud/cloud.service';
import {interval, Subject, timer} from 'rxjs';
import {delay, filter, tap} from 'rxjs/operators';
import {SensorType} from './enums/sensor-type.enum';
import {ClusterService} from '../cluster/cluster.service';
import {Cluster} from '../models/cluster';
import {isBroker, isDevice, isGateway, isSensor, isServer} from './utiles';
import Result = jasmine.Result;
import {ServerType} from '../models/server.model';
import {Event} from '../models/event';
import {EventType} from '../models/event_type.enum';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {
  showResults$ = new Subject<Result>();
  cost$ = new Subject<number>();
  networkUsage$ = new Subject<number>();
  energyConsumed$ = new Subject<number>();
  runTime$ = new Subject<number>();
  _eventsQueue: Event[] = [];
  logs$= new Subject<Event[]>();
  logs: Event[] = [];
  constructor(
    private sensorService: SensorService,
    private gatewayService: GatewayService,
    private brokerService: BrokerService,
    private serverService: ServerService,
    private fogDeviceService: FogDeviceService,
    private cloudService: CloudService,
    private clusterService: ClusterService
  ) {
    interval(200).pipe(
      filter(() => !!this._eventsQueue[0]),
      tap(() => {
        this.handleEvent(this._eventsQueue[0]);
        this._eventsQueue.shift();
      })
    ).subscribe()
  }

  newEvent(event: Event): void {
    this._eventsQueue.push(event);
  }


  handleEvent(event: Event): void {
    const sensorType = event.data.sensorType;
    const eventType = event.eventType;
    const senderId = event.senderId;
    const receiverId = event.receiverId;
    const data = event.data;
    this.logs.unshift(event)
    this.logs$.next(this.logs);
    if (eventType == EventType.INITIALIZE_APP) {
      this.clusterService.clusterList = event.clusterList;
      return;
    }
    if (eventType == EventType.RESULT) {
      const newResult = event.result;
      const currentMethod = localStorage.getItem('currentMethod') || '';
      const oldResult = localStorage.getItem('results') ? JSON.parse(localStorage.getItem('results') ):{
        uploadCost: {},
        downloadCost:  {},
        energyCost:  {},
        transferCost:  {},
        runtime:  {},
        storageCost: {},
        accessibility:  {},
        availability:  {},
        totalCpuTime:  {},
        networkCost:  {},
      };


      oldResult.uploadCost[currentMethod] = newResult.uploadCost;
      oldResult.downloadCost[currentMethod] = newResult.downloadCost;
      oldResult.energyCost[currentMethod] = newResult.energyCost;
      oldResult.transferCost[currentMethod] = newResult.transferCost;
      oldResult.runtime[currentMethod] = newResult.runtime;
      oldResult.storageCost[currentMethod] = newResult.storageCost;
      oldResult.accessibility[currentMethod] = newResult.accessibility;
      oldResult.availability[currentMethod] = newResult.availability;
      oldResult.totalCpuTime[currentMethod] = newResult.totalCpuTime;
      oldResult.networkCost[currentMethod] = newResult.networkCost;
      localStorage.setItem('results', JSON.stringify(oldResult))
      return;
    }
    if (isSensor(receiverId)) {
      this.sensorService.setCurrentSensor(receiverId, sensorType);
    } else if (isGateway(receiverId)) {
      if (isSensor(senderId)) {
        this.sensorService.animationToGateWay(senderId, sensorType);
      }
      setTimeout(() => {
        this.gatewayService.setCurrentGateway(receiverId, sensorType);
      }, 1000)
    } else if (isBroker(receiverId)) {
      if (isGateway(senderId)) {
        this.gatewayService.animationToBroker(senderId, sensorType)
      }
      setTimeout(() => {
        this.brokerService.setCurrentBroker(receiverId);
      }, 1000);
    } else if (isServer(receiverId)) {
      let delay = 500;
      if (isBroker(senderId)) {
        this.brokerService.animationToServer(senderId, sensorType);
        delay = 1000;
      } else if (isDevice(senderId)) {
        this.fogDeviceService.animateToServer(senderId, sensorType);
      }
      setTimeout(() => {
        this.serverService.setCurrentServer(receiverId, ServerType.Core);
      }, delay)
    } else if (isDevice(receiverId)) {
      if (isServer(senderId)) {
        this.fogDeviceService.playAnimationFromServerToDevice(receiverId, sensorType)
      }
      setTimeout(() => {
        this.fogDeviceService.setCurrentFogDevice(receiverId)
      }, 500)
    }
  }

  get events(): Event[] {
    return this._eventsQueue;
  }


// start(){
  //   const sensorType = SensorType.SMOKE;
  //   const sensor = new Sensor('default-sensor-3','2');
  //   const server = new Server('default-server');
  //   const broker = new Broker('default-broker');
  //   const gateway = new Gateway( 'default-gateway');
  //   const device = new FogDevice('default-device-1', DeviceType.laptop,'3')
  //   timer(2000, 13000).pipe(
  //     tap(()=>        this.sensorService.setCurrentSensor('3',sensorType)), delay(2000),
  //     tap(()=>this.gatewayService.setCurrentGateway('0',sensorType)), delay(2000),
  //     tap(()=>this.brokerService.setCurrentBroker('broker',sensorType)), delay(2000),
  //     tap(()=> this.serverService.setCurrentServer('u', ServerType.Garbage,new Tuple())), delay(1500),
  //     tap(()=> this.fogDeviceService.setCurrentFogDevice('2',sensorType)), delay(2000),
  //     tap(()=>this.cloudService.changeCloudActivity(true)), delay(2000),
  //   ).subscribe()
  // }

  // handleEvent(event: Event): void {
//     const eventType = event.eventType;
//     const sender = event.currentEntityId;
//     const receiver = event.nextEntityId;
//     const delay = event.delay;
//     const data = event.data;
//     this._events.push(event);
//     switch (eventType) {
//       case EventType.INITIALIZE_APP:
//         const clusters = data || [];
//         this.appService.clusterList = clusters as Cluster[];
//         break;
//       case EventType.TUPLE_ARRIVAL:
//         this.sensorService.setCurrentSensor(sender);
//         setTimeout(() => {
//           this.gatewayService.setCurrentGateway(receiver);
//         }, delay);
//         // فرستنده: سنسور
//         // گیرنده: گیت وی
//         // دیتا: تاپل
//         break;
//       case EventType.START_SIMULATION:
//         this.appService.changeAllButtonsActivity(false);
//         // فرستنده: "EVENTBUS"
//         // گیرنده: ""
//         // دیتا: null
//         // وقتیکه اومد من دکمه هایبالای سیستمرو غیر فعال
//         break;
//       case EventType.BROKER_TUPLE:
//         this.gatewayService.setCurrentGateway(sender);
//         setTimeout(() => {
//           this.brokerService.setCurrentBroker(receiver);
//         }, delay);
//         // فرستنده: گیت وی
//         // گیرنده: بروکر
//         // دیتا: تاپل
//         break;
//       case EventType.SERVER_TUPLE:
//         const tuple = data;
//         this.brokerService.setCurrentBroker(sender);
//         if (tuple) {
//           this.serverService.updateServerTuple(tuple);
//         }
//         setTimeout(() => {
//           this.serverService.setCurrentServer(receiver, ServerType.Core, tuple);
//         }, delay);
//         // آپدیت لیست تاپل های سرور
//         // اگه تاپپل ای با اون آی دی بود قبلی رو پاک کن و اضافه کن در غیر این صورت جدیدو اضافه کن
//         // فرستنده: بروگر
//         // گیرنده: سرور
//         // دیتا: تاپل
//         break;
//       case EventType.DEVICE_COPY_TUPLE:
//         this.serverService.setCurrentServer(sender, ServerType.Core);
//         setTimeout(() => {
//           this.fogDeviceService.setCurrentFogDevice(receiver);
//         }, delay);
//         // فرستنده: سرور
//         // گیرنده: فاگ دیوایس
//         // دیتا: تاپل
//         break;
//       case EventType.DEVICE_PROCESS_TUPLE:
//         this.serverService.setCurrentServer(sender, ServerType.Core);
//         setTimeout(() => {
//           this.fogDeviceService.setCurrentFogDevice(receiver);
//         }, delay);
//
//         // فرستنده: سرور
//         // گیرنده: فاگ دیوایس
//         // دیتا: تاپل
//         break;
//       case EventType.UPDATE_TUPLE:
//         this.serverService.setCurrentServer(sender, ServerType.Core);
//         setTimeout(() => {
//           this.fogDeviceService.setCurrentFogDevice(receiver);
//         }, delay);
//         break;
//       // فرستنده: سرور
//       // گیرنده: فاگ دیوایس
//       // دیتا: تاپل
//       case EventType.ACTUATOR_TUPLE:
//         // do something
//         break;
//       case EventType.DEVICE_DELETE_TUPLE:
//         this.serverService.setCurrentServer(sender, ServerType.Garbage);
//         setTimeout(() => {
//           this.fogDeviceService.setCurrentFogDevice(receiver);
//         }, delay);
//         break;
// // (garbage )فرستنده: سرور
//       // گیرنده: فاگ دیوایس
//       // دیتا: تاپل
//       case EventType.MONITOR_DELETE_TUPLE:
//         // do something
//         break;
//       case EventType.UPDATE_DEVICES_STATE:
//         const device = data;
//         this.fogDeviceService.setCurrentFogDevice(sender, device);
//         setTimeout(() => {
//           this.serverService.setCurrentServer(receiver, ServerType.Core);
//         }, delay);
//
//         // فرستنده: فاگ دی.ایس
//         // گیرنده: سرور(کور)
//         // دیتا: فاگ دیوایس
//         break;
//       case EventType.UPDATE_SERVER_STATE:
//         this.serverService.setCurrentServer(receiver, ServerType.Core);
//         // فرستنده: سرور(کور)
//         // گیرنده: سرور(کور)
//         // دیتا: فاگ دیوایس
//         break;
//       case EventType.TUPLE_PROCESS_FINISHED:
//         this.fogDeviceService.setCurrentFogDevice(sender);
//         setTimeout(() => {
//           this.serverService.setCurrentServer(receiver, ServerType.Garbage);
//         }, delay);
// // فرستنده: فاگ دی.ایس
//         // گیرنده: سرور(گاربج)
//         // دیتا:تاپل
//         break;
//       case EventType.DECREASE_NUMBER_OF_TUPLE_COPIES:
//         this.serverService.setCurrentServer(sender, ServerType.Runtimetime);
//         setTimeout(() => {
//           this.serverService.setCurrentServer(receiver, ServerType.Core);
//         }, delay);
//
// // (runtime )فرستنده: سرور
//         // گیرنده: سرور
//         // دیتا: عدد
//         break;
//       case EventType.INCREASE_NUMBER_OF_TUPLE_COPIES:
//         this.serverService.setCurrentServer(sender, ServerType.Runtimetime);
//         setTimeout(() => {
//           this.serverService.setCurrentServer(receiver, ServerType.Core);
//         }, delay);
// // (runtime )فرستنده: سرور
//         // گیرنده: سرور
//         // دیتا: عدد
//         break;
//       case EventType.UPDATE_TUPLE_CONFIG:
//         this.serverService.setCurrentServer(sender, ServerType.Runtimetime);
//         setTimeout(() => {
//           this.serverService.setCurrentServer(sender, ServerType.Runtimetime);
//         }, delay);
//         // (runtime )فرستنده: سرور
//         //  گیرنده:=سرور (core)
//         // دیتا: placment config
//         break;
//       case EventType.UPDATE_DEVICE_CONFIG:
//         this.serverService.setCurrentServer(sender, ServerType.Runtimetime);
//         setTimeout(() => {
//           this.fogDeviceService.setCurrentFogDevice(receiver);
//         }, delay);
//         // (runtime )فرستنده: سرور
//         //  گیرنده:فاگ دیوایبس
//         // دیتا: یه لیست 5تایی از اعداد
//         break;
//       case EventType.UPDATE_DEVICE_TASK_CONFIG:
//         this.serverService.setCurrentServer(sender, ServerType.Runtimetime);
//         setTimeout(() => {
//           this.fogDeviceService.setCurrentFogDevice(receiver);
//         }, delay);
// // (runtime )فرستنده: سرور
//         //  گیرنده:فاگ دیوایبس
//         // دیتا: یه لیست 3تایی از اعداد
//         break;
//       case EventType.DELETE_DEVICE_TUPLE:
//         this.serverService.setCurrentServer(sender, ServerType.Garbage);
//         setTimeout(() => {
//           this.fogDeviceService.setCurrentFogDevice(receiver);
//         }, delay);
// // (گاربج )فرستنده: سرور
//         //  گیرنده:فاگ دیوایبس
//         // دیتا: تاپل
//         break;
//       case EventType.SHOT_DOWN_FOG_DEVICE:
//         this.serverService.setCurrentServer(sender, ServerType.Core);
//         setTimeout(() => {
//           this.fogDeviceService.setCurrentFogDevice(receiver);
//         }, delay);
// // (کور )فرستنده: سرور
//         //  گیرنده:فاگ دیوایبس
//         // دیتا: null
//         break;
//       case EventType.ADD_FOG_DEVICE:
//         this.serverService.setCurrentServer(sender, ServerType.Core);
//         setTimeout(() => {
//           this.fogDeviceService.setCurrentFogDevice(receiver);
//         }, delay);
// // (کور )فرستنده: سرور
//         //  گیرنده:فاگ دیوایبس
//         // دیتا: fog device
//         break;
//       case EventType.STOP_EXECUTION:
//         this.appService.changeAllButtonsActivity(true);
// // فرستنده: "Central System"
//         //  گیرنده:""
//         // دیتا: null
//         break;
//       case EventType.UPDATE_NETWORK_USAGE:
//         this.serverService.setCurrentServer(sender, ServerType.Core);
//         // sum
//         // (کور )فرستنده: سرور
//         //  گیرنده:""
//         // دیتا: عدد
//         // عددد قبلی را با عدد جدید جمع و ریپلیس کنمعدد قبلب را در یککانستدر سیستم ذخیره داریم و مقدار اولیه 0 است
//         break;
//       case EventType.UPDATE_NETWORK_USAGE_WEB:
//         this.networkUsage$.next(data);
//         // دیتا: عدد
//         break;
//       case EventType.UPDATE_ENERGY_CONSUMED:
//         const serverr = this.serverService.getServerById(sender);
//         if (serverr) {
//           this.serverService.setCurrentServer(sender, ServerType.Core);
//           break;
//         } else {
//           this.fogDeviceService.setCurrentFogDevice(sender);
//         }
//
//         // (کور )فرستنده: فاگ دیوایس یا سرور
//         //  گیرنده:""
//         // دیتا: عدد
//
//         break;
//       case EventType.UPDATE_ENERGY_CONSUMED_WEB:
//         this.energyConsumed$.next(data);
//         break;
//       case EventType.UPDATE_TUPLE_RUNTIME:
//         this.fogDeviceService.setCurrentFogDevice(sender);
//
//         // (کور )فرستنده: فاگ دیوایس
//         //  گیرنده:""
//         // دیتا: عدد
//         break;
//       case EventType.UPDATE_TUPLE_RUNTIME_WEB:
//         this.runTime$.next(data);
//         // دیتا: عدد
//         break;
//       case EventType.UPDATE_DEVICE_COST:
//         this.fogDeviceService.setCurrentFogDevice(sender);
//
//         // (کور )فرستنده: فاگ دیوایس
//         //  گیرنده:""
//         // دیتا: عدد
//
//         break;
//       case EventType.UPDATE_DEVICE_COST_WEB:
//         this.cost$.next(data);
//         break;
//       case EventType.CHECK_FOR_FINISH_TASK:
//         // do nothing
//
//         break;
//       case EventType.SHOW_RESULTS:
//         this.serverService.setCurrentServer(sender, ServerType.Core);
//         this.showResults$.next(data as Result);
//
//         // (کور )فرستنده: سرور
//         //  گیرنده:""
//         // دیتا: null
//         break;
//       case EventType.CLOUD_TUPLE:
//         const server = this.serverService.getServerById(sender);
//         if (server) {
//           this.serverService.setCurrentServer(sender, ServerType.Core);
//         } else {
//           this.brokerService.setCurrentBroker(sender);
//         }
//         setTimeout(() => {
//           this.cloudService.changeCloudActivity(true);
//         }, delay);
//         break;
//       // یا بروکر (کور )فرستنده: سرور
//       //  گیرنده:cloud
//       // دیتا: تاپل
//     }
//   }

}
