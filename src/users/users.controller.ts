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
import { Public } from "src/auth/decorators/public.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt-access.guard";
import { UpdateUserDto } from "./dto/update-user.dto";

@UseGuards(JwtAccessGuard)
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get("me")
    getMe(@Req() req) {
        return this.usersService.findById(req.user.id);
    }

    @Patch("me")
    updateMe(@Req() req, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(req.user.id, dto);
    }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.findById(id);
    }
}
