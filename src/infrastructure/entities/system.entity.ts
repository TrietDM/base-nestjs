import { Column, Entity, PrimaryGeneratedColumn, ManyToMany,JoinTable } from 'typeorm';
import { FunctionEntity } from './function.entity';
@Entity('system')
export class SystemEntity  {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 50})
  name: string;

  @ManyToMany(() => FunctionEntity, (func) => func.system , {eager: true}  )
  @JoinTable({
      name: 'system_function',
      joinColumn: { name: 'system_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'function_id', referencedColumnName: 'id' }
    })
  funcs: FunctionEntity[];
}