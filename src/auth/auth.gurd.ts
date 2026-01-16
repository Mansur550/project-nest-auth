import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";


@Injectable()
export class AuthGurd implements CanActivate {
    constructor(private jwtService: JwtService) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const token = req.cookies?.access_token;
        if (!token)
            throw new UnauthorizedException('No access token found');
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
            req['user'] = payload; //attach user info
            return true;

        } catch {

            throw new UnauthorizedException('Invalid or expired tokken');
        }


    }

}