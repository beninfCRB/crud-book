import { Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Borrow } from './entities/borrow.entity';
import ResponseData from 'src/utils/response.utils';
import { UseResponse } from 'src/statics/response.statics';
import { UseException } from 'src/utils';
import { BorrowError } from './borrow.static';
import { MemberPenalty } from 'src/member-penalty/entities/member-penalty.entity';
import * as moment from 'moment';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class BorrowService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Borrow) private repo: Repository<Borrow>
  ) { }

  async create(dto: CreateBorrowDto) {
    try {
      return await this.dataSource.transaction(async manager => {
        const rule1 = await manager.find(Borrow, {
          where: {
            memberId: dto.memberId
          }
        })

        if (rule1.length > 2) throw new UseException(BorrowError.Rule1)

        const rule3 = await manager.findOne(MemberPenalty, {
          where: {
            memberId: dto.memberId
          },
          order: {
            endDate: 'DESC'
          }
        })

        if (rule3) {
          const now = moment();
          const endDate = moment(rule3.endDate);
          const diff = now.diff(endDate, 'days');

          if (diff <= 3) {
            throw new UseException(BorrowError.Rule3)
          } else {
            await manager.softDelete(MemberPenalty, { id: dto.memberId })
          }
        }

        const { stock, id: bookId } = await manager.findOne(Book, {
          where: {
            id: dto.bookId
          }
        })

        if (dto.amount > stock) throw new UseException(BorrowError.Stock)

        await manager.update(Book, { id: bookId }, {
          stock: Number(stock - dto.amount)
        })

        await manager.save(history)

        const obj = await manager.create(Borrow, {
          ...dto
        })

        const data = await manager.save(obj)

        return ResponseData(data, UseResponse.Success.Insert)
      })
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find()

      return ResponseData(data, UseResponse.Success.Get)
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.repo.findOne({
        where: {
          id
        }
      })

      return ResponseData(data, UseResponse.Success.Get)
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }

  async update(id: string, dto: UpdateBorrowDto) {
    try {
      return await this.dataSource.transaction(async manager => {
        var message: string | undefined = UseResponse.Success.Update
        const rule2and5 = await manager.findOne(Borrow, {
          where: {
            bookId: dto.bookId
          }
        })

        if (rule2and5.memberId !== dto.memberId)
          throw new UseException(`Buku ${rule2and5.book.name} yang dikembalikan adalah buku yang bukan dipinjamkan oleh anggota ${dto.memberId}`)

        const now = moment();
        const borrowDate = moment(rule2and5.borrowDate);
        const diff = now.diff(borrowDate, 'days');

        if (diff > 7) {
          message += ` dan ${BorrowError.Rule5}`
          const penalty = await manager.create(MemberPenalty, {
            memberId: dto.memberId,
            startDate: new Date()
          })

          await manager.save(penalty)
        }

        const { stock, id: bookId } = await manager.findOne(Book, {
          where: {
            id: dto.bookId
          }
        })

        await manager.update(Book, { id: bookId }, {
          stock: Number(stock + dto.amount)
        })

        const data = await manager.findOne(Borrow, {
          where: {
            id
          }
        })

        await manager.update(Borrow, id, {
          returnDate: dto.returnDate
        })

        await manager.softDelete(Borrow, id)

        return ResponseData(data, message)
      })
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }

  async remove(id: string) {
    try {
      await this.repo.softDelete(id)

      return ResponseData(null, UseResponse.Success.Delete)
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }
}
