import mongoose, { Document } from 'mongoose';

export interface IVehicle extends Document {
    name: string;
    icon: string;
    isActive: boolean;
}

const vehicleSchema = new mongoose.Schema(
    {
        name: String,
        icon: String,
        isActive: Boolean,
    },
    { timestamps: true },
);

export default mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', vehicleSchema);
