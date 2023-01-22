import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { isDate } from "util/types";

interface truckFastRechargeTimeProps {
  value: number;
}

export class TruckFastRechargeTime extends ValueObject<truckFastRechargeTimeProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: truckFastRechargeTimeProps) {
    super(props);
  }

  public static create (value: number): Result<TruckFastRechargeTime> {
    const guardResult = Guard.againstNullOrUndefined(value, 'truckFastRechargeTime');
    if (!guardResult.succeeded || value < 0) {
      return Result.fail<TruckFastRechargeTime>("Truck Fast Recharge Time must be greater then 0");
    } else {
      return Result.ok<TruckFastRechargeTime>(new TruckFastRechargeTime({ value: value }))
    }
  }
}