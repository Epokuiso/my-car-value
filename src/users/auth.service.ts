import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify (_scrypt);

@Injectable ()
export class AuthService 
{
    constructor (private usersService: UsersService) { }

    async signup (email: string, password: string)
    {
        const userEnteredEmail = await this.usersService.findByEmail (email);
        if (userEnteredEmail.length)
            throw new BadRequestException ('The entered email is already in use.');
        
        const salt = randomBytes(8).toString ('hex');
        const hash = (await scrypt (password, salt, 32)) as Buffer;
        const resultantPassword = salt + '.' + hash.toString ('hex');

        const newUser = await this.usersService.create (email, resultantPassword);
        return newUser;
    }

    signin ()
    {

    }

}