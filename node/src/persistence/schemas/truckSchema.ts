import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    domainId: {type: String, unique: true},
    isActive: {type: Boolean},
    truckPlate: {type: String, unique: true},
    truckAutonomyWithCargo: { type: Number },
    truckBatteryEnergy: {type : Number},
    truckCargoCapacity: {type: Number},
    truckFastRechargeTime: {type: Number},
    truckTare: {type: Number}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);