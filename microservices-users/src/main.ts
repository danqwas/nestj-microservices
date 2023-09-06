import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMQQueue } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,

      options: {
        urls: [process.env.AQMP_URL],
        queue: RabbitMQQueue.USERS,
      },
    },
  );
  await app.listen();
}
bootstrap();
