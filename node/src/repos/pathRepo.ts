import { Service, Inject } from 'typedi';
import { IPathPersistence } from '../dataschema/IPathPersistence';
import { Document, Model } from 'mongoose';
import { Path } from '../domain/path';
import IPathRepo from '../services/IRepos/IPathRepo';
import { PathMap } from '../mappers/PathMap';
import { PathWarehouseArrival } from '../domain/pathWarehouseArrival';
import { PathWarehouseDeparture } from '../domain/pathWarehouseDeparture';
import path from 'path';

@Service()
export default class PathRepo implements IPathRepo {
  private models: any;

  constructor(
    @Inject('pathSchema') private pathSchema: Model<IPathPersistence & Document>,
    @Inject('logger') private logger,
  ) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async findByWarehouses(
    warehouseArrival: string | PathWarehouseArrival,
    warehouseDeparture: string | PathWarehouseDeparture,
  ) {
    const _warehouseArrival =
      warehouseArrival instanceof PathWarehouseArrival
        ? (<PathWarehouseArrival>warehouseArrival).warehouseArrival
        : warehouseArrival;
    const _warehouseDeparture =
      warehouseDeparture instanceof PathWarehouseDeparture
        ? (<PathWarehouseDeparture>warehouseDeparture).warehouseDeparture
        : warehouseDeparture;

    const query = { warehouseArrival: _warehouseArrival, warehouseDeparture: _warehouseDeparture };
    const pathRecord = await this.pathSchema.findOne(query);

    if (pathRecord != null) {
      return PathMap.toDomain(pathRecord);
    } else {
      return null;
    }
  }

  public async save(path: Path): Promise<Path> {
    const query = { domainId: path.id.toString() };

    const pathDocument = await this.pathSchema.findOne(query);

    try {
      if (pathDocument === null) {
        const rawUser: any = PathMap.toPersistence(path);

        const userCreated = await this.pathSchema.create(rawUser);

        return PathMap.toDomain(userCreated);
      } else {
        pathDocument.distance = path.distance.distance;
        pathDocument.energyExpended = path.energyExpended.energy;
        pathDocument.warehouseArrival = path.warehouseArrival.warehouseArrival;
        pathDocument.warehouseDeparture = path.warehouseDeparture.warehouseDeparture;
        pathDocument.time = path.time.minutes;
        pathDocument.extraTime = path.extraTime.minutes;
        await pathDocument.save();

        return path;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById(id: string): Promise<Path> {
    const query = { domainId: id };
    const pathRecord = await this.pathSchema.findOne(query);

    if (pathRecord != null) {
      return PathMap.toDomain(pathRecord);
    } else return null;
  }

  public async exists(t: Path): Promise<boolean> {
    const idX = t.id.toString();

    const query = { domainId: idX };
    const pathDocument = await this.pathSchema.findOne(query);

    return !!pathDocument === true;
  }

  public async findAllPaths(page: string, size: string): Promise<Path[]> {
    let pageIndex = 0;
    let pageSize = 0;
    if(page == null ){
      pageIndex = 1;
    }
    if(size == null){
      pageSize = 10;
    }

    pageIndex = Number.parseInt(page);
    pageSize = Number.parseInt(size);



    const pathRecord = await this.pathSchema.find().skip((pageIndex - 1)*pageSize).limit(pageSize);
    let pathList: Path[];
    pathList = [];
    pathRecord.forEach(async element => {
      await pathList.push(await PathMap.toDomain(element));
    });
    return pathList;
  }
}
