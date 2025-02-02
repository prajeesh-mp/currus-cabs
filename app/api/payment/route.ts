import Database from '@/app/lib/db/db';
import Booking from '@/app/lib/models/booking';

export async function PUT(req: Request) {
    try {
        // Ensure the database connection is established
        const dbInstance = await Database.getInstance();
        dbInstance.getConnection();

        const data = await req.json();
        const booking = await Booking.findOne({ phone: data.phone, transactionId: data.transactionId });

        if (!booking) {
            return Response.json(
                {
                    status: 'failed',
                    error: 'Invalid OTP',
                },
                { status: 400 },
            );
        }

        const isUpdated = await Booking.findOneAndUpdate({ phone: data.phone }, { $set: { isPaid: true } });

        if (!isUpdated) {
            return Response.json(
                {
                    status: 'failed',
                    error: 'Unable to complete Payment',
                },
                { status: 400 },
            );
        }

        return Response.json({ status: 'success', message: 'Payment completed' });
    } catch (error) {
        return Response.json({ status: 'failed', error: error.message }, { status: 500 });
    }
}
