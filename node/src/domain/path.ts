import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';

import { PathDistance } from './pathDistance';
import { PathEnergyExpended } from './pathEnergyExpended';
import { pathExtraTime } from './pathExtraTime';
import { pathTime } from './pathTime';
import { PathWarehouseArrival } from './pathWarehouseArrival';
import { PathWarehouseDeparture } from './pathWarehouseDeparture';

interface PathProps {
  distance: PathDistance;
  time: pathTime;
  extraTime: pathExtraTime;
  warehouseDeparture: PathWarehouseDeparture;
  warehouseArrival: PathWarehouseArrival;
  energyExpended: PathEnergyExpended;
}

export class Path extends AggregateRoot<PathProps> {
  private constructor(props: PathProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  public get time(): pathTime {
    return this.props.time;
  }
  public set time(value: pathTime) {
    this.props.time = value;
  }
  public get extraTime(): pathTime {
    return this.props.extraTime;
  }
  public set extraTime(value: pathTime) {
    this.props.extraTime = value;
  }
  public get warehouseDeparture(): PathWarehouseDeparture {
    return this.props.warehouseDeparture;
  }
  public set warehouseDeparture(value: PathWarehouseDeparture) {
    this.props.warehouseDeparture = value;
  }
  public get warehouseArrival(): PathWarehouseArrival {
    return this.props.warehouseArrival;
  }
  public set warehouseArrival(value: PathWarehouseArrival) {
    this.props.warehouseArrival = value;
  }
  public get energyExpended(): PathEnergyExpended {
    return this.props.energyExpended;
  }
  public set energyExpended(value: PathEnergyExpended) {
    this.props.energyExpended = value;
  }

  public get distance(): PathDistance {
    return this.props.distance;
  }
  public set distance(value: PathDistance) {
    this.props.distance = value;
  }

  public static create(pathProps: PathProps, id?: UniqueEntityID): Result<Path> {
    return Result.ok<Path>(
      new Path(
        {
          distance: pathProps.distance,
          energyExpended: pathProps.energyExpended,
          time: pathProps.time,
          extraTime: pathProps.extraTime,
          warehouseArrival: pathProps.warehouseArrival,
          warehouseDeparture: pathProps.warehouseDeparture,
        },
        id,
      ),
    );
  }
}
