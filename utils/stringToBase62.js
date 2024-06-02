//當我拿到字串
//1. 每個字元轉換成ASCII對應的十進位數字，再轉成二進位，將8個bite的位子補滿
//2. 一個字元有8位數的二進位，組合成字串
//3. 統一轉換成BigInt型別來做計算
//4. 用十進位轉二進位的想法，來轉換成62進位。餘數對應62進位的字母，整數部分再除62看餘數
//5. 最新得到的62進位字母放最前面組合成串

export function stringToBase62(str) {
    let binaryStr = '';
    Array.from(str).forEach(char => {
        const binaryChar = char.charCodeAt(0).toString(2).padStart(8, '0');
        binaryStr += binaryChar;
    });

    const number = BigInt('0b' + binaryStr);

    return encodeBase62InBigInt(number);

}

function encodeBase62InBigInt(number) {
    const base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let result = '';
    do {
        result = base62Chars[number % 62n] + result;
        number = number / 62n;

    } while (number > 0n)

    return result;

}

// const str = 'Man';
// const base62Str = stringToBase62(str);
// console.log(base62Str); 