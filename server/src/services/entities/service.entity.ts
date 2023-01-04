
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'

import { Users } from 'src/users/entities/user.entity'
@Entity()
export class Services { 
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({nullable: true, type:'decimal', precision: 10, scale: 2, default: 0})
  price: number

  @Column({nullable: true})
  note: string

  @Column({default: 60})
  duration: number

  @Column({ nullable: true })
  type: string


  @ManyToOne(type => Users, users => users.services)
  user: Users
 }
