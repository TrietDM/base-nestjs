import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { SystemEntity } from './system.entity';
@Entity('function')
export class FunctionEntity  {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 50})
  name: string;

  @ManyToMany(() => PermissionEntity, (per) => per.function, {eager: true}  )
  @JoinTable({
    name: 'function_permission',
    joinColumn: { name: 'function_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' }
  })
  permissions: PermissionEntity[];

  @ManyToMany(() => SystemEntity, (system) => system.funcs)
  system: SystemEntity;
}