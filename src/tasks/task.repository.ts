import { Task } from "./task.entity"
import { Repository, DataSource } from "typeorm"
import { Injectable } from "@nestjs/common"

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager())
  }
}
