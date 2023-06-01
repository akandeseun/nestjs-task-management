import { DataSource, Repository } from "typeorm"
import { User } from "./user.entity"
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import * as bcrypt from "@phc/bcrypt"

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto

    // const exists = this.findOneBy({ username })
    // if (exists) {
    //   throw new BadRequestException()
    // }

    const user = new User()
    user.username = username
    user.password = await this.hashPassword(password)
    console.log(user.password)

    try {
      await user.save()
      return "Profile created"
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists")
      }
      throw new InternalServerErrorException("Something went wrong")
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto
    const user = await User.findOneBy({ username })
    if (!user) {
      throw new BadRequestException("User not found")
    }
    try {
      if (!(await this.verifyPassword(user.password, password))) {
        throw new BadRequestException("incorrect password")
      }
      return user.username
    } catch (error) {
      console.log(error)
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password)
  }

  private async verifyPassword(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.verify(hash, password)
  }
}
