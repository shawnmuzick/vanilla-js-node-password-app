const user = {
	login: async (body) => {
		let arr = await fetch('/api/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((data) => {
				return data;
			})
			.catch((err) => console.log(err));
		return arr;
	},
	logout: () => {
		fetch('/api/logout')
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	},
	create: () => {},
	read: () => {},
	update: () => {},
	delete: () => {},
};

const record = {
	create: (record) => {
		fetch('/api/record/create', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(record),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	},
	read: () => {},
	update: () => {},
	delete: (record_label) => {
		fetch(`/api/record/delete/${record_label}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	},
};

export const API = {
	user,
	record,
};
