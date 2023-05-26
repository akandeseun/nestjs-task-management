import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { TasksService } from "./tasks.service"
import { Task } from "./tasks.model"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks()
  }

  @Get(":id")
  getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto)
  }

  @Patch(":id")
  updateTask(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateTask(id, updateTaskDto)
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string): Task[] {
    return this.tasksService.deleteTask(id)
  }
}
