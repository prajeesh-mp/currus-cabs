import Database from '@/app/lib/db/db';
import ServiceArea from '@/app/lib/models/serviceArea';

/**
 * Checks if a given latitude and longitude is inside a polygon.
 * Uses the Ray-Casting algorithm.
 */
const isPointInsidePolygon = (point: { lat: number; lng: number }, polygon: { lat: number; lng: number }[]): boolean => {
    let inside = false;
    const { lat, lng } = point;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].lat,
            yi = polygon[i].lng;
        const xj = polygon[j].lat,
            yj = polygon[j].lng;

        const intersect = yi > lng !== yj > lng && lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi;

        if (intersect) inside = !inside;
    }

    return inside;
};

export async function POST(req: Request) {
    try {
        // Ensure the database connection is established
        const dbInstance = await Database.getInstance();
        dbInstance.getConnection();

        const data = await req.json();

        // Fetch all service areas
        const serviceAreas = await ServiceArea.find();

        // Check if the location is inside any service area polygon
        for (const area of serviceAreas) {
            if (isPointInsidePolygon({ lat: data.lat, lng: data.lng }, area.path)) {
                // return area; // Return the matched service area
                return Response.json({ status: 'success', message: 'Area', data: area });
            }
        }

        return Response.json({ status: 'failed', message: 'No Areas found' });
    } catch (error) {
        return Response.json({ status: 'failed', error: error.message }, { status: 500 });
    }
}
