import http from 'http';
import express from 'express';
import cors from 'cors';
import Logger from './services/logger';
import config from './config/config';
import serverHealthCheckRoutes from './routes/serverHealthCheck';

// Used to inform about origin of logs
const NAMESPACE = 'Server';
// Create server
const router = express();

/**
 * Routes. '/api/' will be automatically prepended
 * to routes we use. So API call is, for example, localhost:1000/api/route
 */
router.use('/api/', serverHealthCheckRoutes);

/**
 * Set up CORS
 */
const corsOptions: cors.CorsOptions = {
    // TODO: possibly replace *
    origin: '*'
};
router.use(cors(corsOptions));

/**
 * Middleware to log requests
 */
router.use((req, res, next) => {
    // Log request
    Logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    // Log response
    res.on('finish', () => {
        Logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});

/**
 * Middleware to transform request body into a json object
 */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/**
 * Middleware setting rules of this API
 */
router.use((req, res, next) => {
    // TODO: replace * by client URL, to restrict from where the request can come from
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/**
 * Middleware to handle errors. If request made this far,
 * then it was not caught my any other routes, so it is 404.
 */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

/**
 * Start the server
 */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => Logger.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
