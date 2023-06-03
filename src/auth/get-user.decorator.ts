import { createParamDecorator } from "@nestjs/common"

const GetUser = createParamDecorator((data, req) => [])
