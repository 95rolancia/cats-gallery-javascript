export default class BreadCrumb {
  constructor() {
    this.breadCrumb = document.querySelector(".Breadcrumb");
    this.path = ["root"];
    this.render();
  }

  setState(next) {
    this.path.push(next);
    this.render();
  }

  render() {
    this.breadCrumb.innerHTML = "";
    this.path.forEach((name) => {
      const cur = document.createElement("div");
      cur.className = name;
      cur.textContent = name;
      this.breadCrumb.appendChild(cur);
    });
  }
}
