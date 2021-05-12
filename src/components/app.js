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
      initialState: { ...this.state },
      // () => onClick() 이런 식으로 해줘야 app에 있는 this를 사용할 수 있다!
      onClick: (node) => this.onClick(node),
      onBackClick: () => this.onBackClick(),
      Loading,
    });
    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.breadCrumb.setState(this.state.depth);
    this.nodes.setState({
      ...this.state,
    });
    console.log("app\n", this.state);
  }

  async onClick(node) {
    if (node.type === "DIRECTORY") {
      const nextNodes = await Api.request(node.id);
      this.setState({
        depth: [...this.state.depth, node],
        isRoot: false,
        nodes: nextNodes,
      });
    } else if (node.type === "FILE") {
      console.log("file");
    }
  }

  async onBackClick() {
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
