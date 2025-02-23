import CryptoJS from "crypto-js";

const apikey = process.env.EXPO_PUBLIC_API_KEY // Secret key used for signing and verifying JWTs
export function encryptString(string) {
var key = CryptoJS.enc.Utf8.parse(apikey);
  var iv = CryptoJS.enc.Utf8.parse(apikey);
  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(string.toString()),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  
  return encrypted.toString();
}
export function decryptString(string) {
  var key = CryptoJS.enc.Utf8.parse(apikey);
  var iv = CryptoJS.enc.Utf8.parse(apikey);
  var decrypted = CryptoJS.AES.decrypt(string, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
