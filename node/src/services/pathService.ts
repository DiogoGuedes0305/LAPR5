import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { Path } from '../domain/path';
import { PathDistance } from '../domain/pathDistance';
import { PathEnergyExpended } from '../domain/pathEnergyExpended';
import { pathExtraTime } from '../domain/pathExtraTime';
import { pathTime } from '../domain/pathTime';
import { PathWarehouseArrival } from '../domain/pathWarehouseArrival';
import { PathWarehouseDeparture } from '../domain/pathWarehouseDeparture';
import IPathDTO from '../dto/IPathDTO';
import { PathMap } from '../mappers/PathMap';
import IPathRepo from './IRepos/IPathRepo';
import IPathService from './IServices/IPathService';

@Service()
export default class PathService implements IPathService {
  constructor(@Inject(config.repos.path.name) private pathRepo: IPathRepo, @Inject('logger') private logger) {}

  public async createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    const pathDocument = await this.pathRepo.findByWarehouses(pathDTO.warehouseArrival, pathDTO.warehouseDeparture);
    const found = !!pathDocument;

    if (found) {
      return Result.fail<IPathDTO>('There alredy is a path for that combination of warehouses');
    }

    this.logger.silly('Creating Path DB Record');
    try {
      const distance = await PathDistance.create({ distance: pathDTO.distance }).getValue();
      const energyExpended = await PathEnergyExpended.create({ energy: pathDTO.energyExpended }).getValue();

      const warehouseDeparture = await PathWarehouseDeparture.create({
        warehouseDeparture: pathDTO.warehouseDeparture,
      }).getValue();
      const warehouseArrival = await PathWarehouseArrival.create({
        warehouseArrival: pathDTO.warehouseArrival,
      }).getValue();
      const time = await pathTime.create({ minutes: pathDTO.time }).getValue();
      const extraTime = await pathExtraTime.create({ minutes: pathDTO.extraTime }).getValue();

      const pathOrError = await Path.create({
        distance: distance,
        energyExpended: energyExpended,
        warehouseArrival: warehouseArrival,
        warehouseDeparture: warehouseDeparture,
        time: time,
        extraTime: extraTime,
      });

      if (pathOrError.isFailure) {
        throw Result.fail<IPathDTO>(pathOrError.errorValue());
      }

      const pathResult = pathOrError.getValue();
      await this.pathRepo.save(pathResult);
      const pathDTOResult = PathMap.toDTO(pathResult) as IPathDTO;
      return Result.ok<IPathDTO>(pathDTOResult);
    } catch (e) {
      throw e;
    }
  }
  public async updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findById(pathDTO.id);

      if (path === null) {
        return Result.fail<IPathDTO>('Path not found');
      } else {
        const distance = await PathDistance.create({ distance: pathDTO.distance }).getValue();
        const energyExpended = await PathEnergyExpended.create({ energy: pathDTO.energyExpended }).getValue();
        const warehouseArrival = await PathWarehouseArrival.create({
          warehouseArrival: pathDTO.warehouseArrival,
        }).getValue();
        const warehouseDeparture = await PathWarehouseDeparture.create({
          warehouseDeparture: pathDTO.warehouseDeparture,
        }).getValue();
        const time = await pathTime.create({ minutes: pathDTO.time }).getValue();
        const extraTime = await pathExtraTime.create({ minutes: pathDTO.extraTime }).getValue();

        path.distance = distance;
        path.energyExpended = energyExpended;
        path.extraTime = extraTime;
        path.time = time;
        path.warehouseArrival = warehouseArrival;
        path.warehouseDeparture = warehouseDeparture;
        await this.pathRepo.save(path);

        const roleDTOResult = PathMap.toDTO(path) as IPathDTO;
        return Result.ok<IPathDTO>(roleDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  public async getPath(pathID: string): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findById(pathID);

      if (path === null) {
        return Result.fail<IPathDTO>('Path not found');
      } else {
        const pathDTOResult = PathMap.toDTO(path) as IPathDTO;
        return Result.ok<IPathDTO>(pathDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  public async getAllPaths(): Promise<Result<IPathDTO[]>> {
    try {
      const pathList = await this.pathRepo.findAllPaths();

      const pathDTOList: IPathDTO[] = [];

      pathList.forEach(path => {
        pathDTOList.push(PathMap.toDTO(path) as IPathDTO);
      });

      return Result.ok<IPathDTO[]>(pathDTOList);
    } catch (e) {
      throw e;
    }
  }
}
