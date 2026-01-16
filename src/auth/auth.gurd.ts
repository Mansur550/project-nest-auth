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

        } catch (error) {

        }


    }

}