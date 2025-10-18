import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

export interface IAuthRequest extends Request {
    user?: IUser;
}

interface JwtPayload {
    id: string;
    role: string;
}

export const auth = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Acceso denegado. Token no proporcionado' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret') as JwtPayload;
        req.user = decoded as any;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            message: 'Token inválido' 
        });
    }
};

export const checkRole = (roles: string[]) => {
    return async (req: IAuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no autenticado'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'No tiene permisos para realizar esta acción'
            });
        }

        next();
    };
};