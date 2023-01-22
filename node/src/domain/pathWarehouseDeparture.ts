import { ValueObject } from '../core/domain/ValueObject';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';

interface WarehouseDepartureProps {
  warehouseDeparture: string;
}

export class PathWarehouseDeparture extends ValueObject<WarehouseDepartureProps> {
  constructor(props: WarehouseDepartureProps) {
    super(props);
  }

  public get warehouseDeparture(): string {
    return this.props.warehouseDeparture;
  }
  public set warehouseDeparture(value: string) {
    this.props.warehouseDeparture = value;
  }
  public static create(props: WarehouseDepartureProps): Result<PathWarehouseDeparture> {
    const propsResult = Guard.againstNullOrUndefined(props.warehouseDeparture, 'warehouseID');

    if (!propsResult.succeeded) {
      return Result.fail<PathWarehouseDeparture>(propsResult.message);
    } else {
      return Result.ok<PathWarehouseDeparture>(
        new PathWarehouseDeparture({ warehouseDeparture: props.warehouseDeparture }),
      );
    }
  }
}
