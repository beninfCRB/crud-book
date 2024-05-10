import { Borrow } from "src/borrow/entities/borrow.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    code: string

    @Column()
    title: string

    @Column()
    author: string

    @Column({ type: 'integer' })
    stock: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => Borrow, (borrow) => borrow.book)
    borrow: Borrow
}
