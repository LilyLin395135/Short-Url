import crypto from 'crypto';//可用於加密，這裡用來產生隨機字串
import { stringToBase62 } from './stringToBase62.js';

export function hashURL(url) {
    const hash = crypto
        .createHash('sha256')//產生固定長度的256位（32字節）雜湊值
        .update(url)//更新雜湊對象的數據
        .digest('base64');//計算雜湊值並以 Base64 編碼返回

    return stringToBase62(hash);
}