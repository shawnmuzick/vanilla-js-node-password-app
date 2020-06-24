const DOM = {
    row_create: () => {
        let row = document.createElement("div");
        row.className = "row";
        return row;
    },
    row_children_create: () => {
        let item_key = document.createElement("div");
        item_key.className = "item-key";
        let item_value = document.createElement("div");
        item_value.className = "item-value";
        return { item_key, item_value };
    },
};

export const UTIL = {
    DOM,
};
