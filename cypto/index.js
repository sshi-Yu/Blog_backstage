/* 使用cypto-js加密 */
var CryptoJS = require("crypto-js");
var secret = 'secretCrypto'
//crypto-js 是一个纯 javascript 写的加密算法类库 ，可以非常方便地在 javascript 进行 MD5、SHA1、SHA2、SHA3、RIPEMD-160 哈希散列，进行 AES、DES、Rabbit、RC4、Triple DES 加解密。

// Encrypt 加密方法 key密钥
function encrypter(data) {
    return CryptoJS.AES.encrypt(data.toString(), secret).toString()
}
// Decrypt 解密方法
function decrypter(encryptData) {
    let bytes = CryptoJS.AES.decrypt(encryptData.toString(), secret);
    return bytes.toString(CryptoJS.enc.Utf8)
}

module.exports = {
    encrypter,
    decrypter
}