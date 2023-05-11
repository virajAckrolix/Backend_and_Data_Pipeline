import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: AuthDto) {
    const checkUser = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!checkUser) {
      throw new ForbiddenException('Email not found');
    }

    if (await argon.verify(checkUser.hash, dto.password)) {
      delete checkUser.hash;
      return checkUser;
    } else {
      throw new ForbiddenException('Passwords do not match')
    }
  }


  async signUp(dto: AuthDto) {
    try {
      // hash password
      const hash = await argon.hash(dto.password);

      const { password, ...rest } = dto;

      // save password
      const user = await this.prisma.user.create({
        data: {
          ...rest,
          hash,
        },
      });

      delete user.hash;
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already in use.');
      }
      throw error
    }
  }
}
