import { sign, decode } from 'react-native-pure-jwt';
console.log(sign,decode)

const key = process.env.EXPO_PUBLIC_API_KEY // Secret key used for signing and verifying JWTs
console.log(key,"key")
// Encrypt username and password into a JWT
export async function encryptString(username, password) {
  try {
    // Create an object with username and password to sign into the JWT
    const token = await sign({ username, password }, key); // Optional expiration
    console.log(token)
    return token; // Return the encrypted JWT token
  } catch (error) {
    console.error("Error signing token:", error);
    throw new Error("Encryption failed");
  }
}

// Decrypt the JWT to retrieve the original username and password
export async function decryptString(token) {
  try {
    // Verify and decode the token
    const decoded = await decode(token, key);
    return decoded; // Return the decrypted payload with username and password
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Decryption failed");
  }
}
