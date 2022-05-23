let color = '#9aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });

    console.log("Bionic Text Loaded")
})