const allLink = new Array(...document.querySelectorAll('.link > [to]'));
allLink.forEach(link => {
  link.onclick = () => {
    chrome.tabs.create({
      url: link.getAttribute('to'),
    });
  }
});
