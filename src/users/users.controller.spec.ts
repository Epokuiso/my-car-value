import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => 
{
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;
  

  beforeEach(async () => 
  {
    fakeAuthService = {
      signup: (email: string, password: string) => Promise.resolve ({} as User),
      signin: (email: string, password: string) => Promise.resolve ({} as User)
    };
    fakeUsersService = {
      findByEmail: (email: string) => Promise.resolve ([{ id: 7, email, password: 'Acredita'} as User]),
      find: () => Promise.resolve ([]),
      findOne: (userId: number) => Promise.resolve ({} as User),
      update: (id: number, userProperties: User) => Promise.resolve ({} as User),
      remove: (id: number) => Promise.resolve ({} as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile ();

    controller = module.get<UsersController> (UsersController);
  });

  it ('Should be defined', () => 
  {
    expect (controller).toBeDefined ();
  });

  it ('Find the user with the given email', async () =>
  {
    const user = await fakeUsersService.findByEmail ('nestjs@gmail.com');
    expect (user).toBeDefined ();
  });

  it ('A user can log in into the system', async () =>
  {
    fakeAuthService.signin = (email, password) => 
      Promise.resolve ({
        email: 'nestjs@gmail.com',
        password: 'password'
      } as User)

      const session = { userId: null };
      const user = await controller.signIn ({email: 'sim',password: 'a'}, session);
      expect (user.id).toEqual(session.userId);
  })
});
