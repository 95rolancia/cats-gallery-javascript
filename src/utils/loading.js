export default class Loading {
  constructor() {
    const spinnerWrapper = document.createElement("div");
    spinnerWrapper.className = "spinner-wrapper";
    spinnerWrapper.classList.add("hidden");

    const spinnerImage = document.createElement("img");
    spinnerImage.className = "spinner-image";
    spinnerImage.src = "public/imgs/loading.gif";

    spinnerWrapper.appendChild(spinnerImage);
    document.body.appendChild(spinnerWrapper);
  }

  toggleSpinner() {
    console.log("spinner 토글");
    document.querySelector(".spinner-wrapper").classList.toggle("hidden");
  }
}
