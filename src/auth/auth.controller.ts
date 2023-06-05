import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import { AuthService } from "./auth.service"
import { AuthGuard } from "@nestjs/passport"
import { GetUser } from "./get-user.decorator"
import { User } from "./user.entity"
import { AuthSignIn } from "./dto/auth-signin.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post("signin")
  signIn(@Body(ValidationPipe) authSignIn: AuthSignIn): Promise<object> {
    return this.authService.signIn(authSignIn)
  }

  // @Post("test")
  // @UseGuards(AuthGuard())
  // test(@Req() req) {
  //   console.log(req.user)
  // }

  @Post("test")
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user)
  }
}
