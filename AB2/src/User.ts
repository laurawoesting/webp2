export class User {
	static idCounter: number = 1;
	id: number;
	firstName: string;
	lastName: string;

	constructor(firstName: string, lastName: string, id?: number) { // Parameter id is optional
		this.firstName = firstName;
		this.lastName = lastName;

		if (typeof id === 'undefined') {
			this.id = User.getNextId();
		} else {
			this.id = id;
		}
	}

	private static getNextId(): number {
		return User.idCounter++;
	}
}
