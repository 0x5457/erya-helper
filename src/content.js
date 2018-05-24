chrome.runtime.sendMessage(null, {isErya: true});

window.onload = () => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL('inject.js');
  document.body.appendChild(script);
};

// // 完成当前视频 跳转到下一个视频
// window.onload = () => {
//   const alleclls = new Array(...document.querySelectorAll('.ncells'));
//   window.finishJob = () => {
//     const current = document.querySelector('.ncells .currents').parentElement.parentElement;
//     const nextCellIndex = alleclls.findIndex(item => {
//       return item.children[0].children[0].id === current.children[0].children[0].id
//     });
//
//     const nextCell = alleclls[nextCellIndex + 1];
//     if (nextCell) {
//       nextCell.children[0].children[0].click();
//     }
//   };
// };

