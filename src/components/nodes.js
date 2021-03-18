import api from "../api/api.js";

export default class Nodes {
  constructor(loading) {
    this.loading = loading;
    this.nodes = document.querySelector(".Nodes");
    this.data = undefined;
    this.loading.toggleSpinner();

    api.fetchRoot().then((response) => {
      if (response.isError) {
        console.error("fetchRoot failed");
        return;
      }
      this.data = response.data;
      this.render();
      this.loading.toggleSpinner();
    });
    this.stack = [0];
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  render() {
    this.nodes.innerHTML = "";
    if (this.stack.length !== 1) {
      const prev = document.createElement("div");
      prev.setAttribute("class", "Node prev");
      prev.setAttribute("data-id", this.parentId);

      const img = document.createElement("img");
      img.setAttribute("src", "./public/imgs/prev.png");
      img.addEventListener("click", (e) => {
        this.stack.pop();
        this.loading.toggleSpinner();
        if (this.stack.length === 1) {
          api.fetchRoot().then((response) => {
            this.setState(response.data);
            this.loading.toggleSpinner();
          });
        } else {
          api
            .fetchDirectory(this.stack[this.stack.length - 1])
            .then((response) => {
              this.setState(response.data);
              this.loading.toggleSpinner();
            });
        }
      });
      prev.appendChild(img);
      this.nodes.appendChild(prev);
    }

    this.data.forEach((item) => {
      if (item.type === "DIRECTORY") {
        const content = document.createElement("div");
        content.setAttribute("class", "Node directory");
        content.setAttribute("data-id", item.id);

        const img = document.createElement("img");
        img.setAttribute("src", "./public/imgs/directory.png");
        img.addEventListener("click", (e) => {
          this.loading.toggleSpinner();
          const id = e.target.parentNode.dataset.id;
          api.fetchDirectory(id).then((response) => {
            this.stack.push(item.id);
            this.setState(response.data);
            this.loading.toggleSpinner();
          });
        });
        content.appendChild(img);
        content.insertAdjacentHTML("beforeend", `<div>${item.name}</div>`);
        this.nodes.appendChild(content);
      } else {
        const content = document.createElement("div");
        content.setAttribute("class", "Node file");
        content.setAttribute("data-id", item.id);
        content.setAttribute("data-img", item.filePath);

        const img = document.createElement("img");
        img.setAttribute("src", "./public/imgs/file.png");
        img.addEventListener("click", () => {
          console.log("file clicked");
          api.fetchPng(item.filePath).then((response) => {
            console.log(response);
          });
        });
        content.appendChild(img);
        content.insertAdjacentHTML("beforeend", `<div>${item.name}</div>`);
        this.nodes.appendChild(content);
      }
    });
  }
}
