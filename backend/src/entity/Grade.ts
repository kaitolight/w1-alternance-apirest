import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Skill from "./Skill";
import Wilder from "./Wilder";

@Entity()
class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 1})
    vote: number;

    @Column()
    skillId: number;

    @Column()
    wilderId: number;

    @ManyToOne(() => Wilder, (w) => w.grades)
    wilder: Wilder;

    @ManyToOne(() => Skill, (s) => s.grades)
    skill: Skill;
}

export default Grade