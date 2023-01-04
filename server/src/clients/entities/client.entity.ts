export class Client { }
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'

import { Users } from 'src/users/entities/user.entity'
@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  lastname: string

  @Column({nullable: true})
  cellphone: string

  @Column({nullable: true})
  note: string

  @Column({default: true})
  isNew: boolean

  @ManyToOne(type => Users, users => users.clients)
  user: Users
}
