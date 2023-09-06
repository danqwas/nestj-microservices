import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    UserModule,
    PassengerModule,
    FlightModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
