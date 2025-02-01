import mongoose, { Document } from 'mongoose';

export interface Point {
    type: 'Point';
    coordinates: number[];
}

export interface IBooking extends Document {
    name: string;
    phone: string;
    pickupPoint: Point;
    dropOffPoint: Point;
    pickupPointName: string;
    dropOffPointName: string;
    tripType: 'drop-off' | 'round-trip' | 'package';
    vehicleType: 'suv' | 'sedan' | 'hatchback';
    tripStartDateTime: string;
    tripDistance: number;
    basePurchaseRate: number;
    baseSellingRate: number;
    hourlyPurchaseRate: number;
    hourlySellingRate: number;
    distancePurchaseRate: number;
    distanceSellingRate: number;
    tripRate: number;
    tripBookingRate: number;
    isPaid: boolean;
}

const bookingSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        pickupPoint: {
            type: {
                type: 'Point',
                coordinates: [],
            },
        },
        dropOffPoint: {
            type: {
                type: 'Point',
                coordinates: [],
            },
        },
        pickupPointName: String,
        dropOffPointName: String,
        tripType: String,
        vehicleType: String,
        tripStartDateTime: String,
        tripDistance: Number,
        basePurchaseRate: Number,
        baseSellingRate: Number,
        hourlyPurchaseRate: Number,
        hourlySellingRate: Number,
        distancePurchaseRate: Number,
        distanceSellingRate: Number,
        tripRate: Number,
        tripBookingRate: Number,
        isPaid: Boolean,
    },
    { timestamps: true },
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
