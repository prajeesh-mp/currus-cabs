import mongoose, { Document } from 'mongoose';

export interface IDriver extends Document {
    name: string;
    phone: string;
    district: string;
    vehicleType: 'SUV' | 'Hatchback' | 'Sedan';
    registration: string;
    vehiclePhoto: string;
    driverPhoto: string;
    rc: string;
    permit: string;
    status: string;
}

const driverSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        district: String,
        vehicleType: String,
        registration: String,
        vehiclePhoto: String,
        driverPhoto: String,
        rc: String,
        permit: String,
        status: String,
    },
    { timestamps: true },
);

export default mongoose.models.Driver || mongoose.model<IDriver>('Driver', driverSchema);
