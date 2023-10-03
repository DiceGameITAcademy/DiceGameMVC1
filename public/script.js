document.addEventListener("htmx:configRequest", function (event) {
    // Reset any previous error or success messages
    document.getElementById("response").textContent = "";
  });

  document.addEventListener("htmx:responseError", function (event) {
    // Handle error response from the server
    const response = event.detail.xhr.response;
    document.getElementById("response").textContent = response.error;
  });

  document.addEventListener("htmx:response", function (event) {
    // Handle success response from the server
    const response = event.detail.xhr.response;
    document.getElementById("response").textContent = response.message;
  });