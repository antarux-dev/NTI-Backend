import { Request, Response } from 'express';
import { messageResponses } from './model.js';
import { createApiResponse } from '../../utils/apiResponse.js';

export const getResponseMessage = (req: Request, res: Response) => {
    try {
        // Error simulation just for testing purposes lol
        if (Math.random() < 0.3) {
            throw new Error('Simulated error');
        }

        const message = messageResponses[Math.floor(Math.random() * messageResponses.length)];
        const response = createApiResponse(
            200,
            true,
            message
        )

        res.status(response.statusCode).json(response);
    } catch (error: unknown) {
        const response = createApiResponse(
            500,
            false,
            (error as Error).message || 'An unexpected error occurred.'
        );
        
        res.status(response.statusCode).json(response);
    }
};
