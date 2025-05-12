import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { FunctionEntity } from './function.entity';
@Entity('permission')
export class PermissionEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 50})
    name: string;

    @ManyToMany(() => FunctionEntity, (func) => func.permissions)
    function: FunctionEntity[];
}