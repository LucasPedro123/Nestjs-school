import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ type: 'varchar', length: 50 })
  by: string;

  @Column()
  date: Date;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @Column({ type: 'varchar', length: 50 })
  to: string;

  @Column({ type: 'boolean' })
  read: boolean;
}
