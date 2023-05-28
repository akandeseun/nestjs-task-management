import { PipeTransform } from "@nestjs/common"

export class TaskFilterValidationPipe implements PipeTransform {
  transform(value: any) {
    return value.toUpperCase()
  }
}
