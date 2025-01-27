import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email já cadastrado!');
      }

      const userCreateDto = {
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createUserDto,
      };

      const userNew = this.usersRepository.create(userCreateDto);

      // Salvar no banco de dados
      await this.usersRepository.save(userNew);

      return userCreateDto;
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUserDto = {
      updatedAt: new Date(),
      name: updateUserDto.name,
      passwordHash: updateUserDto.passwordHash,
    };

    const userUpdated = await this.usersRepository.preload({
      id,
      ...updatedUserDto,
    });

    this.usersRepository.save(userUpdated);
  }

  async remove(id: number) {
    const userIndexSearch = await this.usersRepository.findOneBy({
      id,
    });

    this.usersRepository.remove(userIndexSearch);
  }
}
