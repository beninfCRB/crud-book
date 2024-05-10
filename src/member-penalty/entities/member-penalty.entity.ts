import { Member } from "src/member/entities/member.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('member-penalties')
export class MemberPenalty {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    memberId: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Member, (member) => member.member_penalty)
    @JoinColumn({ name: 'memberId' })
    member: Member
}
