import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly passwordHash: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email já cadastrado!');
      }

      const passwordHash = await this.passwordHash.hash(createUserDto.password);
      console.log(passwordHash);
      const userCreateDto = {
        ...createUserDto,
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const userNew = this.usersRepository.create(userCreateDto);

      await this.usersRepository.save(userNew);

      return { ...userCreateDto }; // Inclui passwordHash no retorno
    } catch (err: any) {
      throw err;
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    tokenPayloadParam: TokenPayloadDto,
  ) {
    const updatedUserDto: any = {
      updatedAt: new Date(),
      name: updateUserDto.name,
    };

    if (updateUserDto.password) {
      const passwordHash = await this.passwordHash.hash(updateUserDto.password);
      updatedUserDto.password = passwordHash;
    }

    const userUpdated = await this.usersRepository.preload({
      id,
      ...updatedUserDto,
    });

    if (!userUpdated) {
      throw new Error('Usuário não encontrado');
    }

    if (tokenPayloadParam.sub != userUpdated.id) {
      throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
    }

    return await this.usersRepository.save(userUpdated);
  }

  async remove(id: number, tokenPayloadParam: TokenPayloadDto) {
    const userIndexSearch = await this.usersRepository.findOneBy({
      id,
    });

    if (!userIndexSearch) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    if (tokenPayloadParam.sub != userIndexSearch.id) {
      throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
    }

    this.usersRepository.remove(userIndexSearch);
  }
}
