import BreadCrumb from "./breadcrumb.js";
import Nodes from "./nodes.js";
import Loading from "../utils/loading.js";
import Api from "../api/api.js";

export default class App {
  constructor($app) {
    this.state = {
      isRoot: false,
      nodes: [],
      depth: [],
    };
    this.loading = new Loading();
    this.breadCrumb = new BreadCrumb({
      $app,
      initialState: this.state.depth,
    });
    this.nodes = new Nodes({
      $app,
      initialState: {
        isRoot: this.state.isRoot,
        nodes: this.state.nodes,
      },
      Loading,
    });
    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.breadCrumb.setState(this.state.depth);
    this.nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  }

  async init() {
    const rootNodes = await Api.fetchRoot();
    this.setState({
      ...this.state,
      isRoot: true,
      nodes: rootNodes,
    });
    console.log("first init\n", this.state);
  }
}
