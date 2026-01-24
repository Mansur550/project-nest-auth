import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  //inject
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>, private jwtService: JwtService,
    @Inject('REFRESH_SECRET') private readonly refreshSecret: string,
  ) { }


  //get all users
  async findAll() {
    return this.userRepo.find({
      select: ['id', 'name', 'email'], // never return password
    });
  }


  //get user by id
  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }


  //update user
  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateAuthDto.password) {
      updateAuthDto.password = await bcrypt.hash(
        updateAuthDto.password,
        10,
      );
    }

    Object.assign(user, updateAuthDto);
    await this.userRepo.save(user);

    return {
      message: 'User updated successfully',
    };
  }
  //remove user
  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepo.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }



  //signup
  async signUp(signupData: SignupDto): Promise<{ message: string }> {
    const { name, email, password } = signupData;
    //chek if email in use
    const emailInUse = await this.userRepo.findOne({
      where: { email: email }
    });
    if (emailInUse) {
      throw new BadRequestException("Enail Already in Use");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user and save in Database

    const user = this.userRepo.create({
      name: name,
      email: email,
      password: hashedPassword,

    })

    await this.userRepo.save(user);

    // Return a success message
    return { message: 'User created successfully' };
  };







  //LogIn
  async login(credentials: LoginDto) {

    const { email, password } = credentials;

    //Find If user Exist
    const user = await this.userRepo.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      throw new UnauthorizedException("Wrong email or password");
    }
    // compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException("Wrong email or password");
    }

    //Generate JWT token 

    return this.generateUserToken(user.id)

  }

  //access token
  async generateUserToken(userId: number) {
    const payload = { sub: userId };
    const accessToken = this.jwtService.sign(
      //{ userId }
      payload,
      {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET,
      }

    );
    const refreshToken = this.jwtService.sign(payload,
      {
        secret: this.refreshSecret,
        expiresIn: '7d',

      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.refreshSecret,
      });
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  createAccessToken(userId: number) {
    return this.jwtService.sign(
      { userId },
      { expiresIn: '15m' }
    );
  }




}