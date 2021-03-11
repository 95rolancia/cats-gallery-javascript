import api from "../api/api.js";
import BreadCrumb from "./breadcrumb.js";
import Nodes from "./nodes.js";
import Loading from "../utils/loading.js";

const loading = new Loading();
const breadCrumb = new BreadCrumb();
const nodes = new Nodes(loading);
