window.addEventListener("DOMContentLoaded", init);

function init(){
    if (typeof browser === "undefined") {
        globalThis.browser = chrome;
    }
    const button = document.getElementById("test");
    button.addEventListener(("click"), () => {
        browser.tabs.create({ url: "http://example.com/first-run.html" });
    });

}
