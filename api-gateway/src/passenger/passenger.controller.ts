import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { PassengerMSG } from 'src/common/enums/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperflights } from 'src/common/proxy/client-proxy';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@ApiTags('passengers')
@Controller({
  path: 'passengers',
  version: '1',
})
export class PassengerController {
  constructor(private readonly clientProxy: ClientProxySuperflights) {}

  private clientProxyPassengers = this.clientProxy.clientProxyPassengers();
  @Post()
  createPassenger(
    @Body() createPassengerDto: CreatePassengerDto,
  ): Observable<IPassenger> {
    return this.clientProxyPassengers.send(PassengerMSG.CREATE_PASSENGER, {
      createPassengerDto,
    });
  }
  @Get()
  findAllPassengers(): Observable<IPassenger[]> {
    return this.clientProxyPassengers.send(
      PassengerMSG.FIND_ALL_PASSENGERS,
      '',
    );
  }
  @Get('/:term')
  findPassengerByTerm(@Param('term') term: string): Observable<IPassenger> {
    return this.clientProxyPassengers.send(PassengerMSG.FIND_PASSENGER_BY_ID, {
      term,
    });
  }
  @Patch('/:id')
  updatePassenger(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePassengerDto,
  ): Observable<IPassenger> {
    return this.clientProxyPassengers.send(PassengerMSG.UPDATE_PASSENGER, {
      id,
      updateUserDto,
    });
  }
  @Delete('/:id')
  deletePassenger(@Param('id') id: string): Observable<IPassenger> {
    return this.clientProxyPassengers.send(PassengerMSG.DELETE_PASSENGER, {
      id,
    });
  }
}
