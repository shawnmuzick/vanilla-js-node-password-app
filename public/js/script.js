import { API } from "./api.js";
import { UTIL } from "./util.js";

const site_title = document.getElementById("site-title");
const search_box = document.getElementById("search-box");
const table_body = document.getElementById("table-body");
const button_log_in = document.getElementById("log-in");
const button_log_out = document.getElementById("log-out");
const button_new_entry = document.getElementById("button-new-entry");

const modal_login = document.getElementById("modal-login");
const modal_login_btn_close = document.getElementById("modal-btn-close");
const modal_login_btn_submit = document.getElementById("modal-login-btn-submit");
const modal_login_input_username = document.getElementById("modal-input-username");
const modal_login_input_password = document.getElementById("modal-input-password");

const modal_entry = document.getElementById("modal-new-entry");
const modal_entry_btn_submit = document.getElementById("modal-new-entry-btn-submit");
const modal_entry_btn_close = document.getElementById("modal-new-entry-btn-close");
const modal_entry_label = document.getElementById("modal-new-entry-label");
const modal_entry_password = document.getElementById("modal-new-entry-password");

let user = {};

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
    table_body.innerHTML = "";
    data.forEach((element) => {
        let { row, button_delete } = UTIL.DOM.row_create();
        table_body.appendChild(row);
        let { item_key, item_value } = UTIL.DOM.row_children_create();
        for (const [key, value] of Object.entries(element)) {
            item_key.innerHTML = key;
            item_value.innerHTML = value;
        }
        button_delete.setAttribute("id", item_key.innerHTML);
        button_delete.addEventListener("click", (e) => {
            e.preventDefault();
            delete_entry(e);
        });
        row.appendChild(item_key);
        row.appendChild(item_value);
    });
};

(function init() {
    fetch("/api/init")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.username) user = data;
            else user = null;
            if (user) {
                console.log("found user logged in");
                console.log(user);
                site_title.innerHTML = `${user.username}'s password storage`;
                button_log_in.style.display = "none";
                button_log_out.style.display = "";
                generate_list(user.data);
            } else {
                button_log_out.style.display = "none";
            }
        })
        .catch((err) => console.log(err));
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
    modal_login.showModal();
});
modal_login_btn_close.addEventListener("click", () => {
    modal_login.close();
});
modal_login_btn_submit.addEventListener("click", (e) => {
    e.preventDefault();
    (async () => {
        user = await API.user.login({
            username: modal_login_input_username.value,
            password: modal_login_input_password.value,
        });
        console.log(user);
        generate_list(user.data);
        button_log_in.style.display = "none";
        button_log_out.style.display = "";
        site_title.innerHTML = `${user.username}'s password storage`;
    })();
    modal_login.close();
});
modal_entry_btn_submit.addEventListener("click", (e) => {
    e.preventDefault();
    let label = modal_entry_label.value;
    let password = modal_entry_password.value;
    let submission = { label, password };
    API.record.create(submission);
    const push = {};
    push[label] = password;
    user.data.push(push);
    generate_list(user.data);
    modal_entry.close();
});
button_new_entry.addEventListener("click", () => {
    modal_entry.showModal();
});
modal_entry_btn_close.addEventListener("click", () => {
    modal_entry.close();
});
const delete_entry = (e) => {
    console.log(e.target.id);
    API.record.delete(e.target.id);
};
