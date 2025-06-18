window.addEventListener("DOMContentLoaded", init);

function init(){
    if (typeof browser === "undefined") {
        globalThis.browser = chrome;
    }
    const newTabButton = document.getElementById("test");
    const recordButton = document.getElementById("record");
    newTabButton.addEventListener(("click"), () => {
        browser.tabs.create({ url: "http://example.com/first-run.html" });
    });
    recordButton.addEventListener("click", () => {
        browser.tabs.query({ active: true, currentWindow: true }, tabs => {
            browser.tabs.sendMessage(tabs[0].id, { action: "startCamera" });
        });
    });



}
