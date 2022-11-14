import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

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
      findByEmail: (email: string) => Promise.resolve ([]),
      find: () => Promise.resolve ([]),
      findOne: (userId: number) => Promise.resolve ({} as User),
      update: (id: number, userProperties: User) => Promise.resolve ({} as User),
      remove: (id: number) => Promise.resolve ({} as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [AuthService]
    }).compile ();

    controller = module.get<UsersController> (UsersController);
  });

  it('should be defined', () => 
  {
    expect (controller).toBeDefined ();
  });
});
