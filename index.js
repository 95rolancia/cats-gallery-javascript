import App from "./src/components/app.js";
import Api from "./src/service/api.js";

const api = new Api();
new App({ $app: document.querySelector("#app"), api: api });
