import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Param, 
    Body,
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user-dto';

@Controller('/users')
export class UsersController 
{
    constructor (
        private usersService: UsersService
    ) {}

    @Post('/auth/signup')
    create (@Body () userInformation: CreateUserDTO)
    {
        this.usersService.create (userInformation.email, userInformation.password);        
    }

    @Get()
    findAll ()
    {
        return this.usersService.find ();
    }


    @UseInterceptors (new SerializeInterceptor (UserDTO))
    @Get('/:id')
    find (@Param ('id') id: string)
    {
        console.log ("This is the handler");
        return this.usersService.findOne (parseInt (id)); 
    }

    @Patch('/:id')
    update (@Param ('id') id: string, @Body() updateInformation: UpdateUserDTO)
    {
        return this.usersService.update (parseInt (id), updateInformation);
    }

    @Delete('/:id')
    delete (@Param ('id') id: string)
    {
        return this.usersService.remove (parseFloat (id));
    }
}
