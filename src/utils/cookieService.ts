import crypto from 'crypto';
import Cookies from 'js-cookie';

const WORKING_KEY = process.env.NEXT_PUBLIC_TEXT_ENCRYPT_KEY || 'your-default-key';

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
  if (!encText || typeof encText !== 'string') {
    return null;
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
  }
}; 