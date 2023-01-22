import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import { User } from "../domain/user";
import { UserId } from "../domain/userId";
import { UserEmail } from "../domain/userEmail";
import { UserMap } from "../mappers/UserMap";

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;

  constructor(
    @Inject('userSchema') private userSchema : Model<IUserPersistence & Document>,
    @Inject('logger') private logger
  ) { }
  exists(t: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }
  public async loginSSO(email: string): Promise<User>{
    const uEmail= UserEmail.create(email);
    const query = {UserEmail: uEmail};
    const user = await this.userSchema.find(query).project({UserEmail:0,firstName:0,lastName:0, role:1,phoneNumber:0});
    if(user===null){
      throw new Error('Email or password is incorrect');
    }
    return user;
  }

  public async login(email: string, password:string): Promise<User>{
    const uEmail= UserEmail.create(email);
    const user =this.findByEmail(email);
    (await user).password.comparePassword(password);
    if(user===null){
      throw new Error('Email or password is incorrect');
    }
    return user;
  }
  public async save (user: User): Promise<User> {
    const query = { domainId: user.id.toString() }; 

    const userDocument = await this.userSchema.findOne( query );

    try {
      if (userDocument === null ) {
        const rawUser: any = UserMap.toPersistence(user);

        const userCreated = await this.userSchema.create(rawUser);

        return UserMap.toDomain(userCreated);
      } else {
        userDocument.firstName = user.firstName;
        userDocument.lastName = user.lastName;
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail (email: UserEmail | string): Promise<User> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findById (userId: UserId | string): Promise<User> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX }; 
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }
}