
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import { Users } from 'src/users/entities/user.entity'
import { Appointments } from 'src/appointments/entities/appointment.entity';
@Entity()
export class Services { 
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({nullable: true, type:'decimal', default: 0, precision: 10, scale: 2})
  price: number

  @Column({nullable: true})
  note: string

  @Column({default: 60})
  duration: number

  @Column({ nullable: true })
  type: string


  @ManyToOne(type => Users, users => users.services)
  user: Users

  @OneToMany(type => Appointments, appointments => appointments.service)
  appointments: Appointments[]
 }
