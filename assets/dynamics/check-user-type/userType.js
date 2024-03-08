
function userType() {
  const userType = localStorage.getItem("userType");
  var elements = document.querySelectorAll('[role="business"]');

  for (let element of elements) {
    if (userType !== "business") {
      element.style.display = "none";
    }
  }
}
userType();
