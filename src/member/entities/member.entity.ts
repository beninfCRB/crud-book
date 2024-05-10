import { Borrow } from "src/borrow/entities/borrow.entity";
import { MemberPenalty } from "src/member-penalty/entities/member-penalty.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('members')
export class Member {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    code: string

    @Column()
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => MemberPenalty, (member_penalty) => member_penalty.member)
    member_penalty: MemberPenalty

    @OneToMany(() => Borrow, (borrow) => borrow.member)
    borrow: Borrow
}
