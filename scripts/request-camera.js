chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "startCamera") {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;
        video.style.position = "fixed";
        video.style.bottom = "10px";
        video.style.right = "10px";
        video.style.width = "200px";
        document.body.appendChild(video);
      })
      .catch(err => console.error("Camera error:", err.name, err.message));
  }
});
