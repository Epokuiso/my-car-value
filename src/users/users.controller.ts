import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Param, 
    Body,
    Query
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user-dto';
import { AuthService } from './auth.service';

@Serialize (UserDTO)
@Controller('/users')
export class UsersController 
{
    constructor (
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Post('/auth/signup')
    create (@Body () userInformation: CreateUserDTO)
    {
        return this.authService.signup (userInformation.email, userInformation.password);        
    }

    @Get()
    findAll (@Query ('email') email: string)
    {
        if (email)
            return this.usersService.findByEmail (email);
        return this.usersService.find ();
    }

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
