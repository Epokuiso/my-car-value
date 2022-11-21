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

  it('Handles a signup request', () => 
  {
    const email = 'emailtest@gmail.com';

    return request (app.getHttpServer())
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
});
