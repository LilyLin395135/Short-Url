import crypto from 'crypto';
import { stringToBase62 } from './stringToBase62.js'

export function generateRandomString(length) {
    const bytes = crypto.randomBytes(length).toString('Base64');

    return stringToBase62(bytes);
}
