(function(g) {
  function q(v, A) {
    var z = (v & 65535) + (A & 65535);
    var w = (v >> 16) + (A >> 16) + (z >> 16);
    return (w << 16) | (z & 65535);
  }
  function p(v, w) {
    return (v << w) | (v >>> (32 - w));
  }
  function k(B, y, w, v, A, z) {
    return q(p(q(q(y, B), q(v, z)), A), w);
  }
  function a(y, w, C, B, v, A, z) {
    return k((w & C) | (~w & B), y, w, v, A, z);
  }
  function h(y, w, C, B, v, A, z) {
    return k((w & B) | (C & ~B), y, w, v, A, z);
  }
  function n(y, w, C, B, v, A, z) {
    return k(w ^ C ^ B, y, w, v, A, z);
  }
  function t(y, w, C, B, v, A, z) {
    return k(C ^ (w | ~B), y, w, v, A, z);
  }
  function c(G, B) {
    G[B >> 5] |= 128 << B % 32;
    G[(((B + 64) >>> 9) << 4) + 14] = B;
    var y;
    var A;
    var z;
    var w;
    var v;
    var F = 1732584193;
    var E = -271733879;
    var D = -1732584194;
    var C = 271733878;
    for (y = 0; y < G.length; y += 16) {
      A = F;
      z = E;
      w = D;
      v = C;
      F = a(F, E, D, C, G[y], 7, -680876936);
      C = a(C, F, E, D, G[y + 1], 12, -389564586);
      D = a(D, C, F, E, G[y + 2], 17, 606105819);
      E = a(E, D, C, F, G[y + 3], 22, -1044525330);
      F = a(F, E, D, C, G[y + 4], 7, -176418897);
      C = a(C, F, E, D, G[y + 5], 12, 1200080426);
      D = a(D, C, F, E, G[y + 6], 17, -1473231341);
      E = a(E, D, C, F, G[y + 7], 22, -45705983);
      F = a(F, E, D, C, G[y + 8], 7, 1770035416);
      C = a(C, F, E, D, G[y + 9], 12, -1958414417);
      D = a(D, C, F, E, G[y + 10], 17, -42063);
      E = a(E, D, C, F, G[y + 11], 22, -1990404162);
      F = a(F, E, D, C, G[y + 12], 7, 1804603682);
      C = a(C, F, E, D, G[y + 13], 12, -40341101);
      D = a(D, C, F, E, G[y + 14], 17, -1502002290);
      E = a(E, D, C, F, G[y + 15], 22, 1236535329);
      F = h(F, E, D, C, G[y + 1], 5, -165796510);
      C = h(C, F, E, D, G[y + 6], 9, -1069501632);
      D = h(D, C, F, E, G[y + 11], 14, 643717713);
      E = h(E, D, C, F, G[y], 20, -373897302);
      F = h(F, E, D, C, G[y + 5], 5, -701558691);
      C = h(C, F, E, D, G[y + 10], 9, 38016083);
      D = h(D, C, F, E, G[y + 15], 14, -660478335);
      E = h(E, D, C, F, G[y + 4], 20, -405537848);
      F = h(F, E, D, C, G[y + 9], 5, 568446438);
      C = h(C, F, E, D, G[y + 14], 9, -1019803690);
      D = h(D, C, F, E, G[y + 3], 14, -187363961);
      E = h(E, D, C, F, G[y + 8], 20, 1163531501);
      F = h(F, E, D, C, G[y + 13], 5, -1444681467);
      C = h(C, F, E, D, G[y + 2], 9, -51403784);
      D = h(D, C, F, E, G[y + 7], 14, 1735328473);
      E = h(E, D, C, F, G[y + 12], 20, -1926607734);
      F = n(F, E, D, C, G[y + 5], 4, -378558);
      C = n(C, F, E, D, G[y + 8], 11, -2022574463);
      D = n(D, C, F, E, G[y + 11], 16, 1839030562);
      E = n(E, D, C, F, G[y + 14], 23, -35309556);
      F = n(F, E, D, C, G[y + 1], 4, -1530992060);
      C = n(C, F, E, D, G[y + 4], 11, 1272893353);
      D = n(D, C, F, E, G[y + 7], 16, -155497632);
      E = n(E, D, C, F, G[y + 10], 23, -1094730640);
      F = n(F, E, D, C, G[y + 13], 4, 681279174);
      C = n(C, F, E, D, G[y], 11, -358537222);
      D = n(D, C, F, E, G[y + 3], 16, -722521979);
      E = n(E, D, C, F, G[y + 6], 23, 76029189);
      F = n(F, E, D, C, G[y + 9], 4, -640364487);
      C = n(C, F, E, D, G[y + 12], 11, -421815835);
      D = n(D, C, F, E, G[y + 15], 16, 530742520);
      E = n(E, D, C, F, G[y + 2], 23, -995338651);
      F = t(F, E, D, C, G[y], 6, -198630844);
      C = t(C, F, E, D, G[y + 7], 10, 1126891415);
      D = t(D, C, F, E, G[y + 14], 15, -1416354905);
      E = t(E, D, C, F, G[y + 5], 21, -57434055);
      F = t(F, E, D, C, G[y + 12], 6, 1700485571);
      C = t(C, F, E, D, G[y + 3], 10, -1894986606);
      D = t(D, C, F, E, G[y + 10], 15, -1051523);
      E = t(E, D, C, F, G[y + 1], 21, -2054922799);
      F = t(F, E, D, C, G[y + 8], 6, 1873313359);
      C = t(C, F, E, D, G[y + 15], 10, -30611744);
      D = t(D, C, F, E, G[y + 6], 15, -1560198380);
      E = t(E, D, C, F, G[y + 13], 21, 1309151649);
      F = t(F, E, D, C, G[y + 4], 6, -145523070);
      C = t(C, F, E, D, G[y + 11], 10, -1120210379);
      D = t(D, C, F, E, G[y + 2], 15, 718787259);
      E = t(E, D, C, F, G[y + 9], 21, -343485551);
      F = q(F, A);
      E = q(E, z);
      D = q(D, w);
      C = q(C, v);
    }
    return [F, E, D, C];
  }
  function o(w) {
    var x;
    var v = "";
    var y = w.length * 32;
    for (x = 0; x < y; x += 8) {
      v += String.fromCharCode((w[x >> 5] >>> x % 32) & 255);
    }
    return v;
  }
  function j(w) {
    var y;
    var v = [];
    v[(w.length >> 2) - 1] = undefined;
    for (y = 0; y < v.length; y += 1) {
      v[y] = 0;
    }
    var x = w.length * 8;
    for (y = 0; y < x; y += 8) {
      v[y >> 5] |= (w.charCodeAt(y / 8) & 255) << y % 32;
    }
    return v;
  }
  function i(v) {
    return o(c(j(v), v.length * 8));
  }
  function u(x, A) {
    var w;
    var z = j(x);
    var v = [];
    var y = [];
    var B;
    v[15] = y[15] = undefined;
    if (z.length > 16) {
      z = c(z, x.length * 8);
    }
    for (w = 0; w < 16; w += 1) {
      v[w] = z[w] ^ 909522486;
      y[w] = z[w] ^ 1549556828;
    }
    B = c(v.concat(j(A)), 512 + A.length * 8);
    return o(c(y.concat(B), 512 + 128));
  }
  function s(z) {
    var y = "0123456789abcdef";
    var w = "";
    var v;
    var A;
    for (A = 0; A < z.length; A += 1) {
      v = z.charCodeAt(A);
      w += y.charAt((v >>> 4) & 15) + y.charAt(v & 15);
    }
    return w;
  }
  function l(v) {
    return unescape(encodeURIComponent(v));
  }
  function e(v) {
    return i(l(v));
  }
  function m(v) {
    return s(e(v));
  }
  function b(v, w) {
    return u(l(v), l(w));
  }
  function r(v, w) {
    return s(b(v, w));
  }
  function f(w, x, v) {
    if (!x) {
      if (!v) {
        return m(w);
      }
      return e(w);
    }
    if (!v) {
      return r(x, w);
    }
    return b(x, w);
  }
  if (typeof define === "function" && define.amd) {
    define(function() {
      return f;
    });
  } else {
    if (typeof module === "object" && module.exports) {
      module.exports = f;
    } else {
      g.md5 = f;
    }
  }
})(this);
Ext.define("ans.VideoJs", {
  videoJs: null,
  mixins: {
    observable: "Ext.util.Observable"
  },
  constructor: function(a) {

    a = a || {};

    document.querySelector(`#${a.videojs}`).setAttribute('muted', 'muted')

    var c = this;
    c.addEvents(["seekstart"]);
    c.mixins.observable.constructor.call(c, a);
    
    var b = videojs(a.videojs, c.params2VideoOpt(a.params), function() {});
    Ext.fly(a.videojs).on("contextmenu", function(f) {
      f.preventDefault();
    });
    Ext.fly(a.videojs).on("keydown", function(f) {
      if (f.keyCode == 37 || f.keyCode == 39) {
        f.preventDefault();
      }
    });
  },
  params2VideoOpt: function(params) {
    var useM3u8 = false;
    var cdn = [
      {
        indexorder: 0,
        label: "公网1",
        url: "http://s1.ananas.chaoxing.com",
        ispublic: true
      },
      {
        indexorder: 1,
        label: "公网2",
        url: "http://s2.ananas.chaoxing.com",
        ispublic: true
      }
    ];
    if (params.cdn) {
      cdn = cdn.concat(params.cdn).sort(function(o1, o2) {
        return o1.indexorder > o2.indexorder;
      });
    }
    function m3u8(objectId, r, cdn) {
      return (
        "http://hls-ans.chaoxing.com/hls/m3u8/" +
        objectId +
        "/" +
        r +
        ".m3u8?cdn=" +
        encodeURIComponent(cdn)
      );
    }
    function makeSource(src, r) {
      var start = src.src.indexOf("/video/"),
        file = src.src.substr(start);
      if (r.ispublic) {
        return useM3u8
          ? {
              src: m3u8(params.objectId, src.resolution, r.url),
              type: "application/x-mpegURL",
              res: src.res
            }
          : {
              src: r.url + file,
              type: "video/mp4",
              res: src.res
            };
      } else {
        return useM3u8
          ? {
              src: m3u8(
                params.objectId,
                src.resolution,
                r.url + "/s1.ananas.chaoxing.com"
              ),
              type: "application/x-mpegURL",
              res: src.res
            }
          : {
              src: r.url + "/s1.ananas.chaoxing.com" + file,
              type: "video/mp4",
              res: src.res
            };
      }
    }
    var sources = [];
    if (!params.rootPath) {
      params.rootPath = "";
    }
    if (params.http) {
      sources.push({
        src: params.http,
        type: "video/mp4",
        label: "标清",
        resolution: "sd",
        res: 360
      });
    }
    if (params.httphd) {
      sources.push({
        src: params.httphd,
        type: "video/mp4",
        label: "高清",
        resolution: "hd",
        res: 720
      });
    }
    if (params.httpshd) {
      sources.push({
        src: params.httpshd,
        type: "video/mp4",
        label: "超高清",
        resolution: "shd",
        res: 1080
      });
    }
    if (params.httpmd) {
      sources.push({
        src: params.httpmd,
        type: "video/mp4",
        label: "极速",
        resolution: "md",
        res: 240
      });
    }
    var logFunc = function(player, url, callback) {
      var me = this;
      if (!me.logCount) {
        me.logCount = 0;
      }
      videojs.xhr(
        {
          uri: url,
          headers: {
            "Content-Type": "application/json"
          }
        },
        function(err, resp) {
          me.logCount++;
          if (resp.statusCode == 200) {
            me.logCount = 0;
            eval("var d=" + resp.body);
            if (d.isPassed) {
              callback();
            }
            return;
          }
          if (me.logCount >= 4) {
            me.logCount = 0;
            player.pause();
            if (resp.statusCode != 0) {
              alert(
                "服务繁忙，不能保证您能否正常完成任务，请您稍后继续...(e: " +
                  resp.statusCode +
                  ")"
              );
            } else {
              alert("您的网络不稳定，请您稍后继续...");
            }
          }
        }
      );
    };
    var sendLog_ = function(player, isdrag, currentTimeSec, callback) {
      if (!params.reportUrl) {
        return;
      }
      var format = "[{0}][{1}][{2}][{3}][{4}][{5}][{6}][{7}]",
        clipTime =
          (params.startTime || "0") + "_" + (params.endTime || params.duration);
      var enc = Ext.String.format(
        format,
        params.clazzId,
        params.userid,
        params.jobid,
        params.objectId,
        currentTimeSec * 1000,
        "d_yHJ!$pdA~5",
        params.duration * 1000,
        clipTime
      );
      var rurl = [
        params.reportUrl,
        "/",
        params.dtoken,
        "?clazzId=",
        params.clazzId,
        "&playingTime=",
        currentTimeSec,
        "&duration=",
        params.duration,
        "&clipTime=",
        clipTime,
        "&objectId=",
        params.objectId,
        "&otherInfo=",
        params.otherInfo,
        "&jobid=",
        params.jobid,
        "&userid=",
        params.userid,
        "&isdrag=",
        isdrag,
        "&view=pc",
        "&enc=",
        md5(enc),
        "&rt=",
        params.rt,
        "&dtype=Video"
      ].join("");
      
      logFunc(player, rurl, callback);
    };
    return {
      language: "zh-CN",
      poster: params.screenshot,
      controls: true,
      preload: "none",
      sources: sources,
      playlines: cdn,
      playbackRates: !!params.enableFastForward ? [1, 1.25, 1.5, 2] : false,
      textTrackDisplay: true,
      controlBar: {
        volumePanel: {
          inline: false
        },
        children: [
          "playToggle",
          "playbackRateMenuButton",
          "currentTimeDisplay",
          "timeDivider",
          "durationDisplay",
          "progressControl",
          "volumePanel",
          "subsCapsButton",
          "fullscreenToggle",
          "videoJsPlayLine",
          "textTrackButton"
        ]
      },
      plugins: {
        videoJsResolutionSwitcher: {
          default: 360,
          dynamicLabel: true,
          customSourcePicker: function(player, sources, label) {
            var r = player.currentPlayline();
            player.src(
              sources.map(function(src) {
                return makeSource(src, r);
              })
            );
            return player;
          }
        },
        videoJsPlayLine: {
          dynamicLabel: true,
          customSourcePicker: function(player, r, label) {
            var src = player.currentResolution().sources[0];
            player.src(makeSource(src, r));
            return player;
          }
        },
        studyControl: {
          enableSwitchWindow: params.enableSwitchWindow
        },
        seekBarControl: {
          headOffset: params.headOffset,
          enableFastForward: params.enableFastForward,
          isSendLog: !!params.jobid,
          reportTimeInterval: params.reportTimeInterval,
          sendLog: function(player, evt, sec) {
            if (this.isSendLog !== true) {
              return;
            }
            var isdrag = 0;
            switch (evt) {
              case "play":
                isdrag = 3;
                break;
              case "pause":
                isdrag = 2;
                break;
              case "ended":
                isdrag = 4;
                break;
            }
            sendLog_(player, isdrag, sec, function() {
              // isPassed 自动播放下一个视频
              window.parent.parent.finishJob && window.parent.parent.finishJob();
              window.proxy_completed && window.proxy_completed();
            });
          }
        },
        timelineObjects: {
          url:
            params.rootPath + "/richvideo/initdatawithviewer?mid=" + params.mid,
          quizErrorReportUrl:
            params.rootPath +
            "/question/addquestionerror?classid=" +
            params.clazzId
        },
        subtitle: {
          subtitleUrl:
            params.rootPath + "/richvideo/subtitle?mid=" + params.mid,
          subtitle: params.subobjectid
            ? "https://cs-ans.chaoxing.com/support/sub/" +
              params.subobjectid +
              ".vtt"
            : false
        }
      }
    };
  }
});
(function() {
  var b = videojs.getPlugin("plugin");
  var a = videojs.extend(b, {
    constructor: function(e, c) {
      b.call(this, e, c);
      var f = this,
        h = c.mouseElTarget,
        g = 1;
      if (c.enableSwitchWindow !== 1) {
        g = 0;
      }
      if (!h) {
        h = window.document;
      }
      Ext.fly(window.document).on("mouseout", function(i) {
        i = i ? i : window.event;
        var j = i.relatedTarget || i.toElement;
        if (!j || j.nodeName == "HTML") {
          if (g != 1) {
            // 解除暂停播放
            // e.pause()
          }
        }
      });
      f.singleton(e);

      e.on("ready", () => {
        setTimeout(() => {
          e.play()
        }, 300);
      })
      e.on("ended", () => {
        window.parent.parent.finishJob && window.parent.parent.finishJob();
      })
    },
    singleton: function(c) {
      var f = this,
        e = parseInt(Math.random() * 9999999);
      c.on("play", function() {
        f.setCookie("videojs_id", e);
      });
      c.setInterval(function() {
        var g = f.getCookie("videojs_id");
        if (g != e) {
          c.pause();
        }
      }, 1000);
    },
    setCookie: function(f, h) {
      var c = arguments,
        k = arguments.length,
        e = k > 2 ? c[2] : null,
        j = k > 3 ? c[3] : "/",
        g = k > 4 ? c[4] : null,
        i = k > 5 ? c[5] : false;
      document.cookie =
        f +
        "=" +
        escape(h) +
        (e === null ? "" : "; expires=" + e.toGMTString()) +
        (j === null ? "" : "; path=" + j) +
        (g === null ? "" : "; domain=" + g) +
        (i === true ? "; secure" : "");
    },
    getCookie: function(g) {
      var e = g + "=",
        k = e.length,
        c = document.cookie.length,
        h = 0,
        f = 0;
      while (h < c) {
        f = h + k;
        if (document.cookie.substring(h, f) == e) {
          return this.getCookieVal(f);
        }
        h = document.cookie.indexOf(" ", h) + 1;
        if (h === 0) {
          break;
        }
      }
      return null;
    },
    getCookieVal: function(e) {
      var c = document.cookie.indexOf(";", e);
      if (c == -1) {
        c = document.cookie.length;
      }
      return unescape(document.cookie.substring(e, c));
    }
  });
  videojs.registerPlugin("studyControl", a);
})();
(function() {
  var a = videojs.getComponent("SeekBar");
  var b = videojs.extend(a, {
    constructor: function(e, c) {
      a.call(this, e, c);
      var f = this;
      e.disableSeek = function(g) {
        f.disableSeek(g);
      };
      e.getSeekBar = function() {
        return f;
      };
      f.on("slideractive", function() {
        e.trigger("seekstart");
      });
      f.on("sliderinactive", function() {
        e.trigger("seekend");
      });
    },
    getCurrentTime_: function() {
      return this.player_.currentTime();
    },
    handleMouseDown: function(c) {
      if (this._disableSeek === true) {
        return;
      }
      a.prototype.handleMouseDown.call(this, c);
    },
    handleMouseMove: function(c) {
      if (this._disableSeek === true) {
        return;
      }
      a.prototype.handleMouseMove.call(this, c);
    },
    handleMouseUp: function(c) {
      if (this._disableSeek === true) {
        return;
      }
      a.prototype.handleMouseUp.call(this, c);
    },
    disableSeek: function(c) {
      var e = this;
      e._disableSeek = c !== false;
      if (e._disableSeek) {
        e.disable();
      } else {
        e.enable();
      }
    }
  });
  videojs.registerComponent("SeekBar", b);
})();
(function() {
  var a = videojs.getPlugin("plugin");
  var b = videojs.extend(a, {
    constructor: function(f, e) {
      a.call(this, f, e);
      var g = this;
      g.isSendLog_ = !!e.isSendLog;
      f.on("ready", function() {
        if (e.enableFastForward != 1) {
          f.disableSeek();
        }
      });
      if (!e.sendLog) {
        e.sendLog = function() {};
      }
      if (e.headOffset) {
        f.currentTime(e.headOffset);
      }
      var j = 0,
        c = e.reportTimeInterval || 60,
        i = c * 1000;
      var h = function(k, l) {
        if (!g.isSendLog_) {
          return;
        }
        var m = g.now_() - j;
        if (m > i || l) {
          e.sendLog(f, k, g.sec_(f));
          j = g.now_();
        }
      };
      f.on("play", function() {
        h("log");
      });
      f.on("seeked", function() {
        if (e.enableFastForward != 1) {
          var k = f.currentTime(),
            l = e.headOffset ? e.headOffset : 0;
          if (k != 0 && k > l) {
            f.currentTime(l);
          }
        }
      });
      f.on("pause", function() {
        h("log");
      });
      f.on("timeupdate", function() {
        if (j == 0) {
          return;
        }
        h("log");
      });
      f.on("ended", function() {
        h("ended", true);
      });
    },
    sec_: function(c) {
      return parseInt(c.currentTime());
    },
    now_: function() {
      return new Date().getTime();
    },
    isSendLog: function(c) {
      if (c) {
        this.isSendLog_ = !!c;
      }
      return this.isSendLog_;
    }
  });
  videojs.registerPlugin("seekBarControl", b);
})();
Ext.define("ans.videojs.TimelineObjectsBg", {
  extend: "Ext.Component",
  cls: "ans-timelineobjectsbg",
  hidden: true
});
Ext.define("ans.videojs.VideoQuiz", {
  extend: "Ext.Component",
  xtype: "videoquiz",
  cls: "ans-videoquiz",
  renderTpl: [
    '<div class="ans-videoquiz-title">[{questionType}] {description}</div>',
    '<ul class="ans-videoquiz-opts">',
    '<tpl for="options">',
    '<li class="ans-videoquiz-opt"><label>',
    '<input type="{[parent.questionType=="多选题"?"checkbox":"radio"]}" name="ans-videoquiz-opt" value="{isRight}">',
    "{name} {description}",
    "</label></li>",
    "</tpl> ",
    "</ul>",
    '<div class="ans-videoquiz-submit">提交</div>'
  ],
  renderSelectors: {
    submitEl: "div.ans-videoquiz-submit"
  },
  afterRender: function() {
    var a = this;
    a.callParent(arguments);
    a.submitEl.on("click", function() {
      if (a.checkResult()) {
        a.fireEvent("continue");
      }
    });
  },
  checkResult: function() {
    var e = this,
      h = Ext.query("input", e.el.dom),
      c = true,
      f = e.renderData,
      a = f.options,
      b = [],
      g = e.quizErrorReportUrl;
    Ext.each(h, function(k, j) {
      if (k.value == "true" && !k.checked) {
        c = false;
        alert("回答有错误");
      }
      if (k.checked) {
        b.push(a[j].name);
      }
    });
    if (!c) {
      Ext.Ajax.request({
        url: g,
        params: {
          eventid: f.resourceId,
          memberinfo: f.memberinfo,
          answerContent: b.join(",")
        },
        method: "get"
      });
      if (e.onerror) {
        e.onerror();
      }
    }
    return c;
  }
});
Ext.define("ans.videojs.VideoImg", {
  extend: "Ext.Img",
  xtype: "videoimg",
  afterRender: function() {
    var a = this;
    a.callParent(arguments);
    a.el.on("click", function() {
      a.fireEvent("continue");
    });
  }
});
Ext.define("ans.videojs.VideoPpt", {
  extend: "Ext.Img",
  xtype: "videoppt",
  cls: "ans-videoppt",
  width: "30%",
  model: false,
  afterRender: function() {
    var a = this;
    a.callParent(arguments);
    a.el.on("click", function() {
      a.el.toggleCls("ans-videoppt-fullscreen");
    });
  }
});
Ext.define("ans.videojs.TimelineObjects", {
  extend: "Ext.container.Container",
  cls: "ans-timelineobjects",
  autoScroll: true,
  hidden: true,
  hideMode: "visibility",
  constructor: function(a) {
    var b = this;
    b.callParent(arguments);
    b.bg = Ext.create("ans.videojs.TimelineObjectsBg", {
      renderTo: a.renderTo
    });
    b.objects = b.sort_(a.objects);
    b.current = 0;
  },
  showObject: function(l, b, e) {
    var i = this,
      g = i.getBox(),
      c = i.items.getAt(0),
      k,
      h = function() {
        k.destroy();
        i.hide();
        l.play();
      };
    if (c != null) {
      c.destroy();
    }
    if (b == "IMG") {
      k = i.add({
        xtype: "videoimg",
        src: e.url.replace(/origin/, g.width + "_" + g.height)
      });
    }
    if (b == "QUIZ") {
      var j = function() {};
      if (e.errorBackTime && e.errorBackTime > 0) {
        var m = e.errorBackTime * 60;
        j = function() {
          var n = Math.max(l.currentTime() - m, 0);
          l.currentTime(n);
          h();
        };
      }
      k = i.add({
        xtype: "videoquiz",
        renderData: e,
        quizErrorReportUrl: i.quizErrorReportUrl,
        onerror: j
      });
    }
    if (b == "PPT") {
      if (e.fp == 0) {
        return;
      }
      var a = e.url;
      a = a.replace(/swfv2\/.*$/, "thumb/" + e.fp + ".png");
      k = i.add({
        xtype: "videoppt",
        src: a
      });
    }
    if (!k) {
      return;
    }
    k.on("continue", function() {
      h();
    });
    var f = !(k.model === false);
    i.showModel(f);
    if (f) {
      l.pause();
    }
  },
  showModel: function(a) {
    var c = this;
    c.show();
    if (a) {
      c.removeCls("ans-timelineobjects-autosize");
      c.setAutoScroll(true);
      c.bg.show();
    } else {
      c.addCls("ans-timelineobjects-autosize");
      c.setAutoScroll(false);
    }
  },
  hide: function() {
    this.callParent(arguments);
    this.bg.hide.apply(this.bg, arguments);
  },
  updateTime: function(a, e) {
    if (this.current >= this.objects.length || a.scrubbing()) {
      return;
    }
    var c = this,
      f = c.objects[c.current],
      b = f.style,
      g = f.datas[0];
      
    // if (e >= g.startTime) {
    //   c.current++;
    //   c.showObject(a, b, g);
    // }
  },
  resetTime: function(b, e) {
    var c = this,
      a;
    for (a = 0; a < c.objects.length; a++) {
      var f = c.objects[a].datas[0].startTime;
      if (e < f) {
        break;
      }
    }
    c.current = a;
  },
  sort_: function(a) {
    return a.sort(function(f, e) {
      var c = f.datas[0].startTime;
      var b = e.datas[0].startTime;
      return c - b;
    });
  }
});
(function() {
  var Plugin = videojs.getPlugin("plugin");
  var TimelineObjects = videojs.extend(Plugin, {
    constructor: function(player, options) {
      Plugin.call(this, player, options);
      if (!options.url) {
        return;
      }
      var me = this;
      Ext.Ajax.request({
        url: options.url,
        success: function(resp) {
          if (resp.status != 200) {
            return;
          }
          eval("var data=" + resp.responseText);
          var timeline = Ext.create("ans.videojs.TimelineObjects", {
            renderTo: player.el_,
            quizErrorReportUrl: options.quizErrorReportUrl,
            objects: data
          });
          player.on("play", function() {
            timeline.resetTime(player, player.currentTime());
          });
          player.on("seekend", function() {
            timeline.resetTime(player, player.currentTime());
          });
          player.on("timeupdate", function() {
            if (!player.paused()) {
              timeline.updateTime(player, player.currentTime());
            }
          });
        }
      });
    }
  });
  videojs.registerPlugin("timelineObjects", TimelineObjects);
})();
(function() {
  var Plugin = videojs.getPlugin("plugin");
  var Subtitle = videojs.extend(Plugin, {
    constructor: function(player, options) {
      Plugin.call(this, player, options);
      var me = this,
        subtitleUrl = options.subtitleUrl,
        subtitle = options.subtitle,
        toVtt = function(srt) {
          var m = srt.match(/support\/(\w+).\w+/);
          if (m) {
            return "https://cs-ans.chaoxing.com/support/sub/" + m[1] + ".vtt";
          }
        },
        addSub = function(name, src, isdefault) {
          player.addRemoteTextTrack(
            {
              kind: "subtitles",
              srclang: "cn",
              label: name,
              src: src,
              default: isdefault
            },
            true
          );
        };
      player.ready(function() {
        if (subtitleUrl) {
          Ext.Ajax.request({
            url: subtitleUrl,
            success: function(resp) {
              if (resp.status != 200) {
                return;
              }
              eval("var subs=" + resp.responseText);
              if (subs.length > 0) {
                Ext.each(subs, function(o) {
                  addSub(o.name, toVtt(o.url), o.selected);
                });
              } else {
                if (subtitle) {
                  addSub("智能字幕", subtitle, true);
                }
              }
              setTimeout(function() {
                var tracks = player.textTracks();
                if (tracks && tracks[0]) {
                  tracks[0].mode = "showing";
                }
              }, 500);
            }
          });
        } else {
          if (subtitle) {
            addSub("智能字幕", subtitle, true);
          }
        }
        var settings = player.textTrackSettings;
        settings.setValues({
          backgroundColor: "#000",
          backgroundOpacity: "0",
          edgeStyle: "uniform"
        });
        settings.updateDisplay();
      });
    }
  });
  videojs.registerPlugin("subtitle", Subtitle);
})();
Ext.define("ans.videojs.ErrorDisplay", {
  extend: "Ext.Component",
  xtype: "vjserrdisplay",
  cls: "ans-vjserrdisplay",
  renderTpl: [
    '<div class="ans-vjserrdisplay-title">{errorMsg}</div>',
    '<ul class="ans-vjserrdisplay-opts">',
    "您可以尝试其他线路: ",
    '<tpl for="playlines">',
    '<li class="ans-vjserrdisplay-opt"><label>',
    '<input type="radio" name="ans-vjserrdisplay-opt" {[xindex-1 === parent.selectedIndex ? "checked disabled":""]}>',
    "{label}",
    "</label></li>",
    "</tpl> ",
    "</ul>"
  ],
  renderSelectors: {
    errorMsgEl: "div.ans-vjserrdisplay-title"
  },
  afterRender: function() {
    var b = this;
    b.callParent(arguments);
    var a = Ext.query("input", b.el.dom);
    Ext.each(a, function(e, c) {
      Ext.fly(e).on("click", function() {
        b.onSelected(c);
      });
    });
  },
  setErrorMsg: function(a) {
    Ext.fly(this.errorMsgEl).setHTML(a);
  }
});
(function() {
  var b = videojs.getComponent("ErrorDisplay");
  var a = videojs.extend(b, {
    constructor: function(e, c) {
      b.call(this, e, c);
    },
    colse: function() {
      b.prototype.colse.call(this);
      if (me.ansErrorDisplay) {
        me.ansErrorDisplay.destroy();
        me.ansErrorDisplay = null;
      }
    },
    fill: function() {
      b.prototype.fill.call(this);
      var g = this,
        i = g.player_,
        h = i.options_.playlines,
        e = Ext.query(".vjs-modal-dialog-content", g.el_)[0];
      if (!i.selectCDN || !h) {
        return;
      }
      if (g.ansErrorDisplay) {
        g.ansErrorDisplay.destroy();
        delete g.ansErrorDisplay;
      }
      var f = i.currentPlayline(),
        c = 0;
      Ext.each(h, function(k, j) {
        if (f == k) {
          c = j;
        }
      });
      g.ansErrorDisplay = Ext.create("ans.videojs.ErrorDisplay", {
        renderTo: g.el_,
        onSelected: function(j) {
          i.selectCDN(j);
          g.close();
        },
        renderData: {
          playlines: h,
          errorMsg: g.content(),
          selectedIndex: c
        }
      });
    }
  });
  videojs.registerComponent("ErrorDisplay", a);
})();
/*! videojs-resolution-switcher - 2015-7-26
* Copyright (c) 2016 Kasper Moskwiak
* Modified by Pierre Kraft
* Licensed under the Apache-2.0 license. */
(function() {
  var a = null;
  if (typeof window.videojs === "undefined" && typeof require === "function") {
    a = require("video.js");
  } else {
    a = window.videojs;
  }
  (function(i, h) {
    var g = {},
      c,
      k = {},
      b = {};
    function f(p, o, n, q) {
      k = {
        label: n,
        sources: o
      };
      if (typeof q === "function") {
        return q(p, o, n);
      }
      p.src(
        o.map(function(r) {
          return {
            src: r.src,
            type: r.type,
            res: r.res
          };
        })
      );
      return p;
    }
    var l = h.getComponent("MenuItem");
    var m = h.extend(l, {
      constructor: function(p, o, q, n) {
        this.onClickListener = q;
        this.label = n;
        l.call(this, p, o);
        this.src = o.src;
        this.on("click", this.onClick);
        this.on("touchstart", this.onClick);
        if (o.initialySelected) {
          this.showAsLabel();
          this.selected(true);
          this.addClass("vjs-selected");
        }
      },
      showAsLabel: function() {
        if (this.label) {
          this.label.innerHTML = this.options_.label;
        }
      },
      onClick: function(q) {
        this.onClickListener(this);
        var p = this.player_.currentTime();
        var n = this.player_.paused();
        this.showAsLabel();
        this.addClass("vjs-selected");
        if (!n) {
          this.player_.bigPlayButton.hide();
        }
        if (
          typeof q !== "function" &&
          typeof this.options_.customSourcePicker === "function"
        ) {
          q = this.options_.customSourcePicker;
        }
        var o = "loadeddata";
        if (
          this.player_.techName_ !== "Youtube" &&
          this.player_.preload() === "none" &&
          this.player_.techName_ !== "Flash"
        ) {
          o = "timeupdate";
        }
        f(this.player_, this.src, this.options_.label, q).one(o, function() {
          this.player_.currentTime(p);
          this.player_.handleTechSeeked_();
          if (!n) {
            this.player_.play();
            this.player_.handleTechSeeked_();
          }
          this.player_.trigger("resolutionchange");
        });
      }
    });
    h.registerComponent("ResolutionMenuItem", m);
    var j = h.getComponent("MenuButton");
    var e = h.extend(j, {
      constructor: function(q, o, r, n) {
        this.sources = o.sources;
        this.label = n;
        this.label.innerHTML = o.initialySelectedLabel;
        j.call(this, q, o, r);
        this.controlText("Quality");
        if (r.dynamicLabel) {
          this.el().appendChild(n);
        } else {
          var p = document.createElement("span");
          h.dom.addClass(p, "vjs-resolution-button-staticlabel");
          this.el().appendChild(p);
        }
      },
      createItems: function() {
        var o = [];
        var q = (this.sources && this.sources.label) || {};
        var p = function(r) {
          o.map(function(s) {
            s.selected(s === r);
            s.removeClass("vjs-selected");
          });
        };
        for (var n in q) {
          if (q.hasOwnProperty(n)) {
            o.push(
              new m(
                this.player_,
                {
                  label: n,
                  src: q[n],
                  initialySelected: n === this.options_.initialySelectedLabel,
                  customSourcePicker: this.options_.customSourcePicker
                },
                p,
                this.label
              )
            );
            b[n] = o[o.length - 1];
          }
        }
        return o;
      }
    });
    c = function(w) {
      var p = h.mergeOptions(g, w),
        u = this,
        t = document.createElement("span"),
        s = {};
      h.dom.addClass(t, "vjs-resolution-button-label");
      u.updateSrc = function(y) {
        if (!y) {
          return u.src();
        }
        if (u.controlBar.resolutionSwitcher) {
          u.controlBar.resolutionSwitcher.dispose();
          delete u.controlBar.resolutionSwitcher;
        }
        y = y.sort(r);
        s = q(y);
        var z = o(s, y);
        var x = new e(
          u,
          {
            sources: s,
            initialySelectedLabel: z.label,
            initialySelectedRes: z.res,
            customSourcePicker: p.customSourcePicker
          },
          p,
          t
        );
        h.dom.addClass(x.el(), "vjs-resolution-button");
        u.controlBar.resolutionSwitcher = u.controlBar.el_.insertBefore(
          x.el_,
          u.controlBar.getChild("fullscreenToggle").el_
        );
        u.controlBar.resolutionSwitcher.dispose = function() {
          this.parentNode.removeChild(this);
        };
        return f(u, z.sources, z.label, p.customSourcePicker);
      };
      u.currentResolution = function(x, y) {
        if (x == null) {
          return k;
        }
        if (b[x] != null) {
          b[x].onClick(y);
        }
        return u;
      };
      u.getGroupedSrc = function() {
        return s;
      };
      function r(y, x) {
        if (!y.res || !x.res) {
          return 0;
        }
        return +x.res - +y.res;
      }
      function q(y) {
        var x = {
          label: {},
          res: {},
          type: {}
        };
        y.map(function(z) {
          n(x, "label", z);
          n(x, "res", z);
          n(x, "type", z);
          v(x, "label", z);
          v(x, "res", z);
          v(x, "type", z);
        });
        return x;
      }
      function n(x, y, z) {
        if (x[y][z[y]] == null) {
          x[y][z[y]] = [];
        }
      }
      function v(x, y, z) {
        x[y][z[y]].push(z);
      }
      function o(z, A) {
        var y = p["default"];
        var x = "";
        if (y === "high") {
          y = A[0].res;
          x = A[0].label;
        } else {
          if (y === "low" || y == null || !z.res[y]) {
            y = A[A.length - 1].res;
            x = A[A.length - 1].label;
          } else {
            if (z.res[y]) {
              x = z.res[y][0].label;
            }
          }
        }
        return {
          res: y,
          label: x,
          sources: z.res[y]
        };
      }
      u.ready(function() {
        if (u.options_.sources.length > 0) {
          u.setTimeout(function() {
            u.updateSrc(u.options_.sources);
          }, 1);
        }
      });
    };
    h.registerPlugin("videoJsResolutionSwitcher", c);
  })(window, a);
})();
(function() {
  (function(i, h) {
    var f = {},
      b,
      g = {},
      a = {};
    function c(o, n, m, p) {
      g = n;
      if (typeof p === "function") {
        return p(o, n, m);
      }
      return o;
    }
    var l = h.getComponent("ResolutionMenuItem");
    var e = h.extend(l, {
      onClick: function(q) {
        this.onClickListener(this);
        var p = this.player_.currentTime();
        var m = this.player_.paused();
        this.showAsLabel();
        this.addClass("vjs-selected");
        if (!m) {
          this.player_.bigPlayButton.hide();
        }
        if (
          typeof q !== "function" &&
          typeof this.options_.customSourcePicker === "function"
        ) {
          q = this.options_.customSourcePicker;
        }
        var o = "loadeddata";
        if (
          this.player_.techName_ !== "Youtube" &&
          this.player_.preload() === "none" &&
          this.player_.techName_ !== "Flash"
        ) {
          o = "timeupdate";
        }
        var n = c(this.player_, this.src, this.options_.label, q);
        if (n) {
          n.one(o, function() {
            this.player_.currentTime(p);
            this.player_.handleTechSeeked_();
            if (!m) {
              this.player_.play();
              this.player_.handleTechSeeked_();
            }
            this.player_.trigger("playlinechange");
          });
        }
      }
    });
    var j = h.getComponent("MenuButton");
    var k = h.extend(j, {
      constructor: function(p, n, q, m) {
        this.playlines = n.playlines;
        this.label = m;
        this.label.innerHTML = n.initialySelectedLabel;
        j.call(this, p, n, q);
        this.controlText("Playline");
        if (q.dynamicLabel) {
          this.el().appendChild(m);
        } else {
          var o = document.createElement("span");
          h.addClass(o, "vjs-resolution-button-staticlabel");
          this.el().appendChild(o);
        }
      },
      createItems: function() {
        var o = [];
        var q = this.playlines || [];
        var p = function(r) {
          o.map(function(s) {
            s.selected(s === r);
            s.removeClass("vjs-selected");
          });
        };
        for (var n = 0; n < q.length; n++) {
          var m = q[n].label;
          o.push(
            new e(
              this.player_,
              {
                label: m,
                src: q[n],
                initialySelected: m === this.options_.initialySelectedLabel,
                customSourcePicker: this.options_.customSourcePicker
              },
              p,
              this.label
            )
          );
          a[m] = o[o.length - 1];
        }
        return o;
      }
    });
    b = function(o) {
      var q = h.mergeOptions(f, o),
        p = this,
        n = document.createElement("span"),
        r = p.options_.playlines;
      h.dom.addClass(n, "vjs-resolution-button-label");
      var m = new k(
        p,
        {
          playlines: r,
          initialySelectedLabel: r[0].label,
          initialySelectedUrl: r[0].url,
          customSourcePicker: q.customSourcePicker
        },
        q,
        n
      );
      h.dom.addClass(m.el(), "vjs-resolution-button");
      h.dom.addClass(m.el(), "vjs-playline-button");
      m.show();
      p.selectCDN = function(s) {
        m.items[s].onClick(q.customSourcePicker);
        p.play();
      };
      if (r.length > 0) {
        g = r[0];
      }
      p.currentPlayline = function() {
        return g;
      };
      p.ready(function() {
        p.controlBar.videoJsPlayLine = p.controlBar.el_.insertBefore(
          m.el_,
          p.controlBar.getChild("fullscreenToggle").el_
        );
        p.controlBar.videoJsPlayLine.dispose = function() {
          this.parentNode.removeChild(this);
        };
      });
    };
    h.registerPlugin("videoJsPlayLine", b);
  })(window, videojs);
})();
