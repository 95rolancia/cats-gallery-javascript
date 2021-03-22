export default class BreadCrumb {
  constructor() {
    this.breadCrumb = document.querySelector(".Breadcrumb");
    this.path = ["root"];
    this.render();
  }

  pathPop() {
    this.path.pop();
    return this.path;
  }

  pathPush(path) {
    this.path.push(path);
    return this.path;
  }

  setState(path) {
    this.path = path;
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
