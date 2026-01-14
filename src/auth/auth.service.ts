import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  //inject
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }



  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
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

    // 5️⃣ Return a success message
    return { message: 'User created successfully' };




  };



}











