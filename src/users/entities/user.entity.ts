import { IsEmail } from 'class-validator';
import { Message } from 'src/notification-api/Entities/message.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 250, unique: true })
  @IsEmail()
  email: string;
  @Column({ length: 50 })
  passwordHash: string;
  @Column()
  createdAt?: Date;
  @Column()
  updatedAt?: Date;

  @OneToMany(() => Message, message => message.byId)
  messagesSent: Message[];
  @OneToMany(() => Message, message => message.toId)
  messagesReceived: Message[];
}
