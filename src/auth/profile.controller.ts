import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from './auth.guard'
import type { Request } from 'express';


@Controller('profile')
export class ProfileController {

    @Get()
    @UseGuards(AuthGuard)
    getPofile(@Req() req: Request) {
        return {
            message: 'This is a protected route',
            user: req['user']

        }
    }

}