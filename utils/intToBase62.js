const base62Chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(number){
    let result='';

    do{
        result=base62Chars[number%62]+result;
        number=Math.floor(number/62);
    }while(number>0)
    
    return result;

}

// const num = 12345;
// const base62Str = encodeBase62(num);
// console.log(base62Str);
