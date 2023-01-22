import { Service, Inject } from 'typedi';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import { Truck } from '../domain/truck/truck';
import { TruckId } from "../domain/truck/truckId";
import { TruckMap } from "../mappers/TruckMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { TruckPlate } from '../domain/truck/truckPlate';

@Service()
export default class truckRepo implements ITruckRepo {
  private models: any;

  constructor(
    @Inject('truckSchema') private truckSchema: Model<ITruckPersistence & Document>,
  ) { }


  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async findByPlate(truckPlate: TruckPlate): Promise<Truck> {
    const query = { truckPlate: truckPlate.value };
    const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);
    
    if (truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    }
    else
      return null;
  }

  public async deleteTruck(truckPlate: TruckPlate): Promise<Boolean> {
    const query = { truckPlate: truckPlate.value };
    const truckRecord = await this.truckSchema.findOneAndDelete(query as FilterQuery<ITruckPersistence & Document>);
    if (truckRecord != null) {
      return true;
    }
    else
      return false;
  }

  public async exists(truck: Truck): Promise<boolean> {

    const idX = truck.id instanceof TruckId ? (<TruckId>truck.id).toValue() : truck.id;

    const query = { domainId: idX };
    const truckDocument = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    return !!truckDocument === true;
  }

  public async save(truck: Truck): Promise<Truck> {
    const query = { domainId: truck.id.toString() };

    const truckDocument = await this.truckSchema.findOne(query);


    try {
      if (truckDocument === null) {
        const rawTruck: any = TruckMap.toPersistence(truck);


        const truckCreated = await this.truckSchema.create(rawTruck);



        return TruckMap.toDomain(truckCreated);
      } else {
        truckDocument.isActive = truck.isActive.valueOf();
        truckDocument.truckAutonomyWithCargo = truck.truckAutonomyWithCargo.value;
        truckDocument.truckBatteryEnergy = truck.truckBatteryEnergy.value;
        truckDocument.truckCargoCapacity = truck.truckCargoCapacity.value;
        truckDocument.truckFastRechargeTime = truck.truckFastRechargeTime.value;
        truckDocument.truckTare = truck.truckTare.value;
        await truckDocument.save();

        return truck;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(truckId: TruckId | string): Promise<Truck> {
    const query = { domainId: truckId };
    const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    if (truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    }
    else
      return null;
  }

  public async findAllTrucks(page: string, size: string): Promise<Truck[]> {
    let pageIndex = 0;
    let pageSize = 0;
    if(page == null ){
      pageIndex = 1;
    }
    if(size == null){
      pageSize = 10;
    }

    pageIndex = Number.parseInt(page);
    pageSize = Number.parseInt(size);

    const truckRecord = await this.truckSchema.find().skip((pageIndex - 1)*pageSize).limit(pageSize);
    return truckRecord !== null ? truckRecord.map((postRecord) => TruckMap.toDomain(postRecord)) : null
  }


  public async findActiveTrucks(page: string, size: string): Promise<Truck[]> {
    let pageIndex = 0;
    let pageSize = 0;
    if(page == null ){
      pageIndex = 1;
    }
    if(size == null){
      pageSize = 10;
    }

    pageIndex = Number.parseInt(page);
    pageSize = Number.parseInt(size);

      const truckRecord = await this.truckSchema.find({isActive: true,}).skip((pageIndex - 1)*pageSize).limit(pageSize);
    return truckRecord !== null ? truckRecord.map((postRecord) => TruckMap.toDomain(postRecord)) : null
  }


  
}