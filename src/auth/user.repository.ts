import { DataSource, Repository } from "typeorm"
import { User } from "./user.entity"
import { Injectable } from "@nestjs/common"
import * as bcrypt from "@phc/bcrypt"

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password)
  }

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    return await bcrypt.verify(hash, password)
  }
}
