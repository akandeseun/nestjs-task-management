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
  ParseIntPipe,
  HttpCode,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common"
import { TasksService } from "./tasks.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto"
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe"
import { Task } from "./task.entity"
import { TaskStatus } from "./task-status.enum"
import { AuthGuard } from "@nestjs/passport"
import { GetUser } from "src/auth/get-user.decorator"
import { User } from "src/auth/user.entity"
import { FileInterceptor } from "@nestjs/platform-express"

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user)
  }

  @Get(":id")
  getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user)
  }

  @Patch(":id")
  updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user)
  }

  @Delete(":id")
  @HttpCode(201)
  deleteTask(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user)
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  createWithImage(
    @Body() createTaskDto: CreateTaskDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return this.tasksService.createTaskWithImage(createTaskDto, user, file)
  }
}
