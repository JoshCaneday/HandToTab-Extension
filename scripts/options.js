window.addEventListener("DOMContentLoaded", init);

function init(){
  const recordButton = document.querySelector("button");
  recordButton.addEventListener("click", () => {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
           document.querySelector("video").srcObject = stream;
        })
        .catch(err => console.error("Camera error:", err));
  });
}