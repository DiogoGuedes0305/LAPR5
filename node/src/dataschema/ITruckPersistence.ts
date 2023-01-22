export interface ITruckPersistence {
    domainId: string;
    isActive: boolean;
    truckPlate: string;
    truckAutonomyWithCargo: number;
    truckBatteryEnergy: number;
    truckCargoCapacity: number;
    truckFastRechargeTime: number;
    truckTare: number;
  }