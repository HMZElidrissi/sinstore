import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAndCreateTables() {
    try {
        // Check existing tables
        const existingTables = (await prisma.$queryRaw`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('users', 'activity_logs', 'invitations');
        `) as { table_name: string }[];

        // Check existing enums
        const existingEnums = (await prisma.$queryRaw`
            SELECT typname 
            FROM pg_type 
            WHERE typname IN ('Role', 'ActivityType');
        `) as { typname: string }[];

        // Create Role enum if it doesn't exist
        if (!existingEnums.some(e => e.typname === 'Role')) {
            await prisma.$executeRaw`
                CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');
            `;
            console.log('Created Role enum');
        }

        // Create ActivityType enum if it doesn't exist
        if (!existingEnums.some(e => e.typname === 'ActivityType')) {
            await prisma.$executeRaw`
                CREATE TYPE "ActivityType" AS ENUM (
                    'SIGN_IN',
                    'SIGN_OUT',
                    'UPDATE_PASSWORD',
                    'DELETE_ACCOUNT',
                    'UPDATE_ACCOUNT',
                    'ACCEPT_INVITATION'
                );
            `;
            console.log('Created ActivityType enum');
        }

        // Create users table if it doesn't exist
        if (!existingTables.some(t => t.table_name === 'users')) {
            await prisma.$executeRaw`
                CREATE TABLE "users" (
                    "id" SERIAL PRIMARY KEY,
                    "name" VARCHAR(100),
                    "email" VARCHAR(255) NOT NULL UNIQUE,
                    "password_hash" TEXT NOT NULL,
                    "role" "Role" NOT NULL DEFAULT 'USER',
                    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "deleted_at" TIMESTAMP(3)
                );
            `;
            console.log('Created users table');
        }

        // Create activity_logs table if it doesn't exist
        if (!existingTables.some(t => t.table_name === 'activity_logs')) {
            await prisma.$executeRaw`
                CREATE TABLE "activity_logs" (
                    "id" SERIAL PRIMARY KEY,
                    "user_id" INTEGER NOT NULL,
                    "action" TEXT NOT NULL,
                    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "ip_address" VARCHAR(45),
                    FOREIGN KEY ("user_id") REFERENCES "users"("id")
                );
            `;
            console.log('Created activity_logs table');
        }

        // Create invitations table if it doesn't exist
        if (!existingTables.some(t => t.table_name === 'invitations')) {
            await prisma.$executeRaw`
                CREATE TABLE "invitations" (
                    "id" SERIAL PRIMARY KEY,
                    "email" VARCHAR(255) NOT NULL,
                    "role" "Role" NOT NULL DEFAULT 'USER',
                    "invited_by" INTEGER NOT NULL,
                    "invited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "expires_at" TIMESTAMP(3) NOT NULL,
                    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
                    "token" TEXT NOT NULL UNIQUE,
                    FOREIGN KEY ("invited_by") REFERENCES "users"("id")
                );
            `;
            console.log('Created invitations table');
        }

        console.log('Database check completed');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run the script
checkAndCreateTables().catch(error => {
    console.error('Failed to check/create tables:', error);
    process.exit(1);
});
