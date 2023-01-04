import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeUpdate, UpdateDateColumn} from 'typeorm'
import {Clients} from 'src/clients/entities/client.entity'
import { Services } from 'src/services/entities/service.entity'
import { Appointments } from 'src/appointments/entities/appointment.entity'
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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date

  @OneToMany(type => Clients, clients => clients.user)
  clients: Clients[]

  @OneToMany(type => Services, services => services.user)
  services: Services[]

  @OneToMany(type => Appointments, appointments => appointments.user)
  appointments: Appointments[]

}
