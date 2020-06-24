import { API } from "./api.js";
import { UTIL } from "./util.js";

let DATA = [];

const site_title = document.getElementById("site-title");
const search_box = document.getElementById("search-box");
const table_body = document.getElementById("table-body");
const button_log_in = document.getElementById("log-in");
const button_log_out = document.getElementById("log-out");

const modal_window = document.getElementById("modal");
const modal_btn_close = document.getElementById("modal-btn-close");
const modal_btn_submit = document.getElementById("modal-btn-submit");
const modal_input_username = document.getElementById("modal-input-username");
const modal_input_password = document.getElementById("modal-input-password");

let username = "";

const filter_records = (query, data) => {
    if (query === "") return generate_list(data);
    table_body.innerHTML = "";
    DATA.forEach((element) => {
        for (const [key, value] of Object.entries(element)) {
            if (query === key) {
                let row = UTIL.DOM.row_create();
                let { item_key, item_value } = UTIL.DOM.row_children_create();
                item_key.innerHTML = key;
                item_value.innerHTML = value;
                row.appendChild(item_key);
                row.appendChild(item_value);
                table_body.appendChild(row);
            }
        }
    });
};

const generate_list = (data) => {
    data.forEach((element) => {
        let row = UTIL.DOM.row_create();
        table_body.appendChild(row);
        let { item_key, item_value } = UTIL.DOM.row_children_create();
        for (const [key, value] of Object.entries(element)) {
            item_key.innerHTML = key;
            item_value.innerHTML = value;
        }
        row.appendChild(item_key);
        row.appendChild(item_value);
    });
};

(function init() {
    button_log_out.style.display = "none";
})();

button_log_out.addEventListener("click", () => {
    API.user.logout();
    username = "";
    site_title.innerHTML = "Password Storage App";
    DATA = [];
    table_body.innerHTML = "";
    button_log_in.style.display = "";
    button_log_out.style.display = "none";
});

search_box.addEventListener("input", () => {
    filter_records(search_box.value, DATA);
});
button_log_in.addEventListener("click", () => {
    modal_window.showModal();
});
modal_btn_close.addEventListener("click", () => {
    modal_window.close();
});
modal_btn_submit.addEventListener("click", (e) => {
    e.preventDefault();
    (async () => {
        DATA = await API.user.login({
            username: modal_input_username.value,
            password: modal_input_password.value,
        });
        generate_list(DATA);
    })();
    modal_window.close();
    username = modal_input_username.value;
    button_log_in.style.display = "none";
    button_log_out.style.display = "";
    site_title.innerHTML = `${username}'s password storage`;
});
