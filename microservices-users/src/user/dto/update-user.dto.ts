import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// quiero usar este dto para actualizar usando el dto de crear usuario
export class UpdateUserDto extends PartialType(CreateUserDto) {}
