import Database from '@/app/lib/db/db';
import Driver from '@/app/lib/models/driver';

export async function POST(req: Request) {
    try {
        // Ensure the database connection is established
        const dbInstance = await Database.getInstance();
        dbInstance.getConnection();

        const data = await req.json();

        // Make sure the vehicle is not registered in our records
        const isRegistered = await Driver.findOne({ registration: data.registrationNumber });

        if (isRegistered) {
            return Response.json(
                {
                    status: 'failed',
                    error: 'Vehicle is already registered',
                },
                { status: 400 },
            );
        }

        // Register vehicle

        const driverData = {
            ...data,
            status: 'pending',
        };

        // store the data in DB
        const driver = new Driver(driverData);
        await driver.save();

        return Response.json({ status: 'success', message: 'Registered successfuly' });
    } catch (error) {
        return Response.json({ status: 'failed', error: error.message }, { status: 500 });
    }
}
