import { NestFactory } from "@nestjs/core";
import { Module } from "@nestjs/common";

@Module({})
class MainModule {};

const bootstrap = async () =>
{
    const app = await NestFactory.create (MainModule);
    app.listen (3000);
}

bootstrap ();