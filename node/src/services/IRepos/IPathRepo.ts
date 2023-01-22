import { Repo } from '../../core/infra/Repo';
import { Path } from '../../domain/path';
import { PathWarehouseArrival } from '../../domain/pathWarehouseArrival';
import { PathWarehouseDeparture } from '../../domain/pathWarehouseDeparture';

export default interface IPathRepo extends Repo<Path> {
  save(path: Path): Promise<Path>;
  findById(id: string): Promise<Path>;
  findByWarehouses(
    warehouseArrival: PathWarehouseArrival | string,
    warehouseDeparture: PathWarehouseDeparture | string,
  );
  findAllPaths(page: string, size: string): Promise<Path[]>;
}
