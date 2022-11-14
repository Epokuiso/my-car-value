import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService} from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe ('AuthService', () =>
{
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach (async () => 
    {
        fakeUsersService = {
            find: () => Promise.resolve ([]),
            findByEmail: (email: string) => Promise.resolve ([]),
            create: (email: string, password: string) => 
                Promise.resolve ({ id: 1, email, password } as User)
        }

        const module = await Test.createTestingModule ({
            providers: [AuthService,
            {
                provide: UsersService,
                useValue: fakeUsersService
            }],
            
        }).compile ();

        service = module.get (AuthService);
    });


    it ('can create an instance of auth service', async () => 
    {
        expect (service).toBeDefined ();    
    });

    it ('creates a new user with a salted and hashed password', async () =>
    {
        const user = await service.signup ('belaebarros@hotmail.com', 'Acredita');
        expect (user.password).not.toEqual ('Acredita');

        const [salt, hash] = user.password.split ('.');
        expect (salt).toBeDefined ();
        expect (hash).toBeDefined ();
    });

    it ('throws an error if the provided email in the signup is already in use', async () =>
    {
        fakeUsersService.findByEmail = () => 
            Promise.resolve ([{ id: 1, email: 'a', password: 'a'} as User ]);
        await expect (service.signup('minga@gmail.com', 'Acredita'))
            .rejects.toThrowError (BadRequestException);
    });

    it ('throws an error if the provided user email for the signin is not registered', async () =>
    {
        await expect (service.signin ('minga@gmail.com', 'Acredita'))
            .rejects.toThrowError (NotFoundException);
    })

    it ('throws an error if an invalid password is provided', async () =>
    {
        fakeUsersService.findByEmail = () => 
            Promise.resolve ([{ email: 'nestjs@gmail.com', password: 'Acredita'} as User ]);
        await expect (service.signin('nestjs@gmail.com', 'Acredita'))
            .rejects.toThrowError (BadRequestException);
    });

    it ('returns a user if a valid password & email are provided', async () =>
    {
        fakeUsersService.findByEmail = () => 
            Promise.resolve ([{ 
                email: 'nestjs@gmail.com', 
                password: 'd94104ccd65107a9.42756fc4b90458b2d236846ca3e1012fc9d87f8091d2f0b79dd040d58a1434bc'
            } as User ]);
        
        const user = await service.signin ('something', 'Acredita'); 
        expect (user).toBeDefined ();
    });
});