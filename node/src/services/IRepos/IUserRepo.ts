import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<User>;
	login(email: string, password:string): Promise<User>;
	loginSSO(email: string): Promise<User>;
}
  