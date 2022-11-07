import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { NotFoundError } from "rxjs";

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

    async signin (email: string, password: string)
    {
        const [user] = await this.usersService.findByEmail (email);
        if (!user)
            throw new NotFoundException ('User not found');

        const [salt, storedHash] = user.password.split ('.');
        const hash = (await scrypt (password, salt, 32)) as Buffer;
     
        if (storedHash !== hash.toString ('hex'))
            throw new BadRequestException ('The password provided is not correct');
        return user;
    }

}