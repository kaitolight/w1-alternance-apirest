import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Grade from "./Grade"

@Entity()
class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({length: 500, nullable: true, type: 'varchar'})
  bio: string | null;

  @Column({nullable: true, length: 100, type: 'varchar'})
  city: string | null;

  @OneToMany(() => Grade, (g) => g.wilder)
  grades: Grade[]
}

export default Wilder
