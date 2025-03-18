import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { encryptString, decryptString } from "../utils/encryption";
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from "./apiEndpoints";

const encryptedQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers) => {
        const token = await SecureStore.getItemAsync("authToken");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
    fetchFn: async (...args) => {
        let [url, options] = args;

        console.log("🔹 Original URL:", url);
        console.log("🔹 Original Options:", options);

        if (!options) options = {};

        // ✅ Encrypt Payload Safely
        if (options.body) {
            try {
                const parsedBody = JSON.parse(options.body);
                options.body = JSON.stringify({
                    encryptedData: encryptString(JSON.stringify(parsedBody))
                });
                console.log("✅ Encrypted Body:", options.body);
            } catch (error) {
                console.error("❌ Body Encryption Error:", error);
                return { error: { status: 500, data: "Body encryption failed" } };
            }
        }

        // ✅ Encrypt URL (only if required)
        const encryptedUrl = process.env.ENCRYPT_URLS ? encryptString(url) : url;
        console.log("✅ Encrypted URL:", encryptedUrl);

        let response;
        try {
            response = await fetch(encryptedUrl, options);
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            return { error: { status: 500, data: "Network request failed" } };
        }

        console.log("🔹 Raw Response Status:", response.status);

        let responseText;
        try {
            responseText = await response.text();
            console.log("🔹 Raw Response Text:", responseText);
        } catch (error) {
            console.error("❌ Response Text Error:", error);
            return { error: { status: response.status, data: "Failed to read response text" } };
        }

        // ✅ Decrypt Response Safely
        let decryptedResponse;
        try {
            decryptedResponse = JSON.parse(decryptString(responseText));
            console.log("✅ Decrypted Response:", decryptedResponse);
        } catch (error) {
            console.error("❌ Decryption Error:", error);
            return { error: { status: response.status, data: responseText } };
        }

        return {
            ...response,
            data: decryptedResponse,
        };
    },
});

export default encryptedQuery;
