import CryptoJS from "crypto-js";

const apikey = process.env.EXPO_PUBLIC_API_KEY; // Secret key used for signing and verifying JWTs
console.log(apikey, "apikey");

export function encryptString(value) {
  var key = CryptoJS.enc.Utf8.parse(apikey);
  var iv = CryptoJS.enc.Utf8.parse(apikey);

  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(value.toString()),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  var encryptedString = encrypted.toString(CryptoJS.format.Base64);
  console.log(encryptedString.replace(/-/g, "/"), "encryptedString");
  encryptedString = encryptedString.replace(/\//g, "-");
  console.log(encryptedString, "encryptedString with -");
  return encryptedString;
}
export function decryptString(value) {
  var key = CryptoJS.enc.Utf8.parse(apikey);
  var iv = CryptoJS.enc.Utf8.parse(apikey);
  var encryptedString = value.replace(/-/g, "/");
  console.log(value.replace(/-/g, "/"), "decryptString");
  var decrypted = CryptoJS.AES.decrypt(encryptedString, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
