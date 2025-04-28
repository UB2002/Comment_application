import Redis from "ioredis";
import { REDIS_URL } from "./config";

export const pub = new Redis(REDIS_URL);
export const sub = new Redis(REDIS_URL);

// Add connection event listeners
pub.on('connect', () => console.log('Connected to Redis (Publisher)'));
sub.on('connect', () => console.log('Connected to Redis (Subscriber)'));

pub.on('error', (err) => console.error('Redis Publisher error:', err));
sub.on('error', (err) => console.error('Redis Subscriber error:', err));
