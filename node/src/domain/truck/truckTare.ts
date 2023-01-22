import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface truckFastRechargeTimeProps {
  value: number;
}

export class TruckTare extends ValueObject<truckFastRechargeTimeProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: truckFastRechargeTimeProps) {
    super(props);
  }

  public static create (value: number): Result<TruckTare> {
    const guardResult = Guard.againstNullOrUndefined(value, 'truckTare');
    if (!guardResult.succeeded || value < 0) {
      return Result.fail<TruckTare>("Truck Tare must be greater then 0");
    } else {
      return Result.ok<TruckTare>(new TruckTare({ value: value }))
    }
  }
}