import { Result } from '../../core/logic/Result';
import IPathDTO from '../../dto/IPathDTO';

export default interface IPathService {
  createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  getPath(pathID: string): Promise<Result<IPathDTO>>;
  getAllPaths(page: string, size: string): Promise<Result<IPathDTO[]>>;
}
