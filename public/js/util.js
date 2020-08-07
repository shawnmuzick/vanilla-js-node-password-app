const DOM = {
	row_create: () => {
		let row = document.createElement('div');
		let button_delete = document.createElement('button');
		let button_edit = document.createElement('button');
		row.className = 'row';
		button_delete.className = 'button-delete';
		button_delete.innerHTML = 'x';
		button_edit.className = 'button-edit';
		button_edit.innerHTML = '?';
		row.appendChild(button_delete);
		row.appendChild(button_edit);
		return { row, button_delete, button_edit };
	},
	row_children_create: () => {
		let item_key = document.createElement('div');
		item_key.className = 'item-key';
		let item_value = document.createElement('div');
		item_value.className = 'item-value';
		return { item_key, item_value };
	},
};

export const UTIL = {
	DOM,
};
