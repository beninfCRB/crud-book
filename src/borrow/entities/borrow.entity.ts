import { Book } from "src/book/entities/book.entity";
import { Member } from "src/member/entities/member.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('borrows')
export class Borrow {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    memberId: string

    @Column()
    bookId: string

    @Column({ type: 'integer' })
    amount: number

    @Column()
    borrowDate: Date

    @Column({ nullable: true })
    returnDate: Date

    @Column({ nullable: true })
    description: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Member, (member) => member.borrow)
    @JoinColumn({ name: 'memberId' })
    member: Member

    @ManyToOne(() => Book, (book) => book.borrow)
    @JoinColumn({ name: 'bookId' })
    book: Member
}
