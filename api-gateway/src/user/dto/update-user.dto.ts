import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

// quiero usar este dto para actualizar usando el dto de crear usuario
export class UpdateUserDto extends PartialType(CreateUserDto) {}
