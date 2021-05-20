import { PrismaClient } from "@prisma/client";

class Database {
    private static instance: PrismaClient | null;

    public static Instance(): PrismaClient {
        if (this.instance) return this.instance;

        this.instance = new PrismaClient();
        return this.instance;
    }

    public static async disconnect(): Promise<void> {
        if (this.instance) {
            await this.instance.$disconnect();
            this.instance = null;
        }
    }
}

export default Database;
