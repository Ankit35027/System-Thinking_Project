function handleResize(elementID, text) {
    const element = document.getElementById(elementID);
    if (!element) return;

    if (window.innerWidth < 768) {
      element.innerHTML = text;
    } else {
      element.innerHTML = "<--";
    }
  }
  window.addEventListener("DOMContentLoaded", () => {
    handleResize("divi", "ꜛ");
    window.addEventListener("resize", () => handleResize("divi", "ꜛ"));
  });
  window.addEventListener("DOMContentLoaded", () => {
    handleResize("divi", "ꜛ");
    window.addEventListener("resize", () => handleResize("divi", "ꜛ"));
  });
  