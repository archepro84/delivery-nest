import {
  invalidEmailUser,
  invalidPasswordUser,
  nonExistingUser,
  validUser,
} from '../../../fixtures/customer/signup.fixture';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('로그인(SignIn)', () => {
  it('사용자가 올바른 정보를 입력한다면 로그인이 되어야 한다.', () => {
    const res = signinUseCase.execute(validUser);

    expect(res).toEqual({
      user: {
        email: validUser.email,
        nickname: validUser.nickname,
      },
      token: expect.any(String),
    });
  });

  it('사용자의 email이 비정상적으로 입력된 경우, 오류를 반환해야 한다.', () => {
    expect(signinUsercase.execute(invalidEmailUser)).toThrowError(
      BadRequestException,
    );
  });

  it('사용자의 password가 8자 미만으로 입력한다면, 오류를 반환해야 한다.', () => {
    expect(
      signinUsercase.execute({
        email: invalidPasswordUser.email,
        nickname: invalidPasswordUser.nickname,
        password: 'pwd',
      }),
    ).toThrowError(BadRequestException);
  });

  it('사용자의 password가 20자를 초과한다면, 오류를 반환해야 한다.', () => {
    expect(
      signinUsercase.execute({
        email: invalidPasswordUser.email,
        nickname: invalidPasswordUser.nickname,
        password: 'passwordislongerthan20characters',
      }),
    ).toThrowError(BadRequestException);
  });

  it('사용자의 password가 영문/숫자/특수문자가 아닌 문자가 포함된다면, 오류를 반환해야 한다.', () => {
    expect(
      signinUsercase.execute({
        email: invalidPasswordUser.email,
        nickname: invalidPasswordUser.nickname,
        password: '패스워드를 한글로 입력',
      }),
    ).toThrowError(BadRequestException);
  });

  it('사용자가 존재하지 않는 email로 로그인을 시도한다면, 오류를 반환해야 한다.', () => {
    expect(
      signinUsercase.execute(nonExistingUser).toThrowError(NotFoundException),
    );
  });
});
