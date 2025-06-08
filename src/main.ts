import { NestFactory, BaseExceptionFilter } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'], // включаем нужные уровни
  });
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('0.9')
  .addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new BaseExceptionFilter()); 
  app.use(helmet({
    contentSecurityPolicy: false, // Отключаем для API
    crossOriginEmbedderPolicy: false,
    frameguard: false,
    noSniff: true,  // Критично для API
    xssFilter: true,
    hsts: { maxAge: 63072000 }
  }));
  const server = app.getHttpServer();
console.log(
  server._events.request._router.stack
    .filter(r => r.route)
    .map(r => r.route.path)
);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();