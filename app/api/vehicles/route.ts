import Database from '@/app/lib/db/db';
import Vehicle from '@/app/lib/models/vehicle';

export async function GET() {
    try {
        // Ensure the database connection is established
        const dbInstance = await Database.getInstance();
        dbInstance.getConnection();

        // Query the database with filters and pagination
        const vehicles = await Vehicle.find();

        return Response.json(
            {
                status: 'success',
                message: 'Vehicles fetched successfully',
                data: vehicles,
            },
            { status: 200 },
        );
    } catch (error) {
        return Response.json({ status: 'failed', error: error.message }, { status: 500 });
    }
}
