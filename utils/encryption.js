import CryptoJS from "crypto-js";

// Default API key from environment
const defaultApiKey = process.env.EXPO_PUBLIC_API_KEY || "123456$#@$^@1ERF";

export function encryptString(value, customKey = null) {
  try {
    // Use custom key if provided, otherwise use default
    const apikey = customKey || defaultApiKey;
    console.log("Using API key for encryption:", apikey);

    // Ensure value is a string
    const stringValue = String(value);

    var key = CryptoJS.enc.Utf8.parse(apikey);
    var iv = CryptoJS.enc.Utf8.parse(apikey);

    var encrypted = CryptoJS.AES.encrypt(stringValue, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    var encryptedString = encrypted.toString();

    // Replace / with - for URL safety
    encryptedString = encryptedString.replace(/\//g, "-");

    return encryptedString;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
}
export function decryptString(value, customKey = null) {
  try {
    // Use custom key if provided, otherwise use default
    const apikey = customKey || defaultApiKey;

    // Replace - with / to revert the URL-safe encoding
    const originalValue = value.replace(/-/g, "/");

    var key = CryptoJS.enc.Utf8.parse(apikey);
    var iv = CryptoJS.enc.Utf8.parse(apikey);

    var decrypted = CryptoJS.AES.decrypt(originalValue, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
}
