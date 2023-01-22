import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { isDate } from "util/types";

interface truckCargoCapacityProps {
  value: number;
}

export class TruckCargoCapacity extends ValueObject<truckCargoCapacityProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: truckCargoCapacityProps) {
    super(props);
  }

  public static create (value: number): Result<TruckCargoCapacity> {
    const guardResult = Guard.againstNullOrUndefined(value, 'truckCargoCapacity');
    if (!guardResult.succeeded || value < 0) {
      return Result.fail<TruckCargoCapacity>("Truck Cargo Capacity must be greater then 0");
    } else {
      return Result.ok<TruckCargoCapacity>(new TruckCargoCapacity({ value: value }))
    }
  }
}