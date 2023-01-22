import { Result } from "../../core/logic/Result";
import IUserDTO from "../../dto/IUserDTO"
export default interface IUserService  {
  createUser(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO}>>;
  login(email: string,password:string):Promise<string>;
  loginSSO(email: string, token:string):Promise<string>;
  deleteUser(email: string ):Promise<String>;
    
}
