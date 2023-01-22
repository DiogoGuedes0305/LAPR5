import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Mapper } from '../core/infra/Mapper';
import { Path } from '../domain/path';
import { PathDistance } from '../domain/pathDistance';
import { PathEnergyExpended } from '../domain/pathEnergyExpended';
import { pathExtraTime } from '../domain/pathExtraTime';
import { pathTime } from '../domain/pathTime';
import { PathWarehouseArrival } from '../domain/pathWarehouseArrival';
import { PathWarehouseDeparture } from '../domain/pathWarehouseDeparture';
import IPathDTO from '../dto/IPathDTO';

export class PathMap extends Mapper<Path> {
  public static toDTO(path: Path): IPathDTO {
    return {
      id: path.id.toString(),
      distance: path.distance.distance,
      time: path.time.minutes,
      extraTime: path.extraTime.minutes,
      energyExpended: path.energyExpended.energy,
      warehouseDeparture: path.warehouseDeparture.warehouseDeparture,
      warehouseArrival: path.warehouseArrival.warehouseArrival,
    } as IPathDTO;
  }

  public static async toDomain(raw: any): Promise<Path> {
    const pathDistanceOrError = PathDistance.create({ distance: raw.distance });
    const pathEnergyExpendedOrError = PathEnergyExpended.create({ energy: raw.energyExpended });
    const pathTimeOrError = pathTime.create({ minutes: raw.time });
    const pathExtraTimeOrError = pathExtraTime.create({ minutes: raw.extraTime });
    const pathWarehouseArrivalOrError = PathWarehouseArrival.create({ warehouseArrival: raw.warehouseArrival });
    const pathWarehouseDepartureOrError = PathWarehouseDeparture.create({ warehouseDeparture: raw.warehouseDeparture });

    const pathOrError = Path.create(
      {
        distance: pathDistanceOrError.getValue(),
        energyExpended: pathEnergyExpendedOrError.getValue(),
        time: pathTimeOrError.getValue(),
        extraTime: pathExtraTimeOrError.getValue(),
        warehouseArrival: pathWarehouseArrivalOrError.getValue(),
        warehouseDeparture: pathWarehouseDepartureOrError.getValue(),
      },
      new UniqueEntityID(raw.domainId),
    );

    pathOrError.isFailure ? console.log(pathOrError.error) : '';

    return pathOrError.isSuccess ? pathOrError.getValue() : null;
  }

  public static toPersistence(path: Path): any {
    const a = {
      domainId: path.id.toString(),
      distance: path.distance.distance,
      energyExpended: path.energyExpended.energy,
      warehouseArrival: path.warehouseArrival.warehouseArrival,
      warehouseDeparture: path.warehouseDeparture.warehouseDeparture,
      time: path.time.minutes,
      extraTime: path.time.minutes,
    };

    return a;
  }
}
