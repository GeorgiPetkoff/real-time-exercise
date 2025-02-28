export class Device {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  ipAddress: string;
  location: string;
  status: string;
  
  constructor(id: string, name: string, model: string, serialNumber: string, ipAddress: string, location: string, status: string){
    this.id = id;
    this.name = name;
    this.model = model;
    this.serialNumber = serialNumber;
    this.ipAddress = ipAddress;
    this.location = location;
    this.status = status;
  }
}
