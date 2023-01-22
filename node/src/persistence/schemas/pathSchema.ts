import mongoose from 'mongoose';
import { IPathPersistence } from '../../dataschema/IPathPersistence';

const Path = new mongoose.Schema(
    {
        domainId:{
            type: String,
            unique: true
        },

        distance:{
            type: Number,
            required: true
        },

        energyExpended:{
            type: Number,
            required: true
        },

        warehouseArrival:{
            type: String,
            required: true
        },

        warehouseDeparture:{
            type: String,
            required: true
        },

        time:{
            type: Number
        },

        extraTime:{
            type:Number
        }
    },{timestamps: true},
);

export default mongoose.model<IPathPersistence & mongoose.Document>('Path',Path);