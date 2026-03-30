import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Public } from "src/auth/decorators/public.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt-access.guard";

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // CREATE USER
    @Public()
    @Post()
    @ApiOperation({ summary: "Create new user" })
    @ApiResponse({ status: 201, description: "User created successfully" })
    @ApiResponse({ status: 400, description: "User already exists" })
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    // ME
    @UseGuards(JwtAccessGuard)
    @ApiBearerAuth() // 👈 показывает, что эндпоинт защищён
    @Get("me")
    @ApiOperation({ summary: "Get current user" })
    @ApiResponse({ status: 200, description: "Returns current user" })
    getMe(@Req() req) {
        return this.usersService.findById(req.user.id);
    }

    // UPDATE ME
    @UseGuards(JwtAccessGuard)
    @ApiBearerAuth()
    @Patch("me")
    @ApiOperation({ summary: "Update current user (email/password)" })
    @ApiResponse({ status: 200, description: "User updated successfully" })
    updateMe(@Req() req, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(req.user.id, dto);
    }

    // GET BY ID
    @Get(":id")
    @ApiOperation({ summary: "Get user by id" })
    @ApiResponse({ status: 200, description: "User found" })
    @ApiResponse({ status: 404, description: "User not found" })
    findById(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.findById(id);
    }
}
