/*Java Graphics*/

function JavaGraphics(canvasID) {
  // 初期化（メイン）
  var JGcanvas = document.getElementById(canvasID);
  if (JGcanvas == null || JGcanvas == undefined) {
    alert(
      "[Error] canvas IDが見つからないため、グラフィックスは利用できません！"
    );
  }
  var JGctx = JGcanvas.getContext("2d");
  var JGcurrentColor = "black";
  var JGmouseEventFunction = null;
  var JGmouseDownEventFunction = null;
  var JGmouseUpEventFunction = null;
  var JGmouseMoveEventFunction = null;
  var JGkeyEventFunction = null;

  this.width = JGcanvas.width;
  this.height = JGcanvas.height;

  this.addEventListener = function (ev, func) {
    if (ev == "click") {
      JGmouseEventFunction = func;
      JGcanvas.addEventListener(ev, onClick, false);
    } else if (ev == "pointerdown" || ev == "mousedown") {
      //"mousedown"){
      JGmouseDownEventFunction = func;
      JGcanvas.addEventListener("pointerdown", onMDown, false);
      //JGcanvas.addEventListener(ev,onMDown,false);
    } else if (ev == "pointerup" || ev == "mouseup") {
      //"mouseup"){
      JGmouseUpEventFunction = func;
      JGcanvas.addEventListener("pointerup", onMUp, false);
      //JGcanvas.addEventListener(ev,onMUp,false);
    } else if (ev == "pointermove" || ev == "mousemove") {
      //"mousemove"){
      JGmouseMoveEventFunction = func;
      JGcanvas.addEventListener("pointermove", onMMove, false);
      //JGcanvas.addEventListener(ev,onMMove,false);
    } else if (ev == "keypress") {
      JGkeyEventFunction = func;
      JGcanvas.addEventListener(ev, onKeypress, false);
    } else if (ev == "keydown") {
      JGkeyEventFunction = func;
      JGcanvas.addEventListener(ev, onKeypress, false);
    }
  };

  function onClick(e) {
    // マウスクリックのイベント処理
    //var mx = e.clientX - JGcanvas.offsetLeft;
    //var my = e.clientY - JGcanvas.offsetTop;
    var mx = e.pageX - JGcanvas.offsetLeft;
    var my = e.pageY - JGcanvas.offsetTop;
    //ctx.clearRect(0,0,200,200); // ウィンドウをクリア
    if (JGmouseEventFunction != null) JGmouseEventFunction(e, mx, my);
  }
  function onMDown(e) {
    // マウスクリックのイベント処理
    //var mx = e.clientX - JGcanvas.offsetLeft;
    //var my = e.clientY - JGcanvas.offsetTop;
    var mx = e.pageX - JGcanvas.offsetLeft;
    var my = e.pageY - JGcanvas.offsetTop;
    //ctx.clearRect(0,0,200,200); // ウィンドウをクリア
    if (JGmouseDownEventFunction != null) JGmouseDownEventFunction(e, mx, my);
  }
  function onMUp(e) {
    // マウスクリックのイベント処理
    //var mx = e.clientX - JGcanvas.offsetLeft;
    //var my = e.clientY - JGcanvas.offsetTop;
    var mx = e.pageX - JGcanvas.offsetLeft;
    var my = e.pageY - JGcanvas.offsetTop;
    //ctx.clearRect(0,0,200,200); // ウィンドウをクリア
    if (JGmouseUpEventFunction != null) JGmouseUpEventFunction(e, mx, my);
  }
  function onMMove(e) {
    // マウスクリックのイベント処理
    //var mx = e.clientX - JGcanvas.offsetLeft;
    //var my = e.clientY - JGcanvas.offsetTop;
    var mx = e.pageX - JGcanvas.offsetLeft;
    var my = e.pageY - JGcanvas.offsetTop;
    //ctx.clearRect(0,0,200,200); // ウィンドウをクリア
    if (JGmouseMoveEventFunction != null) JGmouseMoveEventFunction(e, mx, my);
  }
  function onKeypress(event) {
    // キー押下のイベント処理
    alert("Keypress");
    var theEvent = event ? event : window.event; //ブラウザの違いをチェック
    var keycode;
    var isControl;
    var isShift;
    if (theEvent != null) {
      // Mozilla(Firefox, NN) and Opera
      keycode = theEvent.which;
      isControl =
        typeof theEvent.modifiers == "undefined"
          ? theEvent.ctrlKey
          : theEvent.modifiers & Event.CONTROL_MASK;
      isShift =
        typeof theEvent.modifiers == "undefined"
          ? theEvent.shiftKey
          : theEvent.modifiers & Event.SHIFT_MASK;
      // イベントの上位伝播を防止
      theEvent.preventDefault();
      theEvent.stopPropagation();
    } else {
      // Internet Explorer
      keycode = theEvent.keyCode;
      isControl = theEvent.ctrlKey;
      isShift = theEvent.shiftKey;
      // イベントの上位伝播を防止
      theEvent.returnValue = false;
      theEvent.cancelBubble = true;
    }
    var keychar = String.fromCharCode(keycode).toLowerCase(); //キー入力された文字を取得
    if (isShift) {
      keychar = keychar.toUpperCase();
    }
    alert("key=" + keychar);
    if (JGkeyEventFunction != null)
      JGkeyEventFunction(e, keychar, keycode, isShift, isControl);
  }

  this.focus = function () {
    JGcanvas.focus();
  };

  this.clearCanvas = function () {
    JGctx.clearRect(0, 0, JGcanvas.width, JGcanvas.height);
  };
  this.setColor = function (c) {
    JGcurrentColor = c;
  };
  /*　［色の指定方法］
                （１）setColor("red"); // htmlの色名で指定
                （２）setColor("#rrggbb"); // rr,gg,bbには２桁の１６進数
                （３）setColor("rgb(R,G,B)"); // R,G,B=0〜255の値
                （４）setColor("rgba(R,G,B,A)"); // A=0.0（透明）〜1.0（不透明）
            */
  this.drawLine = function (x1, y1, x2, y2, lw, ld) {
    //2020.11.27  lw:lineWidth, ld:lineDash(0 実践,1 点線[3,3],2 破線[5,5])
    JGctx.beginPath(); // 連続線の開始
    if (ld == 0 || ld == undefined) {
    } else if (ld == 1) {
      JGctx.setLineDash([3, 3]);
    } else {
      JGctx.setLineDash([5, 5]);
    }
    JGctx.moveTo(x1, y1); // 始点座標
    JGctx.lineTo(x2, y2); // 終点座標まで線を引く
    if (lw == undefined) JGctx.lineWidth = 1.0;
    else JGctx.lineWidth = lw;
    JGctx.strokeStyle = JGcurrentColor;
    JGctx.stroke(); // 線を描く
  };
  this.drawRect = function (x, y, w, h, lw, ld) {
    //2020.11.27  lw:lineWidth, ld:lineDash(0 実践,1 点線[3,3],2 破線[5,5])
    JGctx.beginPath();
    if (ld == 0 || ld == undefined) {
    } else if (ld == 1) {
      JGctx.setLineDash([3, 3]);
    } else {
      JGctx.setLineDash([5, 5]);
    }
    if (lw == undefined) JGctx.lineWidth = 1.0;
    else JGctx.lineWidth = lw;
    JGctx.strokeStyle = JGcurrentColor;
    JGctx.strokeRect(x, y, w, h);
  };
  this.fillRect = function (x, y, w, h) {
    JGctx.beginPath();
    JGctx.fillStyle = JGcurrentColor;
    JGctx.fillRect(x, y, w, h);
  };
  this.drawOval = function (x, y, w, h, lw, ld) {
    JGctx.beginPath();
    if (ld == 0 || ld == undefined) {
    } else if (ld == 1) {
      JGctx.setLineDash([3, 3]);
    } else {
      JGctx.setLineDash([5, 5]);
    }
    if (lw == undefined) JGctx.lineWidth = 1.0;
    else JGctx.lineWidth = lw;
    JGctx.strokeStyle = JGcurrentColor;
    JGctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2, false);
    JGctx.stroke();
  };

  this.fillOval = function (x, y, w, h) {
    JGctx.beginPath();
    JGctx.fillStyle = JGcurrentColor;
    JGctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2, false);
    JGctx.fill();
  };

  this.drawArc = function (x, y, w, h, sa, ang, lw, ld) {
    JGctx.beginPath();
    if (ld == 0 || ld == undefined) {
    } else if (ld == 1) {
      JGctx.setLineDash([3, 3]);
    } else {
      JGctx.setLineDash([5, 5]);
    }
    if (lw == undefined) JGctx.lineWidth = 1.0;
    else JGctx.lineWidth = lw;
    JGctx.strokeStyle = JGcurrentColor;
    JGctx.ellipse(
      x + w / 2,
      y + h / 2,
      w / 2,
      h / 2,
      0,
      2 * Math.PI - sa - ang,
      2 * Math.PI - sa,
      false
    );
    JGctx.stroke();
  };

  this.fillArc = function (x, y, w, h, sa, ang) {
    JGctx.beginPath();
    JGctx.moveTo(x + w / 2, y + h / 2);
    JGctx.fillStyle = JGcurrentColor;
    JGctx.ellipse(
      x + w / 2,
      y + h / 2,
      w / 2,
      h / 2,
      0,
      2 * Math.PI - sa - ang,
      2 * Math.PI - sa,
      false
    );
    JGctx.closePath();
    JGctx.fill();
  };

  this.drawString = function (str, x, y) {
    JGctx.beginPath();
    JGctx.font = "11px 'ＭＳ Ｐゴシック'";
    JGctx.fillStyle = JGcurrentColor;
    JGctx.fillText(str, x, y);
  };
  /*    MathTOUCH.drawString = function(ctx,str,x,y,currentFace,currentSize,currentFont,currentColor){
        JGctx.beginPath();
        JGctx.font = currentFace+" "+currentSize+"px '"+currentFont+"'";
        JGctx.fillStyle = JGcurrentColor;
        JGctx.fillText(str,x,y);
    };*/

  this.drawImage = function (img, x, y, w, h) {
    if (w == undefined || h == undefined) JGctx.drawImage(img, x, y);
    else JGctx.drawImage(img, x, y, w, h);
  };
  this.drawPolygon = function (X, Y, n, lw, ld) {
    if (ld == 0 || ld == undefined) {
    } else if (ld == 1) {
      JGctx.setLineDash([3, 3]);
    } else {
      JGctx.setLineDash([5, 5]);
    }
    if (lw == undefined) JGctx.lineWidth = 1.0;
    else JGctx.lineWidth = lw;
    JGctx.strokeStyle = JGcurrentColor;
    if (X.length == 0 || Y.length == 0) return;
    if (!(X.length == Y.length && X.length == n)) {
      alert("Polygon error");
      return;
    }
    JGctx.beginPath(); // 連続線の開始
    JGctx.moveTo(X[0], Y[0]); // 始点座標
    for (var i = 1; i < n; i++) JGctx.lineTo(X[i], Y[i]);
    JGctx.closePath();
    JGctx.stroke();
  };
  this.fillPolygon = function (X, Y, n) {
    if (X.length == 0 || Y.length == 0) return;
    if (!(X.length == Y.length && X.length == n)) {
      alert("Polygon error");
      return;
    }
    JGctx.beginPath(); // 連続線の開始
    JGctx.moveTo(X[0], Y[0]); // 始点座標
    for (var i = 1; i < n; i++) JGctx.lineTo(X[i], Y[i]);
    JGctx.closePath();
    //JGctx.strokeStyle=JGcurrentColor;
    //JGctx.stroke();
    JGctx.fillStyle = JGcurrentColor;
    JGctx.fill(); // 塗りつぶし
  };
  this.arrowLine = function (x1, y1, x2, y2, direction) {
    this.drawLine(x1, y1, x2, y2);
    var sz = 3;
    var X;
    var Y;
    if (direction == 0) {
      X = [x2,x2 - sz,x2 - sz,x2,x2 - sz * 2 - 2,x2 - sz - 2,x2 - sz - 2,x2 - sz * 2 - 2];
      Y = [y2, y2 - sz, y2 + sz, y2, y2, y2 + sz, y2 - sz, y2];
      this.fillPolygon(X, Y, 8);
    } else {
      X = [
        x1,
        x1 + sz,
        x1 + sz,
        x1,
        x1 + sz * 2 + 2,
        x1 + sz + 2,
        x1 + sz + 2,
        x1 + sz * 2 + 2,
      ];
      Y = [y1, y1 + sz, y1 - sz, y1, y1, y1 + sz, y1 - sz, y1];
      this.fillPolygon(X, Y, 8);
    }
  };
}
