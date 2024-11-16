export class Broker {
  id: string;
  name: string;
  serverId: string;
  delay: number = 0;
  validSize: [number, number] = [10, 8000];
  validCpuLength: [number, number] = [100, 4000];
  clusterName: string;
  animLeft?: string;
  animTop?: string;
  constructor(name?: string) {
    this.name = name;
  }
}
