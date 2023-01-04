export class Client {}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm'

import {Users} from 'src/users/entities/user.entity'
@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  lastname: string

  @Column()
  cellphone: number

  @Column()
  note: string

  @Column()
  isNew: boolean

  @ManyToOne(type => Users, users => users.clients)
  user: Users
}
