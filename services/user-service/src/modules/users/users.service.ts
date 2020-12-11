import { User, UserStatus } from './user.model';
import { UserConfig } from './users.config';
import { v4 as uuidv4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../models/DTO/user/create-user-dto';
import {config, CognitoIdentityServiceProvider} from 'aws-sdk';
import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserPool,
	CognitoUserAttribute,
} from 'amazon-cognito-identity-js';


@Injectable()
export class UsersService {
	private users: User[] = [];

	private userPool: CognitoUserPool;

	constructor(
		@Inject('UserConfig')
		private readonly usersConfig: UserConfig,
	) {
			this.userPool = new CognitoUserPool({
					UserPoolId: this.usersConfig.userPoolId,
					ClientId: this.usersConfig.clientId,
			});
	}

	getAllUsers() {
		return this.users;
	}

	getUserById (id: string): User {
		return this.users.find(user => user.id === id);
	}

	createUser(createUserDto: CreateUserDto) {
		const { email, password, phone_number, user_type, title, document_type,
			document_number, phone_type, last_name, secondary_phone_type, secondary_phone_number,
			language, position, state, name } = createUserDto;

		const id = uuidv4();
		const user: User = {
			id,
			email,
			password,
			phone_number,
			user_type,
			title,
			document_type,
			document_number,
			phone_type,
			last_name,
			secondary_phone_type,
			secondary_phone_number,
			language,
			position,
			state,
			name
			// state: UserStatus.OPEN,
		};

		this.users.push(user);
		console.log(password)
		return new Promise((resolve, reject) => {
			return this.userPool.signUp(
				id,
				password,
				[
						new CognitoUserAttribute({ Name: 'email', Value: email }),
						//new CognitoUserAttribute({ Name: 'user_id', Value: id }),
						new CognitoUserAttribute({ Name: 'phone_number', Value: phone_number }),
						//new CognitoUserAttribute({ Name: 'user_type', Value: user_type }),
						//new CognitoUserAttribute({ Name: 'title', Value: title }),
						//new CognitoUserAttribute({ Name: 'document_type', Value: document_type }),
						//new CognitoUserAttribute({ Name: 'document_number', Value: document_number }),
						new CognitoUserAttribute({ Name: 'name', Value: name }),
						//new CognitoUserAttribute({ Name: 'last_name', Value: last_name }),
						//new CognitoUserAttribute({ Name: 'phone_type', Value: phone_type }),
						//new CognitoUserAttribute({ Name: 'secondary_phone_type', Value: secondary_phone_type }),
						//new CognitoUserAttribute({ Name: 'secondary_phone_number', Value: secondary_phone_number }),
						//new CognitoUserAttribute({ Name: 'language', Value: language }),
						//new CognitoUserAttribute({ Name: 'position', Value: position }),
						//new CognitoUserAttribute({ Name: 'state', Value: state }),
				],
				null,
				(err: any, result: { user: unknown; }) => {
					if (!result) {
						reject(err);
					} else {
						resolve(result.user);
					}
				},
			);
		});
	}

	deleteUser(id: string) {
		this.users.filter(user => user.id !== id);
	}

	getUsers(){
		var params = {
			UserPoolId: this.usersConfig.userPoolId
		};
		config.update({ region: this.usersConfig.region, 'accessKeyId': this.usersConfig.clientId});
		var cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();
		return new Promise((resolve, reject) =>{
		  cognitoidentityserviceprovider.listUsers(params, (err, data) => {
			if (err) {
				console.log(err);
				reject(err);
			}
			else {
			  //var lu : Array<ListUserDto> = data.Users;
				resolve(data.Users);
			}
		  })
		});
	  }

	/*
	updateUserStatus(id: string, status: UserStatus) {
		const user = this.getUserById(id);
		user.status = status;
		return user;
	}
	*/
}
