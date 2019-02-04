import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as FileSession from 'session-file-store';
import * as session from 'express-session';
import * as express from 'express';

const FileStore = FileSession(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'La session:',
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false},
      store: new FileStore()
    })
)
  app.set('view engine', 'ejs');
  app.use(express.static('publico'));
  await app.listen(3000);

}
bootstrap();
