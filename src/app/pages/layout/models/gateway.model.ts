export class Gateway {
  id: string;
  name: string;
  brokerId: string;
  delay: number = 0;
  clusterName: string;
  constructor(name?: string) {
    this.name = name;
  }
}
