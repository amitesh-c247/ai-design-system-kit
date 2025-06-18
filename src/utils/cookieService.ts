import crypto from 'crypto';
import Cookies from 'js-cookie';

const WORKING_KEY = process.env.NEXT_PUBLIC_TEXT_ENCRYPT_KEY || 'your-default-key';
const SECRET = process.env.NEXT_PUBLIC_JSON_DECRYPT_KEY || 'your-default-secret';

// Text encryption/decryption
const textEncrypt = (plainText: string): string => {
  const m = crypto.createHash('md5');
  m.update(WORKING_KEY);
  const key = m.digest();
  const iv = Buffer.from('\x0c\x0d\x0e\x0f\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b');
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encoded = cipher.update(plainText, 'utf8', 'hex');
  encoded += cipher.final('hex');
  return encoded;
};

const textDecrypt = (encText: string): string | null => {
  if (typeof encText !== 'string' || encText === '') {
    return encText;
  }
  try {
    const m = crypto.createHash('md5');
    m.update(WORKING_KEY);
    const key = m.digest();
    const iv = Buffer.from('\x0c\x0d\x0e\x0f\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b');
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decoded = decipher.update(encText, 'hex', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// JSON encryption/decryption
interface EncryptedData {
  encrypted: string;
  iv: string;
}

const jsonEncrypt = (data: unknown): EncryptedData => {
  const key = Buffer.from(SECRET.substring(0, 32), 'utf-8');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  const jsonString = JSON.stringify(data);
  let encrypted = cipher.update(jsonString, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  return {
    encrypted,
    iv: iv.toString('base64'),
  };
};

const jsonDecrypt = (encryptedData: EncryptedData): unknown => {
  try {
    const key = Buffer.from(SECRET.substring(0, 32), 'utf-8');
    const iv = Buffer.from(encryptedData.iv, 'base64');
    const encrypted = Buffer.from(encryptedData.encrypted, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decrypted.toString('utf8'));
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Cookie options
const defaultCookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

export const cookieService = {
  // Set cookie with encryption
  set: (key: string, value: unknown, options = {}): void => {
    const encryptedKey = textEncrypt(key);
    const encryptedValue = textEncrypt(JSON.stringify(value));
    
    Cookies.set(encryptedKey, encryptedValue, {
      ...defaultCookieOptions,
      ...options,
    });
  },

  // Get cookie with decryption
  get: <T>(key: string): T | null => {
    const encryptedKey = textEncrypt(key);
    const encryptedValue = Cookies.get(encryptedKey);
    
    if (!encryptedValue) return null;
    
    const decryptedValue = textDecrypt(encryptedValue);
    if (!decryptedValue) return null;
    
    try {
      return JSON.parse(decryptedValue) as T;
    } catch {
      return null;
    }
  },

  // Remove cookie
  remove: (key: string, options = {}): void => {
    const encryptedKey = textEncrypt(key);
    Cookies.remove(encryptedKey, {
      ...defaultCookieOptions,
      ...options,
    });
  },

  // Set JSON cookie with encryption
  setJson: (key: string, value: unknown, options = {}): void => {
    const encryptedKey = textEncrypt(key);
    const encryptedData = jsonEncrypt(value);
    
    Cookies.set(encryptedKey, JSON.stringify(encryptedData), {
      ...defaultCookieOptions,
      ...options,
    });
  },

  // Get JSON cookie with decryption
  getJson: <T>(key: string): T | null => {
    const encryptedKey = textEncrypt(key);
    const encryptedValue = Cookies.get(encryptedKey);
    
    if (!encryptedValue) return null;
    
    try {
      const encryptedData = JSON.parse(encryptedValue) as EncryptedData;
      return jsonDecrypt(encryptedData) as T;
    } catch {
      return null;
    }
  },
}; 