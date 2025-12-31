import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      id: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}