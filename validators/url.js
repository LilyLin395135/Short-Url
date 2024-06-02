import { body, param, query } from 'express-validator';

export const createUrlValidator = [
    body('longUrl').notEmpty().withMessage('longUrl is required')
        .isURL().withMessage('longUrl must be a valid URL')
];

export const getShortUrlsValidator = [
    query('paging').optional().isInt({gt:-1}).withMessage('Paging must be a non-negative integer.')
];

export const getShortUrlByIdValidator = [
    param('id').notEmpty().withMessage('id is required')
];
