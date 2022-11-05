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
    create (@Body () userInformation: CreateUserDTO)
    {
        this.usersService.create (userInformation.email, userInformation.password);        
    }

    @Get()
    findAll ()
    {
        return this.usersService.find ();
    }

    @Get('/:id')
    find (@Param ('id') id: string)
    {
        return this.usersService.findOne (parseInt (id)); 
    }

    @Patch('/:id')
    update (@Param ('id') id: string, @Body() updateInformation: Partial<CreateUserDTO>)
    {
        return this.usersService.update (parseInt (id), updateInformation);
    }

    @Delete('/:id')
    delete (@Param ('id') id: string)
    {
        return this.usersService.remove (parseFloat (id));
    }
}
