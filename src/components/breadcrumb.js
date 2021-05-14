export default class BreadCrumb {
  constructor({ $app, initialState, onNavClick }) {
    this.state = initialState;
    this.onNavClick = onNavClick;

    this.$target = document.createElement("nav");
    this.$target.className = "Breadcrumb";
    $app.appendChild(this.$target);

    this.render();

    this.$target.addEventListener("click", (e) => {
      const $navItem = e.target.closest(".nav-item");
      if ($navItem) {
        const { index } = $navItem.dataset;
        this.onNavClick(index ? index : null);
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class="nav-item">root</div>${this.state
      .map((node, index) => `<div class="nav-item" data-index="${index}">${node.name}</div>`)
      .join("")}`;
  }
}
