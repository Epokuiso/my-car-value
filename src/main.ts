import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

const cookieSession = require ('cookie-session');


const bootstrap = async () =>
{
    const app = await NestFactory.create (AppModule);    
    app.listen (5000);
}

bootstrap ();