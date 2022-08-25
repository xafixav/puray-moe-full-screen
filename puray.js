class FullScreen {
  constructor(videoPlayerXPath) {
    this.videoPlayerXPath = videoPlayerXPath;
    this.videoPlayer = FullScreen.getElementByXPath(this.videoPlayerXPath)
    this.app = document.querySelector('#app');
    this.body = document.querySelector('body');
  }

  static getElementByXPath = (XPath) => {
    const result = document.evaluate(XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    return result;
  };

  setFullScreen = () => {
    console.log('working');
    const body = document.querySelector('body');
    body.append(this.videoPlayer);
    this.videoPlayer.firstChild.style.height = '100%';
    console.log(this.videoPlayer.style.height);
    const appPage = document.querySelector("#app")
    appPage.remove();
  }

  static waitForLoading = async () => {
    await new Promise(r => setTimeout(r, 3000));
    return console.log('terminei de carregar');
  }
}

window.onload = async () => {
  await FullScreen.waitForLoading();
  const {fullScreenOption} = await chrome.storage.sync.get(['fullScreenOption']);
  if (fullScreenOption) {
    const videoPlayerXPath = '/html/body/div/main/div/div/div/div/div[1]/div/div[2]/div[4]';
    const video = new FullScreen(videoPlayerXPath);
    video.setFullScreen();
  }
}
