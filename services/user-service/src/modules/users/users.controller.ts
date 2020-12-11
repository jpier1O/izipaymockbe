import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserStatus } from './user.model';
import { CreateUserDto } from '../../models/DTO/user/create-user-dto';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService){}

	@Get('/:id')
	getUserById(@Param('id') id: string ): User {
		return this.usersService.getUserById(id);
	}

	@Post()
	async createUser(
		@Body() createUserDto: CreateUserDto)
	{
		return await this.usersService.createUser(createUserDto);
	}

	@Delete('/:id')
	deleteUser(@Param('id') id: string): void {
		this.usersService.deleteUser(id);
	}

	@Get()
    async listUser() {
        var listUsers = await this.usersService.getUsers();
        listUsers = listUsers;
        return listUsers;
    }

	/*
	@Patch('/:id/status')
	updateUserStatus(
		@Param('id') id: string,
		@Body('status') status: UserStatus,
	): User {
		return this.usersService.updateUserStatus(id, status);
	}
	*/
}
