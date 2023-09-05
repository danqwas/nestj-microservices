import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlightDto {
  @IsNotEmpty()
  @IsString()
  pilot: string;
  @IsNotEmpty()
  @IsString()
  airplane: string;
  @IsNotEmpty()
  @IsString()
  destinationCity: string;
  @IsNotEmpty()
  @IsString()
  flightDate: Date;
}
