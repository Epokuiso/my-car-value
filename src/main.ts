import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

const bootstrap = async () =>
{
    const app = await NestFactory.create (AppModule);
    app.useGlobalPipes (
        new ValidationPipe ({
            whitelist: true
    }));
    app.listen (4000);
}

bootstrap ();