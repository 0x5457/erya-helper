// 完成当前视频 跳转到下一个视频
const alleclls = new Array(...document.querySelectorAll('.ncells'));
window.finishJob = () => {
  const current = document.querySelector('.ncells .currents').parentElement.parentElement;
  const nextCellIndex = alleclls.findIndex(item => {
    return item.children[0].children[0].id === current.children[0].children[0].id
  });

  const nextCell = alleclls[nextCellIndex + 1];
  if (nextCell) {
    document.querySelector(`#${nextCell.children[0].children[0].id}`).click();
  }
};


window.getTeacherAjax = (courseId,clazzid,chapterId) => {
  if(courseId==0||clazzid==0||chapterId==0){
    alert("无效的参数！");
    return ;
  }
  document.getElementById("mainid").innerHTML = "<div style=\"width:32px;height:32px;margin:0 auto;padding:300px 0\"><img src=\"/images/courselist/loading.gif\" /></div>"
  jQuery.post("/mycourse/studentstudyAjax",
    {
      courseId:courseId
      ,clazzid:clazzid
      ,chapterId: chapterId
    },
    function(data){
      data = data.replace(/(^\s*)|(\s*$)/g,"");
      var doc = document.getElementById("mainid");
      doc.innerHTML = data;
      document.getElementById("iframe").src="/knowledge/cards?clazzid="+clazzid+"&courseid="+courseId+"&knowledgeid="+chapterId+"&num=0&v=20160407-1";
      var el = $('#iframe');
      //var openlockdiv=document.getElementById("openlock");
      if($("#openlock").length>0){
        var count=document.getElementById("cardcount").value;
        if(count==1){
          setTimeout('openlockshow();',2000);
        }
      }
      if($("#cur"+chapterId+" .orange01").length>0){

        jQuery.ajax({
          type : "get",
          url : "/edit/validatejobcount",
          data : {
            courseId:courseId
            ,clazzid:clazzid
            ,nodeid: chapterId
          },
        });
      }
      window.ed_reinitIframe = function ed_reinitIframe(){
        var iframe = el[0];

        try{
          var bHeight = iframe.contentWindow.document.body.scrollHeight;
          var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
          var height = Math.max(bHeight, dHeight);
          el.attr('height',height);
        }catch (ex){}
      }
      window.setInterval("ed_reinitIframe()", 200);

      var tab=0;
      if(tab==3){
        getClazzNote();changePan('3');
      }else if(tab==2){
        getChapterRightDiscuss();changePan('2');
      }else{
        changePan('1');
      }
      window.clickVideoTag();
    }

  );
  window.setInterval("setposition()", 200);

  jobflagOperation();

  //window.setTimeout("setposition()", 200);
  scroll(0,0);
}

window.clickVideoTag = () => {
  const studyTag = document.querySelector('span[title="学习目标"]');
  if (studyTag) {
    document.querySelector('span[title="视频"]').click();
  }
}
clickVideoTag();
