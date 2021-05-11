export default class Nodes {
  constructor({ $app, initialState, onClick, onBackClick }) {
    this.state = initialState;

    this.onClick = onClick;
    this.onBackClick = onBackClick;

    this.$target = document.createElement("ul");
    this.$target.className = "Nodes";
    $app.appendChild(this.$target);

    this.$target.addEventListener("click", (e) => {
      const node = e.target.closest(".Node");
      if (node) {
        const { nodeId } = node.dataset;

        if (!nodeId) {
          this.onBackClick();
          return;
        }
        const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
        if (selectedNode) {
          this.onClick(selectedNode);
        }
      }
    });

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE" ? "public/imgs/file.png" : "public/imgs/directory.png";
          return `
          <li class="Node" data-node-id="${node.id}">
            <img src="${iconPath}">
            <div>${node.name}</div>
          </li>
        `;
        })
        .join("");

      this.$target.innerHTML = !this.state.isRoot
        ? `<li class="Node"><img src="public/imgs/prev.png"></li>${nodesTemplate}`
        : nodesTemplate;
    }
  }
}
