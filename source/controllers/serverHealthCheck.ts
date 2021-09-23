import { NextFunction, Request, Response } from 'express';

import Logger from '../services/logger';

const NAMESPACE = 'Sample controller';

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    Logger.info(NAMESPACE, 'Sample health check controller called');

    return res.status(200).json({
        message: 'pong'
    });
};

export default { serverHealthCheck };
