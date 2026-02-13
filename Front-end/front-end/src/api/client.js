
import axios from 'axios';
import { Platform } from 'react-native';

// Use special IP for Android emulator (10.0.2.2), localhost for iOS simulator
// For physical device, you need to use your computer's local IP address (e.g., 192.168.1.x)
const DEV_URL = Platform.select({
    android: 'http://172.25.172.154:3001/api', // Use local IP for physical device
    ios: 'http://localhost:3001/api',
    default: 'http://172.25.172.154:3001/api', // Fallback
});

const client = axios.create({
    baseURL: DEV_URL,
});

export default client;
