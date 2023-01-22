import dotenv from 'dotenv';
import { pathToFileURL } from 'url';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlabasdasd
   */
  databaseURL: process.env.MONGODB_URI || 'mongodb://mongoadmin:71ca2d269b791396a32e7a27@vs290.dei.isep.ipp.pt:27017/admin?authMechanism=DEFAULT',

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    truck: {
      name: 'TruckController',
      path: '../controllers/truckController',
    },
    path: {
      name: 'PathController',
      path: '../controllers/pathController',
    },
    path:{
      name:'UserController',
      path:'../controllers/userController'
    }
  },

  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    truck: {
      name: 'TruckRepo',
      path: '../repos/truckRepo',
    },
    path: {
      name: 'PathRepo',
      path: '../repos/pathRepo',
    },
  },

  services: {
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },
    truck: {
      name: 'TruckService',
      path: '../services/truckService',
    },
    path: {
      name: 'PathService',
      path: '../services/pathService',
    },
    path: {
      name: 'UserService',
      path: '../services/userService',
    }
  },
};
