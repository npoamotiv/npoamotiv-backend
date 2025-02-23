import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.userModel.findOne({ where: { login } });
  }

  async findByTabel(tabel: string): Promise<User | null> {
    return this.userModel.findOne({ where: { tabel } });
  }
}