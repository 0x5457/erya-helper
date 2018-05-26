/**
 * http://tool.css-js.com/  使用 JSpacker压缩
 */
jQuery.fn.limit = function () {
  var self = $(".rage_list li a");
  self.each(function () {
    var objString = $(this).text();
    var objLength = $(this).text().length;
    var num = 26;//$(this).attr("limit");
    if (objLength > num) {
      $(this).attr("title", objString);
      objString = $(this).text(objString.substring(0, num) + "...");
    }
  })
}

function MoocPlayer(option) {
  option = option || {};
  this.player = null;
  this.firstClick = false;
  this.isSendLog = option.isSendLog ? true : false;
  this.intervalTime = option.intervalTime || 120 * 1000;
  this.render = option.render || 'reader';
  this.skin = option.skin || 'black';
  this.skinBasePath = option.skinBasePath || '/ananas/modules/video/cxplayer/skin/';
  this.playerPath = option.playerPath || '/ananas/modules/video/cxplayer/player_4.0.11.swf?v=20161025';
  this.resourcePlugPath = option.ResourcePlugPath || '/ananas/modules/video/cxplayer/ResourcePlug.swf?v=20141016';
  this.width = document.getElementById(this.render).clientWidth || option.width;
  this.height = document.getElementById(this.render).clientHeight || option.height;
  this.data = option.data || {};
  this.reportUrl = this.data.reportUrl || '/multimedia/log';
  this.playCompleteCallBack = option.playCompleteCallBack || 'proxy_completed';
  this.initDataUrl = this.data.mid ? ('/richvideo/initdatawithviewer?&start=' + this.data.startTime + '&mid=' + this.data.mid) : '';
  this.previewUrl = this.data.screenshot || '';
  this.viewPicUrl = this.data.thumbnails || '';
  this.logCount = 0;
  this.config = {};
  this.startPoint = 0;
  this.answerWrongCounter = {};
  this.lastDrag = null;
  this.lastPlayTime = null;
  this.danmulist = new Array();
  this.danmuidlist = new Array();
  if (this.data.dtoken) {
    this.reportUrl = this.reportUrl + "/" + this.data.dtoken
  } else {
    alert("视频加载失败！");
    return;
  }
  if (!jQuery) {
    alert('jQuery not fount');
  } else {
    this._init();
  }
};

/**
 * 初始化
 */
