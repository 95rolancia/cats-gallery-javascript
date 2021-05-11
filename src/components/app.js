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
        ...this.state,
      },
      async onClick(node) {
        console.log(this.state);
        if (node.type === "DIRECTORY") {
          const nextNodes = await Api.request(node.id);
          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            isRoot: false,
            nodes: nextNodes,
          });
        } else if (node.type === "FILE") {
          console.log("file");
        }
      },
      async onBackClick() {
        console.log(this.state);
        const nextState = { ...this.state };
        nextState.depth.pop();

        const prevNodeId =
          nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

        if (prevNodeId === null) {
          const rootNodes = await Api.request();
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
          });
        } else {
          const prevNodes = await Api.request(prevNodeId);
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: prevNodes,
          });
        }
        console.log(this.state);
      },
      Loading,
    });
    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.breadCrumb.setState(this.state.depth);
    this.nodes.setState({
      depth: this.state.depth,
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  }

  async init() {
    const rootNodes = await Api.request();
    this.setState({
      ...this.state,
      isRoot: true,
      nodes: rootNodes,
    });
    console.log("first init\n", this.state);
  }
}
