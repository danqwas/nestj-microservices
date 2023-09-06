import { UserService } from './user.service';

import { Controller } from '@nestjs/common';
import { UserMSG } from 'src/common/constants';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMSG.CREATE_USER, {
    transport: Transport.RMQ,
  })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern(UserMSG.FIND_ALL_USERS, {
    transport: Transport.RMQ,
  })
  findAll() {
    console.log('findAll');
    return this.userService.findAll();
  }

  @MessagePattern(UserMSG.FIND_USER_BY_ID, {
    transport: Transport.RMQ,
  })
  findOne(@Payload() id: string) {
    console.log('the' + id);
    return this.userService.findOne(id);
  }

  @MessagePattern(UserMSG.UPDATE_USER, {
    transport: Transport.RMQ,
  })
  update(@Payload() payload: { id: string; updateUserDto: UpdateUserDto }) {
    return this.userService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern(UserMSG.DELETE_USER, {
    transport: Transport.RMQ,
  })
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }
}
