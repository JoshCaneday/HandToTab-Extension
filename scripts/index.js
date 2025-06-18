window.addEventListener("DOMContentLoaded", init);

function init(){
    if (typeof browser === "undefined") {
        globalThis.browser = chrome;
    }
    const settingsButton = document.getElementById("settings");
    settingsButton.addEventListener(("click"), () => {
        browser.tabs.create({ url: "chrome-extension://kfnhfnabhjmenaaecaaogkjegibfiojd/options.html" });
    });

    let mediaRecorder;
    let recordedChunks = [];

    let recordButton = document.getElementById("record");
    const stopButton = document.getElementById("stop");
    const video = document.getElementById("preview");

    recordButton.addEventListener("click", async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        recordedChunks = [];
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };

        mediaRecorder.start();
    });

    stopButton.addEventListener("click", () => {
        mediaRecorder.stop();

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: "video/webm" });

            video.srcObject = null;
            video.src = URL.createObjectURL(blob);
            video.controls = true;

            const formData = new FormData();
            formData.append("file", blob, "recording.webm");

            fetch("https://your-server.com/upload", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => console.log("Upload success:", data))
            .catch(err => console.error("Upload failed:", err));
        };
    });

    /*
    recordButton = document.querySelector("#record");
    stopButton = document.querySelector("#stop");

    recordButton.addEventListener("click", async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);

                fetch("https://localhost:3000/add-data", {
                    method: "POST",
                    body: e.data
                })
                .then(res => res.json())
                .then(data => console.log("Upload success:", data))
                .catch(err => console.error("Upload failed:", err));

                fetch("https://localhost:3000/get-inference")
                .then(res => res.json())
                .then(data => console.log("Upload success:", data))
                .catch(err => console.error("Upload failed:", err));
            }
        };

        mediaRecorder.start(10);
    });

    stopButton.addEventListener("click", async () => {
        mediaRecorder.stop();

        mediaRecorder.onstop = () => {
            video.srcObject = null;
        }

        fetch("https://localhost:3000/get-results")
        .then(res => res.json())
        .then(data => console.log("Upload success:", data))
        .catch(err => console.error("Upload failed:", err));
    });
    */





}