MoocPlayer.prototype._init = function () {
  var me = this;

  me.startPoint = (function () {
    if (me.data.isPassed) {
      return 0;
    }
    return me.data.headOffset || 0;
  })();

  var vbegin = me.data.startTime || '',
    vend = me.data.endTime || '',
    drag = (function () {
      if (top.location.pathname.indexOf('teacherstudy') != -1) {
        return true;
      }
      return me.data.enableFastForward == 1 ? true : false;
    })(),
    url = (function () {
      function removeStart(s, r) {
        if (!s || !r || s.length < r.length) {
          return s;
        }

        if (s.substring(0, r.length) == r) {
          return s.substring(r.length);
        }
        return s;
      }

      var urls = new Array();

      // 测试用
      if (18068657 == me.data.userid) {
        if (me.data.httpmd) {
          me.data.httpmd = 'rtmp://42.62.29.72:1935/vod' + (/\/video\/.*mp4/.exec(me.data.httpmd));
        }
        if (me.data.http) {
          me.data.http = 'rtmp://42.62.29.72:1935/vod' + (/\/video\/.*mp4/.exec(me.data.http));
        }
        if (me.data.httphd) {
          me.data.httphd = 'rtmp://42.62.29.72:1935/vod' + (/\/video\/.*mp4/.exec(me.data.httphd));
        }
        if (me.data.httpshd) {
          me.data.httpshd = 'rtmp://42.62.29.72:1935/vod' + (/\/video\/.*mp4/.exec(me.data.httpshd));
        }
      }//ZT HB MAG
      if (top.dtype == "ZT" || top.dtype == "HB" || top.dtype == "MAG") {
        if (me.data.http) {
          urls.push("{'公网1标清':'" + me.data.http.replace(/s1.ananas.chaoxing.com/, 'zt.maliemlun.cn') + "', 'indexorder':0.1}");
          urls.push("{'公网2标清':'" + me.data.http.replace(/s1.ananas.chaoxing.com/, 'zt2.maliemlun.cn') + "', 'indexorder':0.1}");
        }

        if (me.data.httpmd) {
          urls.push("{'公网1极速':'" + me.data.httpmd.replace(/s1.ananas.chaoxing.com/, 'zt.maliemlun.cn') + "', 'indexorder':0.2}");
          urls.push("{'公网2极速':'" + me.data.httpmd.replace(/s1.ananas.chaoxing.com/, 'zt2.maliemlun.cn') + "', 'indexorder':0.2}");
        }

        if (me.data.httphd) {
          urls.push("{'公网1720p':'" + me.data.httphd.replace(/s1.ananas.chaoxing.com/, 'zt.maliemlun.cn') + "', 'indexorder':0.3}");
          urls.push("{'公网2720p':'" + me.data.httphd.replace(/s1.ananas.chaoxing.com/, 'zt2.maliemlun.cn') + "', 'indexorder':0.3}");
        }

        if (me.data.httpshd) {
          urls.push("{'公网11080p':'" + me.data.httpshd.replace(/s1.ananas.chaoxing.com/, 'zt.maliemlun.cn') + "', 'indexorder':0.4}");
          urls.push("{'公网21080p':'" + me.data.httpshd.replace(/s1.ananas.chaoxing.com/, 'zt2.maliemlun.cn') + "', 'indexorder':0.4}");
        }
      } else {
        if (me.data.http) {
          urls.push("{'公网1标清':'" + me.data.http + "', 'indexorder':0.1}");
          urls.push("{'公网2标清':'" + me.data.http.replace(/s1.ananas.chaoxing.com/, 's2.ananas.chaoxing.com') + "', 'indexorder':0.1}");
        }

        if (me.data.httpmd) {
          urls.push("{'公网1极速':'" + me.data.httpmd + "', 'indexorder':0.2}");
          urls.push("{'公网2极速':'" + me.data.httpmd.replace(/s1.ananas.chaoxing.com/, 's2.ananas.chaoxing.com') + "', 'indexorder':0.2}");
        }

        if (me.data.httphd) {
          urls.push("{'公网1720p':'" + me.data.httphd + "', 'indexorder':0.3}");
          urls.push("{'公网2720p':'" + me.data.httphd.replace(/s1.ananas.chaoxing.com/, 's2.ananas.chaoxing.com') + "', 'indexorder':0.3}");
        }

        if (me.data.httpshd) {
          urls.push("{'公网11080p':'" + me.data.httpshd + "', 'indexorder':0.4}");
          urls.push("{'公网21080p':'" + me.data.httpshd.replace(/s1.ananas.chaoxing.com/, 's2.ananas.chaoxing.com') + "', 'indexorder':0.4}");
        }
      }


      // if (me.data.cdn && me.data.cdn.length > 0) {
      //   for (var i = 0, len = me.data.cdn.length; i < len; i++) {
      //     if (me.data.http) {
      //       urls.push("{'" + me.data.cdn[i].label + "标清':'" + me.data.cdn[i].url + "/" + removeStart(me.data.http, 'http://') + "', 'indexorder':" + (me.data.cdn[i].indexorder + 0.1) + "}");
      //     }
      //
      //     if (me.data.httpmd) {
      //       urls.push("{'" + me.data.cdn[i].label + "极速':'" + me.data.cdn[i].url + "/" + removeStart(me.data.httpmd, 'http://') + "', 'indexorder':" + (me.data.cdn[i].indexorder + 0.2) + "}");
      //     }
      //
      //     if (me.data.httphd) {
      //       urls.push("{'" + me.data.cdn[i].label + "720p':'" + me.data.cdn[i].url + "/" + removeStart(me.data.httphd, 'http://') + "', 'indexorder':" + (me.data.cdn[i].indexorder + 0.3) + "}");
      //     }
      //
      //     if (me.data.httpshd) {
      //       urls.push("{'" + me.data.cdn[i].label + "1080p':'" + me.data.cdn[i].url + "/" + removeStart(me.data.httpshd, 'http://') + "', 'indexorder':" + (me.data.cdn[i].indexorder + 0.4) + "}");
      //     }
      //   }
      // }

//		for (var i = 0, cur; cur = urls[i]; i++) {
//			for (var j = i + 1, next; next = urls[j]; j++) {
//				var oCur = eval('(' + cur + ')');
//				var oNext = eval('(' + next + ')');
//				
//				if (oCur.indexorder > oNext.indexorder) {
//					var tmp = urls[i];
//					urls[i] = urls[j];
//					urls[j] = tmp;
//				}
//			}
//		}
      for (var i = 0; i < urls.length - 1; i++) {
        for (var j = i + 1; j < urls.length; j++) {
          var oCur = eval('(' + urls[i] + ')');
          var oNext = eval('(' + urls[j] + ')');
          if (oCur.indexorder > oNext.indexorder) {
            var tmp = urls[i];
            urls[i] = urls[j];
            urls[j] = tmp;
          }
        }
      }
      return '[' + urls.join(',') + ']';
    })(),
    playLines = (function () {
      var lines = new Array();

      var urls = eval('(' + url + ')');

      function getObj(index, name, intro) {
        var obj = new Object();
        obj.index = index;
        obj.name = name;
        obj.intro = intro;
        return obj;
      }

      for (var i = 0, len = urls.length; i < len; i++) {
        for (var name in urls[i]) {
          if (/极速|标清|720p|1080p/.test(name)) {
            lines.push(getObj(i, name, ''));
          }
        }
      }

      return lines;
    })(),
    subtitleUrl = me.data.mid ? '/richvideo/subtitle?mid=' + me.data.mid : '',
    videoUrl = '/multimedia/getvideo?single=false&url=' + url + '&start=' + me.startPoint + '&drag=' + drag + '&vbegin=' + vbegin + '&vend=' + vend,
    config = {};

  if (me.startPoint > me.data.duration || (vend != '' && me.startPoint > vend)) {
    me.startPoint = 0;
  }

  config.width = me.width;
  config.height = me.height;
  config.player = me.playerPath;

  if (-1 != url.indexOf('rtmp://')) {
    config.provider = 'rtmp';
  }
  var iframe = window.frameElement;
  var data = Ext.decode(iframe.getAttribute('data'));
  var v_begin = 0;
  if (data && data.v_begin) {
    v_begin = data.v_begin;
  }
  config.datas = {
    //pauseAdvertList: [],	//暂停广告列表(数据格式见1.6说明)
    //preAdvertList: [],	//片头广告列表(数据格式见1.6说明)
    intervalTime: me.intervalTime,	//onPlayProgress交互事件触发频率。默认(1000毫秒)
    isAutoChgLine: false,	//是否智能切换线路,默认值true，表示自动切换
    isAutoPlayNext: false,	//是否自动切换至下一集
    isDefaultPlay: true,	//是否默认播放，默认值为true；设为false默认暂停
    minKbs: 15,	//设置网速下限值，下载速度低于此值，则认为是网速慢(单位kb)，默认15kb
    minKbsLongTime: 5,	//慢网速的持续时长，如果超过此时长，则自动切换线路(单位秒)，默认值10秒
    //cdnUrl: "",	//智能获取线路CDN地址，不设置时默认值http://cdn.chaoxing.com/cdnlist.html
    siteId: "erya_mooc",	//站点授权码(必填)
    danmu: me.data.danmaku,
    currVideoInfo: {
      v_begin: v_begin,
      //videoId:"",	//视频ID,
      //courseId:"",	//课程ID
      //serieId:"",	//视频所在的系列id
      //seriNum:1,	//在播放列表中的第几集
      //title:"",	//视频标题
      locked: false,	//是否锁定
      //metaDataUrl:"",	//获取视频头信息地址
      previewUrl: me.previewUrl,	//视频预览图
      getVideoUrl: videoUrl,	//获取播放线路所对应的播放地址(返回数据格式见1.3说明)
      dftLineIndex: 0,	//默认选择的线路索引
      subtitleUrl: subtitleUrl,	//加载字幕的地址(返回数据格式见1.7说明)
      //pointListUrl: "",	//加载知识点列表的url(返回数据格式见1.4说明)
      //playListUrl: "",	//加载当前视频所在的播放列表(返回数据格式见1.5说明)
      //relatListUrl: "",	//加载与当前视频相关的推荐列表(返回数据格式见1.5说明)
      //viewPicUrl: 'http://mooc.chaoxing.com/richvideo/viewpic?url=' + me.viewPicUrl,	//加载与当前视频相关的读条上的图片列表(返回数据格式见1.12说明)
      resourceUrl: me.initDataUrl	//加载与当前视频相关的资源(返回数据格式见1.11说明)
      //data:{}	//预留可扩展的业务参数,默认可不填充
    }
  };
  config.skin = {
    text: {
      siteNameText: '超星网',
      playLines: playLines
      , fastPlayList: [
        {index: 0, name: '正常播放', value: 1},
        {index: 2, name: '×1.25倍速播放', value: 1.25},
        {index: 3, name: '×1.5倍速播放', value: 1.5},
        {index: 4, name: '×2倍速播放', value: 2}
      ]
    },
    img: {
      //waterIconImg: me.skinBasePath + me.skin + "/water_logo.png",//水印logo图片地址,默认无
      //loadLogoImg: me.skinBasePath + me.skin + '/loading_logo.png'//加载面板中logo图片地址，内置默认图片
      //loadAdvertImg: me.skinBasePath + me.skin + "/ad_logo.png",//广告语图片地址，默认无
      //loadBgImg: "/loading_bg.png",//加载面板背景图片,默认无
      //bottomBgImg: me.skinBasePath + me.skin + "/bottom_bg.png",//底部工具栏背景图片,内置默认图片
      //共享面板定制按钮的图片(数据格式见1.10说明)
      //shareIcons:[
      //	{index: 0, name: "人人网",url: me.skinBasePath + me.skin + "/icons/renren.png", linkTo: "http://www.renren.com"},
      //	{index: 1, name: "QQ空间",url: me.skinBasePath + me.skin + "/icons/qzone.png", linkTo: "http://qzon.qq.com"},
      //	{index: 4, name: "豆瓣",url: me.skinBasePath + me.skin + "/icons/douban.png", linkTo: "http://www.douban.com"}
      //]
    },
    color: {
      themeColor: 0xFFFFFF,//主题颜色值设定,默认0xFF0000(红色)
      colors: {
        bottomBgColor: 0xFFFFFF,//底部工具栏背景颜色,默认0xFF0000(红色)
        bottomPanelColor: 0xFFFFFF,//底部工具栏颜色，默认采用themeColor
        movieDragPanelColor: 0xFFFFFF,//底部拖拽栏颜色，默认采用themeColor
        rightPanelColor: 0xFFFFFF,//右侧工具栏颜色，默认采用themeColor
        topPanelColor: 0xFFFFFF,//顶部工具栏颜色，默认采用themeColor
        settingPanelColor: 0xFFFFFF,//设置面板颜色，默认采用themeColor
        bigPlayBtnColor: 0xFFFFFF,//大播放按钮颜色,暂停时显示，默认采用themeColor
        bigRePlayBtnColor: 0xFFFFFF,//大重播按钮,列表最后一集播放完成时显示，默认采用themeColor
        playListPanelColor: 0xFFFFFF //播放列表鼠标悬停颜色,默认采用themeColor
      }
    },
    style: {
      subtitle: {
        fontSize: 25, //单位px(像素),默认40px
        fontFamily: "微软雅黑", //字体样式,默认楷体
        fontColor: 0xFFFFFF, //字体颜色,默认0xFFFFFF
        strokeColor: 0x000000, //描边颜色,默认0x000000
        strokeSize: 2 //描边宽度,默认2px(像素)
      },
      resourcePanel: {
        x: 0,//默认x轴位置
        y: 0,//默认y轴位置
        width: 200,//宽度
        heigth: 150//高度
      }
    },
    view: {
      bottomPanel: {
        bottons: {
          playNextBtn: false,//是否显示下一集按钮，默认值true
          playPrevBtn: false,//是否显示上一集按钮，默认值true
          playListBtn: false,//全屏时是否显示播放列表按钮,默认值true
          chgLineBtn: false,// 是否显示切换路按钮,默认值true
          lineListBtn: false,// 是否显示线路下拉列表按钮,默认值true
          onlylineListBtn: true,// 是否显示线路下拉列表按钮,默认值true
          cutImgBtn: false,// 是否显示截图按钮,默认值true
          settingBtn: false,// 是否显示设置按钮,默认值true
          fastPlayBtn: true,//是否显示快速播放按钮,默认值false
          subtitleChgBtn: true//是否显示切换字幕按钮,默认值false
        },
        labels: {
          msgLabel: true, // 是显示下载速度提示面板,默认值true
          timeLabel: true // 是显示播放时长,默认值true
        }
      },
      movieDragPanel: {
        visiable: true,//是否显示底部进度条，默认值true
        bottons: {
          fastBackBtn: true,//是否显示快退按钮，默认值true
          fastForBtn: true //是否显示快进按钮，默认值true
        },
        bars: {
          progressBar: true //是否显示播放进度栏,默认值true
        }
      },
      rightPanel: {
        visiable: false,//是否显示右侧工具栏，默认值true
        bottons: {
          shareBtn: true, // 是否显示分享按钮,默认值true
          trunOffBtn: true, // 是否开、关灯按钮,默认值true
          chgLineBtn: true, // 是否显示切换线路按钮,默认值true
          downloadBtn: true// 是否显示下载按钮,默认值true
        }
      },
      settingPanel: {
        visiable: false, //是否显示设置面板，默认值true
        tabs: {
          colorTab: true, // 是否显示亮度调节选项卡,默认值true
          screenTab: true,// 是否显示画面比例选项卡,默认值true
          subtitleTab: true, // 是否显示字幕设置选项卡,默认值true
          chgLineTab: true // 是否显示线路切换选项卡,默认值true
        }
      },
      topPanel: {
        visiable: true,//是否显示顶部工具栏
        bottons: {
          fullScreenBtn: false,//是否显示顶部全屏按钮,默认值false
          scale50Btn: true,//是否显示缩放至50%比例按钮,默认值true
          scale75Btn: true,//是否显示缩放至75%比例按钮,默认值true
          scale100Btn: true,//是否显示缩放至100%比例(原始比例)按钮,默认值true
          coveredBtn: true// 是否显示画面铺满屏幕按钮，默认值false
        }
      },
      resourcePanel: {
        visiable: true, //是否显示资源面板
        plugins: {
          quiz: {
            visible: false, // 不显示询问
            url: me.resourcePlugPath
          },
          ppt: {
            visible: true
          },
          img: {
            visible: true
          },
          valicode: {
            visible: true
          }
        }
      }

      /*
       , customerRightIcons:[ //右侧定制按钮
        {
                  index:0, //排序索引
                  icon: "skin/default/icons/qzone.png",//按钮图标地址
                  text: "测试",//按钮名称
                  id: "btn_0"//按钮唯一标识
               }
      ]
      */
    }
  };
  config.events = {
    //准备初始化时触发,如果返回false则停止初始化，不往下执行。
    onInit: function () {

    },
    //播放器初始化完成时触发。event ：事件源，当前播放器对象。
    onInitComplete: function (event) {
    },
    //获取视频播放地址，验证不通过时触发。event ：事件源，当前播放器对象。seriId ：表示视频所在的系列id。videoId ：当前播放的视频id。data：获取播放地址时服务端返回的数据。
    onNotVideoUrl: function (event, seriId, videoId, data) {

    },
    //切换播放集数时触发。event ： 事件源，当前播放器对象。index ：当前切换的视频在播放列表中的位置(从0开始)。data ：当前视频的信息(数据格式参看1.2说明)。enc：加密串
    onGoPlay: function (event, index, data, enc) {

    },
    //点击分享按钮时触发。event：事件源，当前播放器对象。index：表示点击第几个按钮。data：共享信息(数据格式参看1.10说明)。
    onShare: function (event, index, data) {

    },
    //视频解锁时触发.event 事件源对象，当前播放器.index ：当前切换的视频在播放列表中的位置(从0开始)。data当前视频的信息(数据格式参看1.2说明)。
    onUnlock: function (event, index, data) {

    },
    //开灯、关灯时触发。event ：事件源，当前播放器对象。isOff ：开关灯状态 true 表示关灯，false表示开灯。
    onTurnOff: function (event, isOff) {

    },
    //播放至知识点开始位置时触发。 event： 事件源对象，当前播放器。 data： 知识点信息(数据格式参看1.4说明)。 enc： 加密串
    onPointStart: function (event, data, enc) {

    },
    //播放至知识点结束位置时触发。 event：事件源对象，当前播放器。 data： 知识点信息(数据格式参看1.4说明)。 enc：加密串
    onPointEnd: function (event, data, enc) {

    },
    //切换线路时触发 even：t事件源对象，当前播放器。 lineIndex： 线路索引号
    onChangeLine: function (event, lineIndex) {

    },
    //视频播放到完成(到结尾位置)时触发. event：事件源对象，当前播放器 .index ：当前切换的视频在播放列表中的位置(从0开始)。 data：当前视频的信息(数据格式参看1.2说明)。enc：加密串
    onEnd: function (event, index, data, enc) {
      me.sendLog('end', me.getPlaySecond());
    },
    //视频开始播放(处于已播放状态)时触发。 event：事件源对象，当前播放器 index ：当前切换的视频在播放列表中的位置(从0开始)。 data：当前视频的信息(数据格式参看1.2说明)。
    onStart: function (event, index, data) {
      me.sendLog('start', me.getPlaySecond());
    },
    //开始下载时调用如果返回true表示该视频可以下载，false 表示不允许下载。 event ：事件源，当前播放器对象。
    onDownload: function (event) {

    },
    //播放器正在播放视频时，按指定的频率触发(默认每秒触发一次)。 event ： 事件源，当前播放器对象。 proTime ：表示播放的秒数(数字型，带小数点)。proSize ：表示已播放的大小(数字型，不带小数点)。 data：当前视频的信息(数据格式参看1.2说明)。 enc：加密串
    onPlayProgress: function (event, proTime, proSize, data, enc) {
      if (me.getPlayState() != 2) {
        me.sendLog('interval', me.getPlaySecond());
      }
    },
    //向后台发送播放进度成功时触发。 event：事件源。 data：服务器返回的结果。
    onSendProgressSuccess: function (event, data) {

    },
    //向后台发送播放进度发生错误时触发。 event：事件源。 data：服务器返回的结果。
    onSendProgressError: function (event, data) {

    },
    //向后台发送播放器发生错误时触发。 event：事件源。 data：错误的信息（包括类型，内容）。
    onError: function (event, data) {

    },
    //单击右侧定制按钮时触发事件。event：事件源。data：按钮信息。
    onRightIconClick: function (event, data) {

    },
    //拖拽播放进度条时触发。 event：事件源。
    onMovieDrag: function (event, sSecond, eSecond, data) {
      me.sendLog('drag', sSecond + '-' + eSecond);
    },
    //点击播放时触发事件
    onPlay: function (event, proTime) {
      me.sendLog('play', proTime);
    },
    //点击暂停时触发事件
    onPause: function (event, proTime) {
      me.sendLog('pause', proTime);
      me.playMovie();
    },
    //答题错误时触发。
    onAnswerWrong: function (event, data) {
      if (data) {
        var eventid = data.resourceId;
        var setting = parent.AttachmentSetting;
        var clazzId = "0";
        if (setting && setting.defaults && setting.defaults.clazzId) {
          clazzId = setting.defaults.clazzId;
        }
        $.ajax({
          type: "GET",
          url: "/question/addquestionerror",
          data: {
            memberinfo: data.memberinfo,
            eventid: eventid,
            answerContent: data.answer,
            classid: clazzId
          },
          dataType: "json",
          success: function (data) {
          }
        });

        if (data.errorBackTime) { //如果设置了首次回答错误强退5分钟

          var second = 0;

          try {
            second = parseInt(data.errorBackTime);
            second = second * 60;
          } catch (e) {
          }

          if (second) {
            var goSecond = me.getPlaySecond() - second;
            goSecond = goSecond > 0 ? goSecond : 1;
            me.goPlay(0, goSecond);
          }
        }
      }
    },
    //答题正确时触发。
    onAnswerRight: function (event, data) {
    },
    sendlogzt: function (event, url) {
      var userId = me.data.userid || '';
      $.ajax({
        type: 'GET',
        url: 'http://data.xxt.aichaoxing.com/analysis/datalog?' + url + '&u=' + userId,
        success: function (data, textStatus) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
      });
    },
    getdanmu: function (event, timeBegin, timeEnd) {
      if (me.data.clazzId && me.data.courseid && me.data.mid) {
        var type = "get";
        var url = "/videodanmaku/timerange-danmakulist";
        var param = {
          "courseid": me.data.courseid,
          "classid": me.data.clazzId,
          "mid": me.data.mid,
          "timebegin": parseInt(timeBegin),
          "timeend": parseInt(timeEnd) - 1
        };
        $.ajax({
          type: type,
          url: url,
          data: param,
          dataType: 'json',
          success: function (result) {
            if (result.status == 1) {
              me.sendDanmu(JSON.stringify(result.data));
            } else {
              alert("服务异常,稍后再试!");
            }
          },
          error: function () {
            var result = {};
            result.status = 0;
            result.msg = "服务异常,稍后再试.";
            alert("服务异常,稍后再试!");
          }
        });
      }
    },
    logFunc: function (event, url) {
      var setting = parent.AttachmentSetting;
      var isFiled = setting.defaults.isFiled;
      var state = setting.defaults.state;
      if (isFiled == 1 || state == 1) {
        return;
      }
      ;

      $.ajax({
        type: 'GET',
        url: me.reportUrl + "?" + url,
        dataType: 'json',
        success: function (data, textStatus) {
          me.logCount = 0;
          if (data.isPassed) {
            me.finishJob();
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          me.logCount += 1;
          if (me.logCount >= 1) {
            me.logCount = 0;
            me.pauseMovie();
            if (Math.floor(XMLHttpRequest.status) >= 500) {
              console.log('服务器现在繁忙，不能保证您能否正常完成任务，请您稍后继续...');
            } else {
              console.log('您的网络不稳定，请您稍后继续...');
            }
            window.location.reload();
            //me.sendLog(flag, time);
          }
        }
      });

    }
  };

  config.logParam = {
    isSendLog: (!me.isSendLog || !me.data.clazzId || top.location.pathname.indexOf('teacherstudy') != -1) ? 0 : 1,
    clazzId: me.data.clazzId,
    userid: me.data.userid,
    duration: me.data.duration,
    jobid: me.data.jobid,
    objectId: me.data.objectId,
    otherInfo: me.data.otherInfo,
    dtoken: me.data.dtoken,
    rt: me.data.rt,
    dtype: 'Video',
    clipTime: (me.data.startTime || '0') + '_' + (me.data.endTime || me.data.duration)
  };
  //me.data.danmaku == 1 &&
  if (me.data.danmaku == 1 && me.data.clazzId && me.data.courseid && me.data.mid) {

    //me.data.clazzId, me.data.courseid,me.data.mid,me.danmulist,me.danmuidlist
    $('.praise').hover(function () {
      $(this).find('.aise_top').toggle()
    })

    function pagedanmu(pobj) {
      function resultFormat(a) {
        var hh = parseInt(a / 3600);
        if (hh < 10) hh = "0" + hh;
        var mm = parseInt((a - hh * 3600) / 60);
        if (mm < 10) mm = "0" + mm;
        var ss = parseInt((a - hh * 3600) % 60);
        if (ss < 10) ss = "0" + ss;
        var length = hh + ":" + mm + ":" + ss;
        if (a >= 0) {
          return length;
        } else {
          return "NaN";
        }
      }

      function NumDescSort(a, b) {
        return a.timeline - b.timeline;
      }

      var type = "get";
      var url = "/videodanmaku/timeline-danmakulist";
      var param = {
        "courseid": me.data.courseid,
        "classid": me.data.clazzId,
        "mid": me.data.mid,
        "page": pobj.page
      };
      var _self = this;
      $.ajax({
        type: type,
        url: url,
        data: param,
        dataType: 'json',
        success: function (result) {
          if (pobj.page == 1) {
            $("#danmulist").html("");
            me.danmulist = new Array();
            me.danmuidlist = new Array();
          }
          if (result.data.length == 0) {
            if (pobj.page == 1) {
              $("#danmulist").html('<li><a class="content">暂无弹幕</a></li>');
            }
          } else {
            for (var i = 0; i < result.data.length; i++) {
              if (me.danmuidlist.indexOf(result.data[i].id) != -1) {
                continue;
              }
              me.danmulist.push(result.data[i]);
              me.danmuidlist.push(result.data[i].id);
            }
            me.danmulist.sort(NumDescSort);
            var str = ""
            for (var j = 0; j < me.danmulist.length; j++) {
              var d = me.danmulist[j];
              if (d.content == "@zan@") {
                d.content = "点赞";
              } else if (d.content.substring(0, 1) == "@" && d.content.substring(d.content.length - 1, d.content.length) == "@") {
                d.content = d.content.replace(/@/g, "");
              }
              str = str + '<li>' +
                '<a class="bar_ico_02 icons" href="javascript:void(0)" danmuid="' + d.id + '"></a>' +
                (d.selfrelease ? '<a class="bar_ico_01 icons" href="javascript:void(0)" danmuid="' + d.id + '"></a>' : '') +
                '<a class="content" href="javascript:void(0)" t="' + d.timeline + '">' + resultFormat(d.timeline) + " " + d.content + '</a>' +
                '</li>';
            }
            $("#danmulist").html(str);
            pobj.page = pageobj.page + 1;
            pobj.complete = 0;
          }
        },
        error: function () {
          var result = {};
          result.status = 0;
          result.msg = "服务异常,稍后再试.";
          alert("服务异常,稍后再试!");
        }
      });
    }


    var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
    var nScrollTop = 0;   //滚动到的当前位置
    var nDivHight = $("#boxscroll").height();
    var pageobj = {};
    pageobj.page = 1;
    pageobj.complete = 0;
    $(".rage_list li a").limit();
    $("#boxscroll").niceScroll({cursorborder: "", cursorcolor: "#000"});//滚动条颜色
    $("#boxscroll").scroll(function () {
      nScrollHight = $(this)[0].scrollHeight;
      nScrollTop = $(this)[0].scrollTop;
      if (nScrollTop + nDivHight + 10 >= nScrollHight) {
        if (pageobj.complete == 0) {
          pageobj.complete = 1;
          pagedanmu(pageobj);
        }
      }
    });
    ;
    $("#delete").click(function () {
      $(".rage_list").css('display', 'none');
    })
    $(".article").click(function () {
      if ($(".rage_list").css('display') == "none") {
        pageobj.page = 1;
        pagedanmu(pageobj)
        $(".rage_list").css('display', 'block');
      } else {
        $("#danmulist").html("");
        $(".rage_list").css('display', 'none');
      }
    });
    $("#danmulist").on("click", ".content", function (event) {
      me.dragMovie($(this).attr("t"));
    });
    $("#danmulist").on("click", ".bar_ico_02", function (event) {
      var type = "get";
      var url = "/videodanmaku/report-danmaku";
      var param = {
        "id": $(this).attr("danmuid"),
        "classid": me.data.clazzId
      };
      $.ajax({
        type: type,
        url: url,
        data: param,
        dataType: 'json',
        success: function (result) {
          if (result.status == 1) {
            alert("举报成功")
          } else {
            alert(result.msg)
          }

        },
        error: function () {
          var result = {};
          result.status = 0;
          result.msg = "服务异常,稍后再试.";
          callBackAction && callBackAction(result);
          timeInterval && clearInterval(interval);
        }
      });
    });

    $("#danmulist").on("click", ".bar_ico_01", function (event) {
      var currentme = this;
      var type = "get";
      var url = "/videodanmaku/delete";
      var param = {
        "id": $(this).attr("danmuid"),
        "classid": me.data.clazzId
      };
      $.ajax({
        type: type,
        url: url,
        data: param,
        dataType: 'json',
        success: function (result) {
          if (result.status == 1) {
            $(currentme).parent().remove();
            alert("已撤销")
          } else {
            alert(result.msg)
          }

        },
        error: function () {
          var result = {};
          result.status = 0;
          result.msg = "服务异常,稍后再试.";
          callBackAction && callBackAction(result);
          timeInterval && clearInterval(interval);
        }
      });

    });
    $('.bar_bnt').click(function () {
      $(this).toggleClass('bar_current');
      if ($(this).hasClass('bar_current')) {
        me.danmuState(1);
      } else {
        me.danmuState(0);
      }
    })

    $(".aise_top li").click(function () {
      sendimg(this.getAttribute("value"));
    })
    $(".zan").click(function () {
      sendimg('@zan@');
    });

    function sendimg(content) {

      if ($('.bar_bnt').hasClass('bar_current')) {
        me.sendDanmu(JSON.stringify([{
          "createUserId": 1,
          "timeline": parseInt(me.getPlaySecond()),
          "id": 1,
          "content": content
        }]));
      }
      var type = "post";
      var url = "/videodanmaku/release";
      var param = {
        "courseid": me.data.courseid,
        "classid": me.data.clazzId,
        "mid": me.data.mid,
        "content": content,
        "timeline": parseInt(me.getPlaySecond())
      };
      $.ajax({
        type: type,
        url: url,
        data: param,
        dataType: 'json',
        success: function (result) {
          if (result.status == 1) {
            $("#barragetext").val("");
          } else {
            alert(result.msg);
          }

        },
        error: function () {
          var result = {};
          result.status = 0;
          result.msg = "服务异常,稍后再试.";
          alert("服务异常,稍后再试!");
        }
      });

    }

    $("#sendbarrage").click(function () {
      if ($("#barragetext").val() == "") {
        alert("弹幕不能为空");
        return;
      } else {
        if ($('.bar_bnt').hasClass('bar_current')) {
          me.sendDanmu(JSON.stringify([{
            "createUserId": 1,
            "timeline": parseInt(me.getPlaySecond()),
            "id": 1,
            "content": $("#barragetext").val()
          }]));
        }
        var type = "post";
        var url = "/videodanmaku/release";
        var param = {
          "courseid": me.data.courseid,
          "classid": me.data.clazzId,
          "mid": me.data.mid,
          "content": $("#barragetext").val(),
          "timeline": parseInt(me.getPlaySecond())
        };
        $.ajax({
          type: type,
          url: url,
          data: param,
          dataType: 'json',
          success: function (result) {
            if (result.status == 1) {
              $("#barragetext").val("");
            } else {
              alert(result.msg);
            }

          },
          error: function () {
            var result = {};
            result.status = 0;
            result.msg = "服务异常,稍后再试.";
            alert("服务异常,稍后再试!");
          }
        });
      }
    });
  }


  if (top.dtype == "ZT" || top.dtype == "HB" || top.dtype == "MAG") {
    config.datas.intervalTime = 5000;

    config.logParam.clazzId = me.GetQueryString('courseId');
    config.logParam.chapterId = me.GetQueryString('knowledgeId');
    if (me.GetQueryString('knowledgeId') == null) {
      config.logParam.chapterId = me.GetQueryString('chapterId');
    }
  }
  config.enableSwitchWindow = me.data.enableSwitchWindow;
  if (!config.logParam.isSendLog) {
    config.enableSwitchWindow = 1;
  }
  config.enableSwitchWindow = 1;
  me.config = config;

  me.player = $('#' + me.render).cxplayer(config);

  me.switchWindow(config.enableSwitchWindow == 1);
};

/**
 * 获取播放器的配置信息
 */
MoocPlayer.prototype.getConfig = function () {
  return this.config;
};

/**
 * 设置播放器配置
 */
MoocPlayer.prototype.setConfig = function () {
  var me = this;

  if (arguments.length == 1) {
    me.config = arguments[0];
  } else if (arguments.length == 2) {
    me.config[arguments[0]] = arguments[1];
  }

  return me;
};

/**
 * 设置是否发送log日志
 *
 * @param bSendLog
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.setSendLog = function (bSendLog) {
  this.isSendLog = bSendLog;
  return this;
};
MoocPlayer.prototype.GetQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = top.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
/**
 * 防止窗口切换
 *
 * @param bSwitchWindow
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.switchWindow = function (bSwitchWindow) {
  var me = this;

  function focus(event) {
    event = event || window.event;
    setTimeout(function () {
      me.firstClick && me.playMovie();
      me.firstClick = true;
    }, 0);
    event.stopPropagation && event.stopPropagation();
    event.cancelBubble = true;
  }

  function blur(event) {
    event = event || window.event;
    try {
      me.pauseMovie();
    }
    catch (err) {
      console.log("pauseMovie is not a function");
    }
    event.stopPropagation && event.stopPropagation();
    event.cancelBubble = true;
  }
  if (!bSwitchWindow) {
    if (document.all) {
      //top.document.onfocusin =  focus;
      top.document.onfocusout = blur;
    } else {
      //top.onfocus = window.onfocus = focus;
      top.onblur = window.onblur = blur;
    }
  } else {
    if (document.all) {
      top.document.onfocusin = null;
      top.document.onfocusout = null;
    } else {
      top.onfocus = window.onfocus = null;
      top.onblur = window.onblur = null;
    }
  }

  return this;
};

/**
 * 指定播放器对象ID，默认生成一个六位随机数。
 */
MoocPlayer.prototype.playerId = function () {
  return this.player.playerId();
};


//MoocPlayer.prototype.pagedanmu = function(pageobj,clazzId,courseid,mid,list,idlist) {
//	
//
//}


/**
 * 交互弹幕信息。
 */
MoocPlayer.prototype.sendDanmu = function (danmu) {
  return this.player.sendDanmu(danmu);
};
/**
 * 弹幕开关。
 */
MoocPlayer.prototype.danmuState = function (state) {
  return this.player.danmuState(state);
};
/**
 * 指定播放器宽度。
 *
 * @param width
 * @returns
 */
MoocPlayer.prototype.setWidth = function (width) {
  this.player.width(width);
  return this;
};

/**
 * 指定播放器高度
 *
 * @param height
 * @returns
 */
MoocPlayer.prototype.setHeight = function (height) {
  this.player.height(width);
  return this;
};

/**
 * 指定播放器flash文件路径。  "player.swf"
 *
 * @param player flash组件(字符串)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.player = function (player) {
  this.player.player(player);
  return this;
};

/**
 * 获取播放器的状态
 *
 * @returns 1视频正在播放、2视频暂停、3视频挂起、4视频停止
 */
MoocPlayer.prototype.getPlayState = function () {
  return this.player.getPlayState();
};

/**
 * 指定视频提供来源，有三种方式rtmp,local,default  “default”
 *
 * @param provider 视频源(字符串)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.provider = function (provider) {
  this.player.provider(provider);
  return this;
};

/**
 * 定预载数据(数据格式参看1.1.1说明)
 *
 * @param datas 预载数据
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.datas = function (datas) {
  this.player.datas(datas);
  return this;
};

/**
 * 指定播放器皮肤(数据格式参看1.8说明)
 *
 * @param skin 皮肤(object对象)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.skin = function (skin) {
  this.player.skin(skin);
  return this;
};

/**
 * 设定事件对象(数据格式参看1.13说明)
 *
 * @param events 事件(object对象)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.events = function (events) {
  this.player.events(events);
  return this;
};

/**
 * 获得播放器实例。
 *
 * @param 无
 * @returns Object
 */
MoocPlayer.prototype.getInstance = function () {
  return this.player.getInstance();
};

/**
 * 获得播放器实例(解决兼容问题)。
 *
 * @param 无
 * @returns Object
 */
MoocPlayer.prototype.getPlayer = function () {
  return this.player.getPlayer();
};

/**
 * 获取当前播放时间(单位：秒)。
 *
 * @param 无
 * @returns playSecond(类型float，单位：秒)
 */
MoocPlayer.prototype.getPlaySecond = function () {
  return this.player.getPlaySecond();
};

/**
 * 获取当前已播放的大小(byte)。
 *
 * @param 无
 * @returns playSize(类型long，单位：byte)
 */
MoocPlayer.prototype.getPlaySize = function () {
  return this.player.getPlaySize();
};
/**
 * 视频从哪一秒播放
 */
MoocPlayer.prototype.dragMovie = function (time) {
  return this.player.dragMovie(time);
};
/**
 * 获取视频总时长(秒)
 *
 * @param 无
 * @returns totalSecond(类型float，单位：秒)
 */
MoocPlayer.prototype.getTotalSecond = function () {
  return this.player.getTotalSecond();
};

/**
 * 获得播放列表。
 *
 * @param 无
 * @returns [] 播放列表
 */
MoocPlayer.prototype.getPlayList = function () {
  return this.player.getPlayList();
};

/**
 * 获得播放列表。
 *
 * @param content字幕内容(格式见1.5外挂字幕格式说明)。
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.setSubtitle = function (content) {
  this.player.setSubtitle(content);
  return this;
};

/**
 * 切换播放集数。 index为当前切换的视频在播放列表中的位置(从0开始) toTime 指定时间(单位,秒)
 *
 * @param index(数字)
 * @param toTime(数字型)  切换播放集数。
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.goPlay = function (index, toTime) {
  this.player.goPlay(index, toTime);
  return this;
};

/**
 * 手动设置videoUrls并播放。 videoUrls格式为 ["url_1","url_2","url_3"]
 *
 * @param videoUrls(字符串)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.goPlayForUrls = function (videoUrls) {
  this.player.goPlayForUrls(videoUrls);
  return this;
};

/**
 * 当播放器正在播放时，执行暂停操作。
 *
 * @param 无
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.pauseMovie = function () {
  try {
    this.player.pauseMovie();
    return this;
  }
  catch (err) {
    console.log("pauseMovie is not a function");
  }

};

/**
 * 当播放器暂停时，执行播放操作。
 *
 * @param 无
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.playMovie = function () {
  this.player.playMovie();
  return this;
};

/**
 * 执行快进、快退。 isFor 为true表示快进;false表示快退。
 *
 * @param isFor(布尔型)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.fastFor = function (isFor) {
  this.player.fastFor(isFor);
  return this;
};

/**
 * 执行音量加、减。isAdd 设置为true表示加音量，false表示减音量。
 *
 * @param isAdd(布尔型)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.addVolNum = function (isAdd) {
  this.player.addVolNum(isAdd);
  return this;
};

/**
 * 执行开灯、关灯切换。isOff设置为true 表示关灯，false表示开灯
 *
 * @param isOff(布尔型)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.turnOff = function (isOff) {
  this.player.turnOff(isOff);
  return this;
};

/**
 * 刷新播放列表。
 *
 * @param 无
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.reloadPlayList = function () {
  this.player.reloadPlayList();
  return this;
};

/**
 * 向指定地址发送进度。url记录进度的地址，param  url所带参数，enc加密串。
 *
 * @param url(字符串)
 * @param param(Object)
 * @param enc(字符串)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.sendProgress = function (url, param, enc) {
  this.player.sendProgress(url, param, enc);
  return this;
};

/**
 * 换肤所修改的配置。
 *
 * @param param(Object)
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.refreshSkin = function (param) {
  this.player.refreshSkin(url, param, enc);
  return this;
};

/**
 * 完成任务
 *
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.finishJob = function () {
  var me = this;
  proxy_completed && proxy_completed();
  window.parent.parent.finishJob && window.parent.parent.finishJob();
  return me;
};

/**
 * 发送log日志(只允许学生端学习页面)
 *
 * @returns {MoocPlayer}
 */
MoocPlayer.prototype.sendLog = function (flag, time) {
};
