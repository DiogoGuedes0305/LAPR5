import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import IUserDTO from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';

import { User } from '../domain/user';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';

import { Role } from '../domain/role';

import { Result } from "../core/logic/Result";

@Service()
export default class UserService implements IUserService{
  constructor(
      @Inject(config.repos.user.name) private userRepo : IUserRepo,
      @Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject('logger') private logger,
  ) {}
    async createUser(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO}>> {
      try {
        const userDocument = await this.userRepo.findByEmail( userDTO.email );
        const found = !!userDocument;
    
        if (found) {
          return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with email=" + userDTO.email);
        }
    throw new Error('Method not implemented.');

    const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await UserEmail.create( userDTO.email ).getValue();
      let role: Role;

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }

      const userOrError = User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email,
        role: role,
        password: password,
        phoneNumber: userDTO.phoneNumber,
      });
      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role.id.value;

    return jwt.sign(
      {
        id: id,
        email: email, // We are gonna use this in the middleware 'isAuth'
        role: role,
        firstName: firstName,
        lastName: lastName,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }


  async login(email: string,password:string):Promise<string>{
    const user =this.userRepo.login(email,password);
    let token= this.generateToken(user);
    let result= (await user).role.name + token;
    return result;
    
  }
  async loginSSO(email: string, token: string) {
    let tokenGen : any;
    const user=this.userRepo.loginSSO(email);
    if(token!=""){
      tokenGen= this.generateToken(user);
    }
      
    let result= (await user).role.name + token;
    return result;
  }
  async deleteUser(email: string):Promise<String> {
    const user=this.userRepo.findByEmail(email);
    if(user===null){
      throw new Error('User not found');
    }
    (await user).deactivaveAccount();
    this.userRepo.save(await user);
    return "User deleted";

  }

  

  private async getRole (roleId: string): Promise<Result<Role>> {

    const role = await this.roleRepo.findByDomainId( roleId );
    const found = !!role;

    if (found) {
      return Result.ok<Role>(role);
    } else {
      return Result.fail<Role>("Couldn't find role by id=" + roleId);
    }
  }

}
