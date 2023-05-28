import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { TasksService } from "./tasks.service"
import { Task, TaskStatus } from "./tasks.model"
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto"
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe"

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Get()
  // @UsePipes(ValidationPipe)
  // getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto)
  //   }
  //   return this.tasksService.getAllTasks()
  // }

  // @Get(":id")
  // getTaskById(@Param("id") id: string): Task {
  //   return this.tasksService.getTaskById(id)
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto) {
  //   return this.tasksService.createTask(createTaskDto)
  // }

  // @Patch(":id/status")
  // updateTask(
  //   @Param("id") id: string,
  //   @Body("status", TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTask(id, status)
  // }

  // @Delete(":id")
  // deleteTask(@Param("id") id: string): Task[] {
  //   return this.tasksService.deleteTask(id)
  // }
}
