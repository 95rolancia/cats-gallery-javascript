import BreadCrumb from "./breadcrumb.js";
import Nodes from "./nodes.js";
import Loading from "../utils/loading.js";
import ImageView from "./imageview.js";

const cache = {};

export default class App {
  constructor({ $app, api }) {
    this.api = api;
    this.state = {
      isRoot: true,
      nodes: [],
      depth: [],
      selectedFilePath: null,
      isLoading: false,
    };
    this.breadCrumb = new BreadCrumb({
      $app,
      initialState: this.state.depth,
      onNavClick: (index) => this.onNavClick(index),
    });
    this.nodes = new Nodes({
      $app,
      initialState: { ...this.state },
      // () => onClick() 이런 식으로 해줘야 app에 있는 this를 사용할 수 있다!
      onClick: (node) => this.onClick(node),
      onBackClick: () => this.onBackClick(),
      Loading,
    });
    this.imageView = new ImageView({
      $app,
      initialState: this.state.selectedFilePath,
      onCloseClick: () => this.onCloseClick(),
    });
    this.loading = new Loading({ $app, initialState: this.state.isLoading });
    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.breadCrumb.setState(this.state.depth);
    this.nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    this.imageView.setState(this.state.selectedFilePath);
    this.loading.setState(this.state.isLoading);
  }

  async onClick(node) {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    try {
      if (node.type === "DIRECTORY") {
        const nextNodes = cache[node.id] ? cache[node.id] : await this.api.request(node.id);
        this.setState({
          ...this.state,
          depth: [...this.state.depth, node],
          isRoot: false,
          nodes: nextNodes,
        });
        cache[node.id] = nextNodes;
      } else if (node.type === "FILE") {
        this.setState({
          ...this.state,
          selectedFilePath: node.filePath,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }

  async onBackClick() {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    try {
      const nextState = { ...this.state };
      nextState.depth.pop();

      const prevNodeId =
        nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

      if (prevNodeId === null) {
        const rootNodes = cache.root ? cache.root : await this.api.request();
        this.setState({
          ...nextState,
          isRoot: true,
          nodes: rootNodes,
        });
      } else {
        const prevNodes = cache[prevNodeId]
          ? cache[prevNodeId]
          : await this.api.request(prevNodeId);
        this.setState({
          ...nextState,
          isRoot: false,
          nodes: prevNodes,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }

  onCloseClick() {
    this.setState({
      ...this.state,
      selectedFilePath: null,
    });
  }

  onNavClick(index) {
    if (index === null) {
      this.setState({
        ...this.state,
        depth: [],
        isRoot: true,
        nodes: cache.root,
      });
      return;
    }

    if (index === this.state.depth.length - 1) {
      return;
    }

    const nextState = { ...this.state };
    const nextDepth = this.state.depth.slice(0, index + 1);
    this.setState({
      ...nextState,
      depth: nextDepth,
      nodes: cache[nextDepth[nextDepth.length - 1].id],
    });
  }

  async init() {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    try {
      const rootNodes = await this.api.request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
      cache.root = rootNodes;
      console.log("first init\n", this.state);
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }
}
