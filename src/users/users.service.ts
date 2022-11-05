import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService 
{
    constructor (
        @InjectRepository(User) private repository: Repository <User>
    ) {}

    create (email: string, password: string)
    {
        const newUser = this.repository.create ({ email, password });
        return this.repository.save (newUser);
    }

    findOne (id: number)
    {
        return this.repository.findOneBy({id});
    }

    find ()
    {
        return this.repository.find();
    }   

    update ()
    {

    }

    remove ()
    {

    }
}
