chrome.storage.onChanged.addListener((changes) => {
  if (Object.keys(changes).includes('fullScreenOption')) {
    chrome.tabs.query({ active: true, currentWindow: true}, ([{ id }]) => chrome.tabs.reload(id));
  }
})

window.onload = async () => {
const { fullScreenOption: wasChecked } = await chrome.storage.sync.get(['fullScreenOption']);
const checkBox = document.querySelector('.alternate');
checkBox.checked = !!wasChecked;
console.log(wasChecked, 'sem !');
console.log(!wasChecked, 'com !');
console.log(!!wasChecked, 'com !!');

const setOnOrOff = (event) => {
  chrome.storage.sync.get(['fullScreenOption'], ({ fullScreenOption }) => {
    chrome.storage.sync.set({fullScreenOption: !fullScreenOption});
    event.target.checked = !fullScreenOption
  })
}



checkBox.addEventListener('click', setOnOrOff, false);
}