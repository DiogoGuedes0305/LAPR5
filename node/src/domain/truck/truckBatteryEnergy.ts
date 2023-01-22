import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { isDate } from "util/types";

interface truckBatteryEnergyProps {
  value: number;
}

export class TruckBatteryEnergy extends ValueObject<truckBatteryEnergyProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: truckBatteryEnergyProps) {
    super(props);
  }

  public static create (value: number): Result<TruckBatteryEnergy> {
    const guardResult = Guard.againstNullOrUndefined(value, 'truckBatteryEnergy');
    if (!guardResult.succeeded || value < 0) {
      return Result.fail<TruckBatteryEnergy>("Truck Battery Energy must be greater than 0");
    } else {
      return Result.ok<TruckBatteryEnergy>(new TruckBatteryEnergy({ value: value }))
    }
  }
}