import mongoose, { Document } from 'mongoose';

export interface Area extends Document {
    id: string;
    name: string;
    type: string;
    path: { lat: number; lng: number }[];
    pricing: {
        time: number;
        distance: number;
        vehicleType: 'SUV' | 'Sedan' | 'Hatchback';
        basePurchaseRate: number;
        baseSellingRate: number;
        hourlyPurchaseRate: number;
        hourlySellingRate: number;
        distancePurchaseRate: number;
        distanceSellingRate: number;
    }[];
}

const serviceAreaSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        path: { type: [{ lat: Number, lng: Number }], required: true },
        pricing: {
            type: [
                {
                    time: Number,
                    distance: Number,
                    vehicleType: String,
                    basePurchaseRate: Number,
                    baseSellingRate: Number,
                    hourlyPurchaseRate: Number,
                    hourlySellingRate: Number,
                    distancePurchaseRate: Number,
                    distanceSellingRate: Number,
                },
            ],
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.models.ServiceArea || mongoose.model<Area>('ServiceArea', serviceAreaSchema);
