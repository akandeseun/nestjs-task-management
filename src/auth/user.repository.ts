import { DataSource, Repository } from "typeorm"
import { User } from "./user.entity"
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import * as bcrypt from "bcrypt"

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const salt = await bcrypt.genSalt()
    console.log(salt)
    // const exists = this.findOneBy({ username })
    // if (exists) {
    //   throw new BadRequestException()
    // }

    const user = new User()
    user.username = username
    user.password = password

    try {
      await user.save()
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists")
      }
      throw new InternalServerErrorException("Something went wrong")
    }
  }
}
