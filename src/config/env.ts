import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 4000;
export const OMDB_API_KEY = process.env.OMDB_API_KEY || '';
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
export const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || '15m';
export const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || '7d';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/moviedb';
