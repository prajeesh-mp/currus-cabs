import Database from '@/app/lib/db/db';
import Enquiry from '@/app/lib/models/enquiry';

export async function POST(req: Request) {
    try {
        // Ensure the database connection is established
        const dbInstance = await Database.getInstance();
        dbInstance.getConnection();

        const data = await req.json();

        // store the data in DB
        const enquiry = new Enquiry(data);
        await enquiry.save();

        return Response.json({ status: 'success', message: 'Submitted successfuly' });
    } catch (error) {
        return Response.json({ status: 'failed', error: error.message }, { status: 500 });
    }
}
