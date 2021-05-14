const IMAGE_PATH_PREFIX = "../../";

export default class ImageView {
  constructor({ $app, initialState, onCloseClick }) {
    this.state = initialState;

    this.$target = document.createElement("div");
    this.$target.className = "Modal ImageView";
    $app.appendChild(this.$target);

    this.$target.addEventListener("click", (e) => {
      const closeBtn = e.target.closest("button");
      if (closeBtn) {
        onCloseClick();
      }
    });

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class="content">${
      this.state ? `<button>닫기</button><img src="${IMAGE_PATH_PREFIX}${this.state}">` : ""
    }</div>`;
    this.$target.style.display = this.state ? "block" : "none";
  }
}
