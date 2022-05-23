console.log('Bionic Text Installed');

function bionicText() {
  function bionicize(element) {
    [...element.childNodes].forEach((e) => {
      if (e.nodeType === 3) {
        const newElement = document.createElement('span');
        newElement.innerHTML = bionicString(e.textContent);
        element.replaceChild(newElement, e);
      } else {
        bionicize(e);
      }
    });
  }

  function bionicString(str) {
    return str.replace(/\w+/gs, bionicWord);
  }

  function bionicWord(str) {
    const i = Math.ceil(str.length / 2);
    return str.startsWith('<') || str.endsWith('<')
      ? str
      : `<b>${str.substring(0, i)}</b>${str.substring(i)}`;
  }

  [
    ...document.querySelectorAll('p'),
    ...document.querySelectorAll('li'),
  ].forEach((e) => bionicize(e));
}

document.getElementById('bionicToggle').addEventListener('change', (e) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: bionicText,
    });
  });
});
