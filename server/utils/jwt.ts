import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export interface TokenPayload {
    id: string;
    admin: boolean;
    fullName: string;
}

export function signToken(payload: TokenPayload): string {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
    try {
        const payload = jwt.verify(token, SECRET) as TokenPayload;
        return payload;
    } catch (error) {
        return null;
    }
}
