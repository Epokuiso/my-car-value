import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Param, 
    Body, 
    ParseIntPipe
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController 
{
    constructor (
        private usersService: UsersService
    ) {}

    @Post('/auth/signup')
    createUser (@Body () userInformation: CreateUserDTO)
    {
        this.usersService.create (userInformation.email, userInformation.password);        
    }

    @Get()
    findAllUsers ()
    {
        return this.usersService.find ();
    }

    @Get('/:id')
    findUser (@Param('id') id: string)
    {
        return this.usersService.findOne (parseInt(id)); 
    }
}
