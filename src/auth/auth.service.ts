import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserRepository } from "./user.repository"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const username = this.userRepository.signIn(authCredentialsDto)
    if (!username) {
      throw new UnauthorizedException("Invalid Credentials")
    }
    return username
  }
}
