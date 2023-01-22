import { Service, Inject } from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/truck/truck";
import ITruckRepo from './IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { RoleMap } from "../mappers/RoleMap";
import { TruckMap } from '../mappers/TruckMap';
import { TruckId } from '../domain/truck/truckId';
import { TruckBatteryEnergy } from '../domain/truck/truckBatteryEnergy';
import { TruckCargoCapacity } from '../domain/truck/truckCargoCapacity';
import { TruckFastRechargeTime } from '../domain/truck/truckFastRechargeTime';
import { TruckAutonomyWithCargo } from '../domain/truck/truckAutonomyWithCargo';
import { TruckTare } from '../domain/truck/truckTare';
import { TruckPlate } from '../domain/truck/truckPlate';

@Service()
export default class TruckService implements ITruckService {
  constructor(
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {}
  

  public async inhibitTruck(truckPlate: string): Promise<Result<Boolean>> {
    try {
      const truck = await this.truckRepo.findByPlate(TruckPlate.create(truckPlate).getValue());
      

      truck.changeActive(!truck.isActive.valueOf());
            
      await this.truckRepo.save(truck);

      if (truck === null) {
        return Result.fail<Boolean>("Truck not found");
      }
      else {
        return Result.ok<Boolean>(true);
        }
    } catch (e) {
      throw e;
    }
  }


  public async getTruck( truckPlate: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByPlate(TruckPlate.create(truckPlate).getValue());

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async deleteTruck(truckPlate: string): Promise<Result<String>> {
    try {
      const truck = await this.truckRepo.deleteTruck(TruckPlate.create(truckPlate).getValue());
      if (truck === true) {
        return Result.ok<String>("Truck deleted with success.");
      }
      else {
        return Result.ok<String>( "Truck not found." )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truckOrError = await Truck.create(true,truckDTO);

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }
      const truckResult = truckOrError.getValue();

      await this.truckRepo.save(truckResult);

      const truckDTOResult = TruckMap.toDTO( truckResult ) as ITruckDTO;
      return Result.ok<ITruckDTO>( truckDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByPlate(truckDTO.truckPlate);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        if(truckDTO.truckAutonomyWithCargo != null)
        truck.truckAutonomyWithCargo = TruckAutonomyWithCargo.create( truckDTO.truckAutonomyWithCargo ).getValue();
        
        if(truckDTO.truckBatteryEnergy != null)
        truck.truckBatteryEnergy =  TruckBatteryEnergy.create(truckDTO.truckBatteryEnergy).getValue();

        if(truckDTO.truckCargoCapacity != null)
        truck.truckCargoCapacity = TruckCargoCapacity.create(truckDTO.truckCargoCapacity).getValue();
        
        if(truckDTO.truckFastRechargeTime != null)
        truck.truckFastRechargeTime = TruckFastRechargeTime.create(truckDTO.truckFastRechargeTime).getValue();
        
        if(truckDTO.truckTare != null)
        truck.truckTare = TruckTare.create(truckDTO.truckTare).getValue();
        
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllTrucks(page: string, size: string): Promise<Result<ITruckDTO[]>> {
    try {
      const trucksList = await this.truckRepo.findAllTrucks(page,size);

      const trucksDTOList: ITruckDTO[] = [];
      
      trucksList.forEach(truck => {
        trucksDTOList.push(TruckMap.toDTO(truck) as ITruckDTO);
      });

      return Result.ok<ITruckDTO[]>(trucksDTOList);
    } catch (e) {
      throw e;
    }
  }

  public async getActiveTrucks(page: string, size: string): Promise<Result<ITruckDTO[]>> { 
    try {
      const trucksList = await this.truckRepo.findActiveTrucks(page,size);

      const trucksDTOList: ITruckDTO[] = [];
      
      trucksList.forEach(truck => {
        trucksDTOList.push(TruckMap.toDTO(truck) as ITruckDTO);
      });

      return Result.ok<ITruckDTO[]>(trucksDTOList);
    } catch (e) {
      throw e;
    }
  }

}