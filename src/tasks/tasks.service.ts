import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto"
import { TaskRepository } from "./task.repository"
import { InjectRepository } from "@nestjs/typeorm"
import { Task } from "./task.entity"
import { TaskStatus } from "./task-status.enum"
import { User } from "src/auth/user.entity"

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto)
  }
  // getAllTasks(): Task[] {
  //   return this.tasks
  // }
  // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto
  //   let tasks = this.getAllTasks()
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status)
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     )
  //   }
  //   return tasks
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id: id })

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    return found
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user)
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)

    task.status = status
    await task.save()

    return task
  }
}
