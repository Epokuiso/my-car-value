import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Param, 
    Body 
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('/auth')
export class UsersController 
{
    constructor (
        private usersService: UsersService
    ) {}

    @Post('/signup')
    createUser (@Body () userInformation: CreateUserDTO)
    {
        this.usersService.create (userInformation.email, userInformation.password);        
    }

    @Get('/:id')
    findUser (@Param() id: string)
    {
        console.log (id);
        return "Hello World";
    }
}
