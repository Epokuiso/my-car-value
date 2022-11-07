import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

const cookieSession = require ('cookie-session');


const bootstrap = async () =>
{
    const app = await NestFactory.create (AppModule);
    app.use (cookieSession ({
        keys: ['epokuiso']
    }));
    app.useGlobalPipes (
        new ValidationPipe ({
            whitelist: true
    }));
    app.listen (4000);
}

bootstrap ();