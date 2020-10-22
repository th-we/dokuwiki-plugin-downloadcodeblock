function preceding(element) {
  return element && (element.previousElementSibling || preceding(element.parentNode));
}

function deriveFilename(element) {
  // TODO: Make pattern and default name configurable
  const match = element && element.textContent.match(/^\s*(.+[/\\])?([^/\\]+\.\w+)\s*$/);
  return match ? match[2] : "code.txt";
}

window.addEventListener("load", () => {
  for (const codeElement of document.querySelectorAll("#dokuwiki__content pre.code")) {
    const code = codeElement.textContent;
    // Try to interpret the element before the <pre> element as file name
    const filename = deriveFilename(preceding(codeElement));
    const button = document.createElement("button");
    button.textContent = "Download";
    button.classList.add("downloadcodeblock");
    button.addEventListener("click", () => {
      // Support for browser.downloads.download isn't good yet, so use <a> instead
      const a = document.createElement("a");
      a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(code);
      a.download = filename;
      a.click();
    }, false);
    codeElement.parentNode.insertBefore(button, codeElement);
  }
}, false);
