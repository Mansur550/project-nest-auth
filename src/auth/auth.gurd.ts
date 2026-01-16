import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGurd implements CanActivate {
    constructor(private jwtService: JwtService) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}