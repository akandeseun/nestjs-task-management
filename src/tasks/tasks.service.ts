import { Injectable } from "@nestjs/common"
import { Task, TaskStatus } from "./tasks.model"
import { v4 as uuidv4 } from "uuid"
import { CreateTaskDto } from "./dto/create-task.dto"

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.tasks.find((task) => task.id === id)
    task.status = status
    return task
  }

  deleteTask(id: string): Task[] {
    const task = this.tasks.find((task) => task.id === id)
    const taskIndex = this.tasks.indexOf(task)
    return this.tasks.splice(taskIndex)
  }

  deleteTaskAlternative(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id)
  }
}
