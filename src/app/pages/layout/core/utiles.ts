export function setStorage(key: string, value: any): void {
  const str = JSON.stringify(value);
  localStorage.setItem(key, str);
}

export function getStorage(key: string): any {
  const json = localStorage.getItem(key);
  return json ? JSON.parse(json) : {};
}
// isSensor
export function isCluster(id: string): boolean {
  return id.startsWith('C');
}

// isSensor
export function isSensor(id: string): boolean {
  return id.includes('Sensor');
}

// isDevice
export function isDevice(id: string): boolean {
  return id.includes('D');
}

// isServer
export function isServer(id: string): boolean {
  return id.endsWith('S');
}

// isGateway
export function isGateway(id: string): boolean {
  return id.endsWith('G');
}

// isBroker
export function isBroker(id: string): boolean {
  return id.endsWith('B');
}

