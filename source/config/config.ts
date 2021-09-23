import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// SERVER_HOSTNAME, SERVER_PORT is available when app is hosted
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.port || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server: SERVER
};

export default config;
