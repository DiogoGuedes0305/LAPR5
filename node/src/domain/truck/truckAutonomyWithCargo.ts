import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface truckAutonomyWithCargoProps {
  value: number;
}

export class TruckAutonomyWithCargo extends ValueObject<truckAutonomyWithCargoProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: truckAutonomyWithCargoProps) {
    super(props);
  }

  public static create (value: number): Result<TruckAutonomyWithCargo> {
    const guardResult = Guard.againstNullOrUndefined(value, 'truckAutonomyWithCargo');
    if (!guardResult.succeeded || value < 0) {
      return Result.fail<TruckAutonomyWithCargo>("Truck Autonomy must be greater than 0");
    } else {
      return Result.ok<TruckAutonomyWithCargo>(new TruckAutonomyWithCargo({ value: value }))
    }
  }
}