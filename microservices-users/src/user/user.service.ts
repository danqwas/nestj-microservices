import { HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IUser } from '../common/models/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return bcrypt.compare(password, passwordDB);
  }

  async findByUsername(username: string) {
    return this.model.findOne({ username });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    if (!createUserDto || !createUserDto.password) {
      throw new Error('createUserDto o su contraseña no están definidos');
    }
    console.log('createUserDto:', createUserDto.userName);

    const salt = await bcrypt.genSalt(10);
    console.log('Salt generado:', salt);

    const hash = await bcrypt.hash(createUserDto.password, salt);
    console.log('Contraseña hasheada:', hash);

    const newUser = new this.model({
      ...createUserDto,
      password: hash,
      username: createUserDto.userName,
    });
    console.log('Nuevo usuario:', newUser);

    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<IUser> {
    return this.model.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    // Generar salt
    const salt = await bcrypt.genSalt(10);

    // Hashear contraseña con salt
    const hash = await bcrypt.hash(updateUserDto.password, salt);

    const user = { ...updateUserDto, password: hash };
    return this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).then((deletedUser) => {
      if (!deletedUser) {
        return {
          status: HttpStatus.NOT_FOUND,
          msg: 'User not found',
        };
      }
      return {
        status: HttpStatus.OK,
        msg: 'Deleted',
      };
    });
  }
}
