import { API } from "./api.js";

let DATA = [];

const search_box = document.getElementById("search-box");
const table_body = document.getElementById("table-body");
const button_log_in = document.getElementById("log-in");
const button_log_out = document.getElementById("log-out");

const modal_window = document.getElementById("modal");
const modal_btn_close = document.getElementById("modal-btn-close");
const modal_btn_submit = document.getElementById("modal-btn-submit");
const modal_input_username = document.getElementById("modal-input-username");
const modal_input_password = document.getElementById("modal-input-password");

const site_tite = document.getElementById("site-title");
const logged_in = false;
const user_log_in = () => {
    API.user_login();
    logged_in = true;
    button_log_in.style.display = "none";
    button_log_in.style.display = "";
};
const filter_records = (query) => {
    console.log(query);
};
(function init() {
    console.log("init");
    button_log_out.style.display = "none";
})();

search_box.addEventListener("input", () => {
    filter_records(search_box.value);
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
        DATA = await API.user_login({
            username: modal_input_username.value,
            password: modal_input_password.value,
        });
        console.log(DATA);
    })();
});
