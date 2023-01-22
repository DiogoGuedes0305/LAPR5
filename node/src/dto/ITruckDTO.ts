export default interface ITruckDTO {
  id: string;
  isActive?: boolean,
  truckPlate: string;
  truckAutonomyWithCargo: number;
  truckBatteryEnergy: number;
  truckCargoCapacity: number;
  truckFastRechargeTime: number;
  truckTare: number;
  }
  