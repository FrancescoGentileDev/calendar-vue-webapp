import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Clients } from 'src/clients/entities/client.entity';
import { Services } from 'src/services/entities/service.entity';
import { Users } from 'src/users/entities/user.entity';

@Entity()
export class Appointments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ default: false})
  isCompleted: boolean;

  @Column({ default: false})
  isCancelled: boolean;

  @Column()
  note: string;

  @Column({ default: false})
  confirmNotification: boolean;

  @Column({ default: false})
  reminderNotification: boolean;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @UpdateDateColumn({type: 'datetime'})
  updatedAt: Date;

  @ManyToOne(type => Clients, clients => clients.appointments)
  client: Clients;

  @ManyToOne(type => Services, services => services.appointments)
  service: Services;

  @ManyToOne(type => Users, users => users.appointments)
  user: Users;

}
