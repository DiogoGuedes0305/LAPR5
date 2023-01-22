import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { TruckId } from "./truckId";
import { TruckAutonomyWithCargo } from "./truckAutonomyWithCargo";
import { TruckCargoCapacity } from "./truckCargoCapacity";
import { TruckFastRechargeTime } from "./truckFastRechargeTime";
import { TruckTare } from "./truckTare";
import { TruckBatteryEnergy } from "./truckBatteryEnergy";
import ITruckDTO from "../../dto/ITruckDTO";
import { TruckPlate } from "./truckPlate";
import { resourceLimits } from "worker_threads";

interface TruckProps {
  isActive: boolean;
  truckPlate: TruckPlate;
  truckAutonomyWithCargo: TruckAutonomyWithCargo;
  truckBatteryEnergy: TruckBatteryEnergy;
  truckCargoCapacity: TruckCargoCapacity;
  truckFastRechargeTime: TruckFastRechargeTime;
  truckTare: TruckTare;
}

export class Truck extends AggregateRoot<TruckProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get isActive (): boolean {
    return this.props.isActive;
  }

  


  get truckId (): TruckId {
    return new TruckId(this.truckId.toValue());
  } 

  get truckPlate (): TruckPlate {
    return this.props.truckPlate;
  }

  set truckPlate ( value: TruckPlate) {
    this.props.truckPlate = value;
  }


  get truckAutonomyWithCargo (): TruckAutonomyWithCargo {
    return this.props.truckAutonomyWithCargo;
  }

  set truckAutonomyWithCargo ( value: TruckAutonomyWithCargo) {
    this.props.truckAutonomyWithCargo = value;
  }

  get truckBatteryEnergy (): TruckBatteryEnergy {
    return this.props.truckBatteryEnergy;
  }

  set truckBatteryEnergy ( value: TruckBatteryEnergy) {
    this.props.truckBatteryEnergy = value;
  }

  get truckCargoCapacity (): TruckCargoCapacity {
    return this.props.truckCargoCapacity;
  }

  set truckCargoCapacity ( value: TruckCargoCapacity) {
    this.props.truckCargoCapacity = value;
  }

  get truckFastRechargeTime (): TruckFastRechargeTime {
    return this.props.truckFastRechargeTime;
  }

  set truckFastRechargeTime ( value: TruckFastRechargeTime) {
    this.props.truckFastRechargeTime = value;
  }


  get truckTare (): TruckTare {
    return this.props.truckTare;
  }

  set truckTare ( value: TruckTare) {
    this.props.truckTare = value;
  }

  public async changeActive ( value: boolean) {
    this.props.isActive = value;
  }

  private constructor (props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }


  public static create (isActive: boolean, truckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck> {
    
    if(truckDTO.truckPlate == null){
      return Result.fail<Truck>("Must provide a truck plate");
    }

      const truck = new Truck({isActive: isActive, truckPlate: TruckPlate.create(truckDTO.truckPlate).getValue(), truckAutonomyWithCargo: TruckAutonomyWithCargo.create(truckDTO.truckAutonomyWithCargo).getValue(),
        truckBatteryEnergy: TruckBatteryEnergy.create(truckDTO.truckBatteryEnergy).getValue(), truckCargoCapacity: TruckCargoCapacity.create(truckDTO.truckCargoCapacity).getValue(),
        truckFastRechargeTime: TruckFastRechargeTime.create(truckDTO.truckFastRechargeTime).getValue(),
        truckTare:  TruckTare.create(truckDTO.truckTare).getValue()}, id);


      return Result.ok<Truck>( truck )
    }

    
  }

