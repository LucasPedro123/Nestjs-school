import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './Entities/message.entity';
import { createMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class NotificationApiService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UsersService,
  ) {}

  async findAll(pagination?: PaginationDto) {
    const { limit = 10, offseat = 0 } = pagination;

    const messageAll = await this.messageRepository.find({
      take: limit,
      skip: offseat,
      relations: ['byId', 'toId'],
      order: {
        id: 'DESC',
      },
      select: {
        byId: {
          id: true,
          name: true,
        },
        toId: {
          id: true,
          name: true,
        },
      },
    });
    return messageAll;
  }

  async findOne(id: number) {
    const searchMessageById = await this.messageRepository.findOne({
      where: {
        id,
      },
    });

    return searchMessageById
      ? searchMessageById
      : new HttpException('Item não encontrado!', HttpStatus.NOT_FOUND);
  }

  async updateMessage(
    id: number,
    body: UpdateMessageDto,
    tokenPayload: TokenPayloadDto,
  ) {
    const tokenIdUser = tokenPayload.sub;
    const messageFindById = await this.messageRepository.findOne({
      where: {
        id,
      },
      relations: ['byId', 'toId'],
      order: {
        id: 'DESC',
      },
      select: {
        byId: {
          id: true,
          name: true,
        },
        toId: {
          id: true,
          name: true,
        },
      },
    });

    if (messageFindById.byId.id == tokenIdUser) {
      messageFindById.text = body.text;
      messageFindById.read = body.read;
      this.messageRepository.save(messageFindById);
      return messageFindById;
    } else {
      return new HttpException(
        'Você não tem permissão para editar essa mensagem!',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async createMessage(
    body: createMessageDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {
    const { toId } = body;
    const byId = tokenPayloadDto.sub;

    const searchUserSenderById = await this.userService.findOne(byId);
    const searchUserReceiverById = await this.userService.findOne(toId);

    const newMessage = {
      date: new Date(),
      read: false,
      createdAt: new Date(),
      byId: searchUserSenderById,
      toId: searchUserReceiverById,
      text: body.text,
    };

    const messageNew = this.messageRepository.create(newMessage);

    this.messageRepository.save(messageNew);

    return {
      ...messageNew,
      byId: {
        id: searchUserSenderById.id,
        name: searchUserReceiverById.name,
      },
      toId: {
        id: searchUserReceiverById.id,
        name: searchUserReceiverById.name,
      },
    };
  }

  async deleteMessage(id: number, tokenPayload: TokenPayloadDto) {
    const messageFindById = await this.messageRepository.findOne({
      where: {
        id,
      },
      relations: ['byId', 'toId'],
      order: {
        id: 'DESC',
      },
      select: {
        byId: {
          id: true,
          name: true,
        },
        toId: {
          id: true,
          name: true,
        },
      },
    });

    if (!messageFindById) {
      throw new HttpException('Item não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (messageFindById.byId.id == tokenPayload.sub) {
      this.messageRepository.remove(messageFindById);
      return {
        message: `A messagem de ${messageFindById.byId.name} foi deletada com sucesso`,
        status: 200,
      };
    } else {
      throw new HttpException(
        'Você não tem permissão para deletar essa mensagem!',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
