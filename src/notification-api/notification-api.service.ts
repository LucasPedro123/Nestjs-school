import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './Entities/message.entity';

@Injectable()
export class NotificationApiService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'Hello, World!',
      by: 'Lucas',
      to: 'Alisson',
      date: new Date(),
      read: false,
      user: '',
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    const searchMessageById = this.messages.find(e => e.id == id);

    return searchMessageById
      ? searchMessageById
      : new HttpException('Item não encontrado!', HttpStatus.NOT_FOUND);
  }

  updateMessage(id: number, body: any) {
    const newItemIndex = this.messages.findIndex(e => e.id == id);

    if (newItemIndex < 0) {
      return new HttpException('Item não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (newItemIndex >= 0) {
      this.messages[newItemIndex] = {
        id: this.messages[newItemIndex].id,
        ...body,
      };
      console.log('Atualizou com sucesso!');
    } else {
      console.log('Mensagem não encontrada!');
    }

    return this.messages;
  }

  createMessage(body: any) {
    const newMessage: Message = {
      id: this.messages.length + 1,
      ...body,
    };

    this.messages.push(newMessage);
  }

  deleteMessage(id: number) {
    const newItemIndex = this.messages.findIndex(e => e.id == id);

    if (newItemIndex < 0) {
      return new HttpException('Item não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (newItemIndex >= 0) {
      this.messages.splice(newItemIndex, 1);
      console.log('Removeu com sucesso!');
    } else {
      console.log('Mensagem não encontrada!');
    }

    return this.messages;
  }
}
