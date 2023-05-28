import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto"

@Injectable()
export class TasksService {
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
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id)
  //   if (!found) {
  //     throw new NotFoundException(`No Task found with id: ${id}`)
  //   }
  //   return found
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   }
  //   this.tasks.push(task)
  //   return task
  // }
  // updateTask(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id)
  //   task.status = status
  //   return task
  // }
  // deleteTask(id: string): Task[] {
  //   const task = this.getTaskById(id)
  //   const taskIndex = this.tasks.indexOf(task)
  //   return this.tasks.splice(taskIndex)
  // }
  // deleteTaskAlternative(id: string): void {
  //   const found = this.getTaskById(id)
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id)
  // }
}
