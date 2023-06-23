import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CustomerModule } from '../../src/customer.module';

describe('[Customer] 사용자(Customer)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('회원가입(SignUp)', () => {
    it('POST /signup 사용자의 회원가입을 진행해야 한다.', () => {
      return request(app.getHttpServer())
        .post('/signup')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('로그인(SignIn)', () => {
    it('POST /signin 사용자의 로그인을 진행해야 한다.', () => {
      return request(app.getHttpServer())
        .post('/signin')
        .expect(200)
        .expect('Hello World!');
    });
  });
});
