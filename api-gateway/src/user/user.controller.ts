import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ClientProxySuperflights } from 'src/common/proxy/client-proxy';
import { CreateUserDto } from './dto/create-user.dto';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/enums/constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '2',
})
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperflights) {}
  private clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.CREATE_USER, createUserDto);
  }
  @Get()
  findAllUsers(): Observable<IUser[]> {
    return this.clientProxyUser.send(UserMSG.FIND_ALL_USERS, '');
  }

  @Get(':term')
  findUserByTerm(@Param('term') term: string): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.FIND_USER_BY_ID, term);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.UPDATE_USER, {
      id,
      updateUserDto,
    });
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.DELETE_USER, id);
  }
}
