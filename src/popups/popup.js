const allLink = new Array(...document.querySelectorAll('.link > [to]'));
allLink.forEach(link => {
  link.onclick = () => {
    console.log(link.to);
    chrome.tabs.create({
      url: link.getAttribute('to'),
    });
  }
});
