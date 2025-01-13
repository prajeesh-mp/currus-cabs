import mongoose, { Document } from 'mongoose';

export interface IEnquiry extends Document {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const enquirySchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        message: String,
    },
    { timestamps: true },
);

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', enquirySchema);
