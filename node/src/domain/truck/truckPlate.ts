import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface truckPlate {
  value: string;
}

export class TruckPlate extends ValueObject<truckPlate> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: truckPlate) {
    super(props);
  }

  public static create (value: string): Result<TruckPlate> {
    const guardResult = Guard.againstNullOrUndefined(value, 'truckPlate');
    if (!guardResult.succeeded || value.length < 8 || value.length > 8) {
      return Result.fail<TruckPlate>("Must provide a truck plate");
    } else {
      return Result.ok<TruckPlate>(new TruckPlate({ value: value }))
    }
  }
}