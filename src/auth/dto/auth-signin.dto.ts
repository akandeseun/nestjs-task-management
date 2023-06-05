import { IsNotEmpty } from "class-validator"

export class AuthSignIn {
  @IsNotEmpty({ message: "$property cannot be empty" })
  username: string

  @IsNotEmpty({ message: "$property cannot be empty" })
  password: string
}
