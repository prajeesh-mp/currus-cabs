import Database from '@/app/lib/db/db';
import Booking from '@/app/lib/models/booking';

// Function to generate a transaction ID
async function generateUniqueTransactionId(vehicleType: string): Promise<string> {
    const date = new Date().toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD

    const vehicleTypeMap: { [key: string]: string } = {
        suv: 'SUV',
        sedan: 'SED',
        hatchback: 'HAT',
    };

    const vehicleCode = vehicleTypeMap[vehicleType.toLowerCase()] || 'UNK';

    let transactionId: string;
    let exists: any;

    do {
        // Generate a random 5-digit number
        const uniqueNumber = Math.floor(10000 + Math.random() * 90000);
        transactionId = `${date}-${vehicleCode}-${uniqueNumber}`;

        // Check if the transaction ID already exists in the database
        exists = await Booking.exists({ transactionId });
    } while (exists); // Keep generating until we get a unique ID

    return transactionId;
}

export async function POST(req: Request) {
    try {
        // Ensure the database connection is established
        const dbInstance = await Database.getInstance();
        dbInstance.getConnection();

        const data = await req.json();

        // Booking
        const transactionId = await generateUniqueTransactionId(data.vehicleType);
        const otp = 1234; //Math.floor(1000 + Math.random() * 9000);

        const bookingData = {
            ...data,
            transactionId,
            otp,
            isPaid: false,
            isVerified: false,
        };

        // store the data in DB
        const booking = new Booking(bookingData);
        await booking.save();

        // send OTP

        return Response.json({ status: 'success', message: 'OTP Sent', data: { transactionId } });
    } catch (error) {
        return Response.json({ status: 'failed', error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        // Ensure the database connection is established
        const dbInstance = await Database.getInstance();
        dbInstance.getConnection();

        const data = await req.json();

        const booking = await Booking.findOne({ phone: data.phone, otp: data.otp });

        if (!booking) {
            return Response.json(
                {
                    status: 'failed',
                    error: 'Invalid OTP',
                },
                { status: 400 },
            );
        }

        const isUpdated = await Booking.findOneAndUpdate({ phone: data.phone }, { $set: { isVerified: true, otp: '' } });

        if (!isUpdated) {
            return Response.json(
                {
                    status: 'failed',
                    error: 'Unable to verify OTP',
                },
                { status: 400 },
            );
        }

        return Response.json({ status: 'success', message: 'OTP Verified' });
    } catch (error) {
        return Response.json({ status: 'failed', error: error.message }, { status: 500 });
    }
}
