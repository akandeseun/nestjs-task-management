import { Injectable } from "@nestjs/common"
import { Task, TaskStatus } from "./tasks.model"
import { v4 as uuidv4 } from "uuid"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"

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

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.tasks.find((task) => task.id === id)
    const { title, description } = updateTaskDto
    task.title = title
    task.description = description
    return task
  }

  deleteTask(id: string): Task[] {
    const task = this.tasks.find((task) => task.id === id)
    const taskIndex = this.tasks.indexOf(task)
    return this.tasks.splice(taskIndex)
  }
}
