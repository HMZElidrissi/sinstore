import { exec } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { promisify } from 'node:util';
import readline from 'node:readline';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function question(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve =>
        rl.question(query, ans => {
            rl.close();
            resolve(ans);
        }),
    );
}

async function checkPnpm() {
    console.log('Checking if pnpm is installed...');
    try {
        await execAsync('pnpm --version');
        console.log('✅ pnpm is installed');
    } catch (error) {
        console.error('❌ pnpm is not installed. Please install pnpm first:');
        console.log('npm install -g pnpm');
        process.exit(1);
    }
}

async function getPostgresURL(): Promise<string> {
    console.log('\n📦 Setting up Postgres');
    const dbChoice = await question(
        'Do you want to use a local Postgres instance with Docker (L) or a remote Postgres instance (R)? (L/R): ',
    );

    if (dbChoice.toLowerCase() === 'l') {
        console.log('Setting up local Postgres instance with Docker...');
        await setupLocalPostgres();
        return 'postgresql://postgres:postgres@localhost:54322/postgres?schema=public';
    } else {
        console.log(
            '\nYou can use a managed Postgres service like ElephantSQL, Heroku Postgres, Supabase or your own Postgres instance.',
        );
        return await question('Enter your DATABASE_URL: ');
    }
}

async function setupLocalPostgres() {
    console.log('Checking if Docker is installed...');
    try {
        await execAsync('docker --version');
        console.log('✅ Docker is installed.');
    } catch (error) {
        console.error(
            '❌ Docker is not installed. Please install Docker and try again.',
        );
        console.log(
            'To install Docker, visit: https://docs.docker.com/get-docker/',
        );
        process.exit(1);
    }

    // Create docker directory if it doesn't exist
    const dockerDir = path.join(process.cwd(), 'docker');
    await fs.mkdir(dockerDir, { recursive: true });

    console.log('Creating docker-compose.yml file...');
    const dockerComposeContent = `
services:
  postgres:
    image: postgres:16.4-alpine
    container_name: next_saas_starter_postgres
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "54322:5432" # host:container
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
`;

    await fs.writeFile(
        path.join(dockerDir, 'docker-compose.yml'),
        dockerComposeContent,
    );
    console.log('✅ docker-compose.yml file created.');

    console.log('Starting Docker container...');
    try {
        await execAsync('docker compose -f docker/docker-compose.yml up -d');
        console.log('✅ Docker container started successfully.');

        // Wait for PostgreSQL to be ready
        console.log('Waiting for PostgreSQL to be ready...');
        await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
        console.error(
            '❌ Failed to start Docker container. Please check your Docker installation and try again.',
        );
        process.exit(1);
    }
}

function generateAuthSecret(): string {
    console.log('\n🔑 Generating AUTH_SECRET...');
    return crypto.randomBytes(32).toString('hex');
}

async function writeEnvFile(envVars: Record<string, string>) {
    console.log('\n📝 Writing environment variables to .env');
    const envContent = Object.entries(envVars)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    await fs.writeFile(path.join(process.cwd(), '.env'), envContent);
    console.log('✅ .env file created with the necessary variables.');
}

async function createScriptsDirectory() {
    const scriptsDir = path.join(process.cwd(), 'scripts');
    await fs.mkdir(scriptsDir, { recursive: true });

    // Copy migration and seed scripts
    const sourceDir = __dirname;
    await fs.copyFile(
        path.join(sourceDir, 'migrate.ts'),
        path.join(scriptsDir, 'migrate.ts'),
    );
    await fs.copyFile(
        path.join(sourceDir, 'seed.ts'),
        path.join(scriptsDir, 'seed.ts'),
    );

    console.log('✅ Scripts directory created and files copied.');
}

async function main() {
    console.log('🚀 Starting setup process...\n');

    await checkPnpm();
    const DATABASE_URL = await getPostgresURL();
    const BASE_URL = 'http://localhost:3000';
    const AUTH_SECRET = generateAuthSecret();

    await writeEnvFile({
        DATABASE_URL,
        BASE_URL,
        AUTH_SECRET,
        NODE_ENV: 'development',
        RESEND_API_KEY: 'your_resend_api_key_here',
    });

    await createScriptsDirectory();

    console.log('\n🎉 Setup completed successfully!');
    console.log('\nNext steps:');
    console.log('\n1. Set up the database:');
    console.log('   pnpm db:migrate');
    console.log('\n2. Seed the database:');
    console.log('   pnpm db:seed');
    console.log('\n3. Start the development server:');
    console.log('   pnpm dev');
}

main().catch(error => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
});
