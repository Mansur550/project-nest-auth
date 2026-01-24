import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Res } from '@nestjs/common';
import { Req } from '@nestjs/common';
import type { Response } from 'express';
import type { Request } from 'express';
import { AuthGuard } from './auth.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  @Get()

  @UseGuards(AuthGuard)
  findAll() {
    return this.authService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
  @Patch('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateAuthDto: UpdateAuthDto,
  ) {
    return this.authService.update(id, updateAuthDto);
  }


  @Delete('remove/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  // POST Signup
  @Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signUp(signupData);

  }

  // POST Login 
  @Post('login')
  async login(@Body() credentials: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(credentials);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,

    });
    return { message: 'Login successful' };

  }



  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    const payload = this.authService.verifyRefreshToken(refreshToken);
    const newAccessToken = this.authService.createAccessToken(payload.userId);

    // update access_token cookie
    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

    return { message: 'Access token refreshed' };
  }

  //Profile







}
