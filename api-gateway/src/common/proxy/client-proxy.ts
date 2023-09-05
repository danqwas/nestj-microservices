import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RabbitMQQueue } from '../enums/constants';

@Injectable()
export class ClientProxySuperflights {
  constructor(private readonly configService: ConfigService) {}

  clientProxyUsers(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('AMQP_URL')],
        queue: RabbitMQQueue.USERS,
      },
    });
  }
  clientProxyPassengers(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('AMQP_URL')],
        queue: RabbitMQQueue.PASSENGER,
      },
    });
  }
  clientProxyFlights(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('AMQP_URL')],
        queue: RabbitMQQueue.FLIGHT,
      },
    });
  }
}
