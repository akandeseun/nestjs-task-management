import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { JwtService } from "@nestjs/jwt"
import { UserRepository } from "./user.repository"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import { JwtPayload } from "./jwt-payload.interface"
import { User } from "./user.entity"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto

    const user = new User()
    user.username = username
    user.password = await this.userRepository.hashPassword(password)

    try {
      await user.save()
      return "Profile Created"
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists")
      }
      throw new InternalServerErrorException("Something went wrong")
    }
    // return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const { username, password } = authCredentialsDto
    const user = await User.findOneBy({ username })

    if (!user) {
      throw new BadRequestException("Invalid username or password")
    }

    const verifiedUser = await this.userRepository.verifyPassword(
      user.password,
      password,
    )

    if (!verifiedUser) {
      throw new BadRequestException("Invalid username or password")
    }

    const payload: JwtPayload = { username }
    const accessToken = await this.jwtService.sign(payload)
    return { accessToken, message: `Welcome ${username}` }
  }
}
