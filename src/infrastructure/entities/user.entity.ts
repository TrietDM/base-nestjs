import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JobEntity } from './job.entity';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true})
  code: string

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar', length: 250 })
  password: string;

  @Column({ type: 'varchar', length: 250 })
  full_name: string;

  @Column({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true})
  phone_num: string;

  @Column({ type: 'bool', default: true})
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp'})
  create_at: Date;

  @ManyToOne(() => JobEntity, (job) => job.users, { eager: true }) // eager: load tự động
  @JoinColumn({ name: 'job_id' }) // tên cột FK trong bảng user
  job: JobEntity;
}
