import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import {Clients} from 'src/clients/entities/client.entity'
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  lastname: string

  @Column({unique: true})
  email: string

  @Column()
  password: string

  @Column({ default: false })
  is_admin: boolean

  @OneToMany(type => Clients, clients => clients.user)
  clients: Clients[]
}
