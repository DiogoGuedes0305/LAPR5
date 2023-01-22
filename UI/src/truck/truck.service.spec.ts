import { TestBed } from '@angular/core/testing';
import { data } from 'cypress/types/jquery';
import { TRUCK, TRUCKS } from './mockTruck';
import { Truck } from './truck';

import { TruckService } from './truck.service';

describe('TruckService', () => {
  let service: TruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckService);
  });

  it('should call addTruck', () => {
    const testTruck: Truck = {
      isActive: true,
      truckPlate: "AZ-22-ZZ",
      truckAutonomyWithCargo : 22,
      truckBatteryEnergy: 33,
      truckCargoCapacity: 60,
      truckFastRechargeTime: 20,
      truckTare: 70
    };

    service.addTruck(TRUCK).subscribe((data) => {
      expect(data).equal(testTruck);
    });

  });


  it('should call getTrucks', () => {
    const trucks: Truck[] = [{isActive: true, truckPlate: "AZ-22-ZZ", truckAutonomyWithCargo: 22,
    truckBatteryEnergy : 33, truckCargoCapacity : 60, truckFastRechargeTime : 20, truckTare : 70},
    {isActive: true, truckPlate: "AZ-22-KK", truckAutonomyWithCargo: 33,
    truckBatteryEnergy : 55, truckCargoCapacity : 44, truckFastRechargeTime : 34, truckTare : 78}
  ];

  service.getTrucks(1,10).subscribe((TRUCKS) => {
    expect(TRUCKS).equal(trucks)
  });

  });

});
