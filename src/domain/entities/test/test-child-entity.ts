import { TestChildDTO } from 'src/domain/dtos/test/test-child-dto';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../helpers/base-entity';
import { TestEntity } from './test-entity';

@Entity()
export class TestChildEntity extends BaseEntity implements TestChildDTO {
  @Column()
  value: string;

  @ManyToOne(() => TestEntity, test => test.testChild)
  test: TestEntity;
}
