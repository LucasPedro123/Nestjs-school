import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './Entities/message.entity';
import { createMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  async updateMessage(id: number, body: UpdateMessageDto) {
    const messageFindById = await this.messageRepository.findOne({
      where: {
        id,
      },
    });

    messageFindById.text = body.text;
    messageFindById.read = body.read;
    this.messageRepository.save(messageFindById);
    return messageFindById;
  }

  async createMessage(body: createMessageDto) {
    const { byId, toId } = body;

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
      },
      toId: {
        id: searchUserReceiverById.id,
      },
    };
  }

  async deleteMessage(id: number) {
    const findIndexMessage = await this.messageRepository.findOneBy({
      id,
    });

    if (!findIndexMessage) {
      throw new HttpException('Item não encontrado!', HttpStatus.NOT_FOUND);
    }
    this.messageRepository.remove(findIndexMessage);
  }
}
