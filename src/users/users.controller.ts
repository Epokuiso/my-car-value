import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Param, 
    Body,
    Query,
    Session,
    UseGuards
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user-dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize (UserDTO)
@Controller('/users')
export class UsersController 
{
    constructor (
        private usersService: UsersService,
        private authService: AuthService
    ) {}
    
    @UseGuards (AuthGuard)
    @Get ('/auth/whoami')
    whoAmI (@CurrentUser () user: User)
    {
        return user;
    }

    @Post('/auth/signUp')
    create (@Body () userInformation: CreateUserDTO, @Session () session: any)
    {
        const user = this.authService.signup (userInformation.email, userInformation.password);
        session.userId =  user;
        return user;      
    }

    @Post('/auth/signIn')
    async signIn (@Body () userInformation: CreateUserDTO, @Session () session: any)
    {
        const user = await this.authService.signin (userInformation.email, userInformation.password);
        session.userId =  user.id;
        return user;
    }

    @Post('/auth/signOut')
    signOut (@Session () session: any)
    {
        session.userId = null;
    }

    @Get()
    async findAll (@Query ('email') email: string)
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
