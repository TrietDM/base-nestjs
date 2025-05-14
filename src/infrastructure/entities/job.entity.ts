import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { SystemEntity } from './system.entity';
@Entity('job')
export class JobEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 50})
  code: string;
  @Column({ type: 'varchar', length: 50})
  name: string;
  @Column({ type: 'int', default: 0})
  using_num: number;
  @Column({ type: 'int', default: 0})
  module_num: number;

  @Column({ type: 'varchar', length: 50})
  industry: string;
  @Column({ type: 'varchar', length: 50})
  company: string;
  @Column({ type: 'varchar', length: 50})
  unit: string;
  @Column({ type: 'varchar', length: 50})
  department: string;

  @Column({ type: 'varchar', length: 50})
  own: string;

  @ManyToOne(() => SystemEntity, system => system.jobs,{ eager: true})
  @JoinColumn({ name: 'system_id'})
  system: SystemEntity;
  


  @Column({ type: 'bool', default: true})
  is_active: boolean;

  @Column({ type: 'varchar', length: 250})
  description: string;

  @OneToMany(() => UserEntity, (user) => user.job)
  users: UserEntity[];
}
