import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { JwtService } from "@nestjs/jwt"
import { UserRepository } from "./user.repository"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = this.userRepository.signIn(authCredentialsDto)

    if (!username) {
      throw new UnauthorizedException("Invalid Credentials")
    }

    const payload = { username }
    const accessToken = await this.jwtService.sign(payload)
    return { accessToken }
  }
}
