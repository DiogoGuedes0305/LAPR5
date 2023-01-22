import { Result } from "../../core/logic/Result";
import ITruckDTO from "../../dto/ITruckDTO";

export default interface ITruckService  {
  createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  getTruck (truckPlate: string): Promise<Result<ITruckDTO>>;
  getAllTrucks (page: string, size: string): Promise<Result<ITruckDTO[]>>;
  deleteTruck (truckPlate: string): Promise<Result<String>>;
  inhibitTruck (truckPlate: string): Promise<Result<Boolean>>;
  getActiveTrucks(page: string, size: string): Promise<Result<ITruckDTO[]>>;
}