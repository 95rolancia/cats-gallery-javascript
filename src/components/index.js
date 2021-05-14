import App from "./app.js";
import Api from "../api/api.js";

const api = new Api();
new App({ $app: document.querySelector("#app"), api: api });
