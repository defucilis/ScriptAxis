import { PrismaClient } from "@prisma/client";

class Database {
    private static instance: PrismaClient | null;

    public static Instance(): PrismaClient {
        if (this.instance) return this.instance;

        if (process.env.NODE_ENV === "production") {
            this.instance = new PrismaClient();
            return this.instance;
        } else {
            //in dev mode, we use the global instance for hot reloading
            const globalAny: any = global;
            if (!globalAny.prisma) {
                this.instance = new PrismaClient();
                globalAny.prisma = this.instance;
            } else {
                this.instance = globalAny.prisma;
            }
            return this.instance;
        }
    }

    public static async disconnect(): Promise<void> {
        if (this.instance) {
            await this.instance.$disconnect();
            this.instance = null;
        }
    }
}

export default Database;
