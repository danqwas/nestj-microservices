import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxySuperflights } from '../common/proxy/client-proxy';
import { FlightMSG, PassengerMSG } from 'src/common/enums/constants';
import { CreateFlightDto } from './dto/create-flight.dto';
import { Observable, firstValueFrom } from 'rxjs';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { CreatePassengerDto } from 'src/passenger/dto/create-passenger.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('flights')
@Controller({
  path: 'flights',
  version: '1',
})
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperflights) {}

  private clientProxyFlights = this.clientProxy.clientProxyFlights();
  private clientProxyPassengers = this.clientProxy.clientProxyPassengers();

  @Post()
  createFlight(@Body() createFlightDto: CreateFlightDto): Observable<IFlight> {
    return this.clientProxyFlights.send(FlightMSG.CREATE_FLIGHT, {
      createFlightDto,
    });
  }

  @Get()
  findAllFlights(): Observable<IFlight[]> {
    return this.clientProxyFlights.send(FlightMSG.FIND_ALL_FLIGHTS, '');
  }

  @Get(':term')
  findFlightByterm(@Param('term') term: string): Observable<IFlight> {
    return this.clientProxyFlights.send(FlightMSG.FIND_FLIGHT_BY_ID, { term });
  }

  @Patch(':id')
  updateFlight(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    return this.clientProxyFlights.send(FlightMSG.UPDATE_FLIGHT, {
      id,
      updateFlightDto,
    });
  }

  @Delete(':id')
  deleteFlight(@Param('id') id: string) {
    return this.clientProxyFlights.send(FlightMSG.DELETE_FLIGHT, { id });
  }

  @Post(':flightId/passengers/:passengerId')
  async addPassenger(
    @Body() createPassengerDto: CreatePassengerDto,
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await firstValueFrom(
      this.clientProxyPassengers.send(
        PassengerMSG.FIND_PASSENGER_BY_ID,
        passengerId,
      ),
    );
    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

    return this.clientProxyFlights.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
      createPassengerDto,
    });
  }
}
