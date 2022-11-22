import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => 
{
  let app: INestApplication;

  beforeEach(async () => 
  {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Handles a signup request', async () => 
  {
    const email = 'emailtest@gmail.com';

    return await request (app.getHttpServer())
      .post ('/users/auth/signUp')
      .send ({ email, password: 'myFirstIntegrationTest'})
      .expect (201)
      .then (response =>
      {
          const { id, email } = response.body;
          expect (id).toBeDefined ();
          expect (email).toEqual (email);
      });
  });

  it ('Signup as new user then get the currently logged user.', async () =>
  {
    const {email, password} = { email: 'nestjs@gmail.com', password: 'JestTests'};
    
    await request (app.getHttpServer ())
      .post ('/users/auth/signUp')
      .send ({ email, password })
      .expect (201);

    const response = await request (app.getHttpServer ())
      .post ('/users/auth/SignIn')
      .send ({ email, password })
      .expect (201);

    const cookie = response.get ('Set-Cookie');

    const { body } = await request (app.getHttpServer ())
      .get ('/users/auth/whoami')
      .set ('Cookie', cookie)
      .expect (200);

    expect (body?.email).toEqual (email);
  });
});
