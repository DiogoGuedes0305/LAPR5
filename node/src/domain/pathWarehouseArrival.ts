import { ValueObject } from '../core/domain/ValueObject';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';

interface WarehouseArrivalProps {
  warehouseArrival: string;
}

export class PathWarehouseArrival extends ValueObject<WarehouseArrivalProps> {
  constructor(props: WarehouseArrivalProps) {
    super(props);
  }

  public get warehouseArrival(): string {
    return this.props.warehouseArrival;
  }
  public set warehouseArrival(value: string) {
    this.props.warehouseArrival = value;
  }
  public static create(props: WarehouseArrivalProps): Result<PathWarehouseArrival> {
    const propsResult = Guard.againstNullOrUndefined(props.warehouseArrival, 'warehouseID');

    if (!propsResult.succeeded) {
      return Result.fail<PathWarehouseArrival>(propsResult.message);
    } else {
      return Result.ok<PathWarehouseArrival>(new PathWarehouseArrival({ warehouseArrival: props.warehouseArrival }));
    }
  }
}
