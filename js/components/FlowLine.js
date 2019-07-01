define(function (require) {
  var Snap = require('snap');

  function FlowLine(option) {
    if (option.el == '') {
      console.error('option中的el不能为空')
      return;
    }

    this.paper = Snap(option.el);
    this.linesInfo = option.linesInfo || [];
    this.lines = []

    this.init();
  }

  FlowLine.prototype.init = function () {
    for (let item of this.linesInfo) {
      this.lines[item.id] = this._getLine(item);
      this._updateLine(item.id);
    }
  };

  FlowLine.prototype._getLine = function (lineObj) {
    var path = lineObj.path.map(function (item, i, array) {
      if (i < 1) {
        return ['M', item[0], item[1]]
      }

      return Math.abs(array[i - 1][0] - item[0]) > Math.abs(array[i - 1][1] - item[1])
        ? ['H', item[0]]
        : ['V', item[1]];
    });

    var obj = {
      state: 'unnormal'
    };

    obj.line = this.paper.path(path).attr({
      stroke: "#0F2C5E",
      strokeWidth: 2,
      title: lineObj.id,
      fill: 'none'
    });

    obj.subLine = obj.line.clone().attr({
      stroke: "#2598f7",
    });

    obj.timer = null;

    return obj;
  }

  FlowLine.prototype._updateLine = function (id) {
    var lineObj = this.lines[id];
    clearTimeout(lineObj.timer);

    var stepTime = 80;
    var stepLength = 5;
    var to = 0;
    var totalLength = lineObj.line.getTotalLength();
    var subPath = lineObj.line.getSubpath(0, to);

    function loopAnimation() {
      if (to > totalLength) {
        to = 0;
        subPath = lineObj.line.getSubpath(0, to);
        lineObj.subLine.attr({
          path: subPath
        })
      } else {
        to += stepLength;
        subPath = lineObj.line.getSubpath(0, to);
        lineObj.subLine.animate(
          {
            path: subPath
          },
          stepTime,
          mina.linear
        );
      }
      lineObj.timer = setTimeout(loopAnimation, 280)
    }

    if (lineObj.state !== 'normal') {
      lineObj.line.attr({
        stroke: 'red'
      })
      lineObj.subLine.attr({
        opacity: 0
      })
    } else {
      lineObj.line.attr({
        stroke: '#0F2C5E'
      })
      lineObj.subLine.attr({
        opacity: 1
      })
      loopAnimation();
    }
  };

  FlowLine.prototype.update = function (linesState) {
    linesState.forEach((item) => {
      if (this.lines[item.id] && (this.lines[item.id].state != item.state)) {
        this.lines[item.id].state = item.state;
        this._updateLine(item.id);
      }
    });
  };

  return FlowLine;
});