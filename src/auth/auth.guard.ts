import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();

        // Read access token from cookies
        const token = req.cookies?.access_token;
        if (!token) {
            throw new UnauthorizedException('No access token found');
        }

        try {
            //  Verify token with the same secret used in AuthService
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });

            //  Attach payload to request so controllers can use it
            req['user'] = payload;

            //  Allow access
            return true;
        } catch (err) {
            console.error('AuthGuard error:', err.message);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

}