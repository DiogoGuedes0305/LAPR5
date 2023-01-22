import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck/truck";
import { TruckId } from "../../domain/truck/truckId";
import { TruckPlate } from "../../domain/truck/truckPlate";
export default interface ITruckRepo extends Repo<Truck> {
  save(truck: Truck): Promise<Truck>;
  findByDomainId (truckId: TruckId | string): Promise<Truck>;
  findAllTrucks(page: string, size: string): Promise<Truck[]>;
  findActiveTrucks(page: string, size: string): Promise<Truck[]> 
  findByPlate ( truckPlate: TruckPlate | string): Promise<Truck>;
  deleteTruck ( truckPlate: TruckPlate | string): Promise<Boolean>;
}