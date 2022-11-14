import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne (id: number)
    {   
        const requestedUser = await this.repository.findOneBy({id});
        if (!requestedUser)
            throw new NotFoundException ('User not found');
        return requestedUser;
    }

    async find ()
    {
        return await this.repository.find();
    }   

    async findByEmail (email: string)
    {
        const findUser = await this.repository.findBy ({email});
        if (!findUser)
            throw new NotFoundException('User not found');
        return findUser;
    }

    async update (id: number, properties: Partial<User>)
    {
        const userToBeUpdated =  await this.findOne (id);
        if (!userToBeUpdated)
            throw new NotFoundException ('User not found.');
        Object.assign (userToBeUpdated, properties);
        return this.repository.save (userToBeUpdated);
    }

    async remove (id: number)
    {
        const userToBeRemoved = await this.findOne (id);
        if (!userToBeRemoved)
            throw new NotFoundException ('User not found.');
        return this.repository.remove (userToBeRemoved);
    }
}
