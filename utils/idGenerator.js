import { encodeBase62 } from "./intToBase62.js";

//模擬資料庫自增ID
let id=0;

export function generateShortURL(){
    id++;
    return encodeBase62(id);
}