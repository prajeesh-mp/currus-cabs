import mongoose from 'mongoose';
const { DATABASE_URL } = process.env;

class Database {
    private static instance: Database;
    private connection: typeof mongoose | null = null;

    private constructor() {}

    public static async getInstance(): Promise<Database> {
        if (!Database.instance) {
            Database.instance = new Database();
            await Database.instance._connect();
        }
        return Database.instance;
    }

    private async _connect() {
        if (this.connection) {
            return this.connection;
        }

        try {
            const conn = await mongoose.connect(DATABASE_URL as string);
            this.connection = conn;
            console.log('Database connection successful');
        } catch (err) {
            console.error('Database connection error:', err);
            throw err;
        }
    }

    public getConnection(): typeof mongoose | null {
        return this.connection;
    }
}

export default Database;
