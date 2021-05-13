import App from "./app.js";
import Api from "../api/api.js";

const api = new Api();
new App(document.querySelector("#app"), api);
