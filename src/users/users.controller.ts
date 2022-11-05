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

@Controller('auth')
export class UsersController 
{
    @Post('/signup')
    createUser (@Body () userInformation: CreateUserDTO)
    {
        console.log(userInformation);
    }

    @Get('/:id')
    findUser (@Param() id: string)
    {
        console.log (`Here's the id: ${id}.`);
        return "Hello World";
    }
}
