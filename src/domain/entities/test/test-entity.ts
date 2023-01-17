import { TestDTO } from 'src/domain/dtos/test/test.dto';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../helpers/base-entity';
import { TestChildEntity } from './test-child-entity';

@Entity()
export class TestEntity extends BaseEntity implements TestDTO {
  @Column()
  task: string;

  @OneToMany(() => TestChildEntity, testChild => testChild.test)
  testChild: TestChildEntity[];
}
