export interface User {
	id: string;
	email: string;
	password: string;
	phone_number: string;
	user_type: string;
	title: string;
	document_type: string;
	document_number: string;
	name: string;
	last_name: string;
	phone_type: string;
	secondary_phone_type: string;
	secondary_phone_number: string;
	language: string;
	position: string;
	state: string;
}

export enum UserStatus {
	OPEN = 'OPEN',
	INPROGRESS = 'IN PROGRESS',
	DONE = 'DONE',
}

