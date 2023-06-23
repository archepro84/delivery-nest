import {
  existingUser,
  invalidEmailUser,
  invalidPasswordUser,
  validUser,
} from '../../../fixtures/customer/signup.fixture';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('회원가입(SignUp)', () => {
  it('사용자가 올바른 정보를 입력한다면 회원가입이 되어야 한다.', () => {
    const res = signupUseCase.execute(validUser);

    expect(res).toEqual({
      user: {
        id: expect.any(Number),
        email: validUser.email,
        nickname: validUser.nickname,
      },
      token: expect.any(String),
    });
  });

  it('사용자의 email이 비정상적으로 입력될 경우, 오류를 반환해야 한다.', () => {
    expect(signupUsercase.execute(invalidEmailUser)).toThrowError(
      BadRequestException,
    );
  });

  it('사용자의 email이 이미 존재할 경우, 오류를 반환해야 한다.', () => {
    expect(signupUsercase.execute(existingUser)).toThrowError(
      ConflictException,
    );
  });

  it('사용자의 password가 8자 미만으로 입력한다면, 오류를 반환해야 한다.', () => {
    expect(
      signupUsercase.execute({
        email: invalidPasswordUser.email,
        nickname: invalidPasswordUser.nickname,
        password: 'pwd',
      }),
    ).toThrowError(BadRequestException);
  });

  it('사용자의 password가 20자를 초과한다면, 오류를 반환해야 한다.', () => {
    expect(
      signupUsercase.execute({
        email: invalidPasswordUser.email,
        nickname: invalidPasswordUser.nickname,
        password: 'passwordislongerthan20characters',
      }),
    ).toThrowError(BadRequestException);
  });

  it('사용자의 password가 영문/숫자/특수문자가 아닌 문자가 포함된다면, 오류를 반환해야 한다.', () => {
    expect(
      signupUsercase.execute({
        email: invalidPasswordUser.email,
        nickname: invalidPasswordUser.nickname,
        password: '패스워드를 한글로 입력',
      }),
    ).toThrowError(BadRequestException);
  });
});
