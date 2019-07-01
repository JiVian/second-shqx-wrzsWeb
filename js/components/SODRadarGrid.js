define(function (require) {
  var d3 = require('d3');

  function SODRadarGrid(option) {
    this.width = option.width || 0;
    this.height = option.height || 0;

    this.top = option.top || 0;
    this.bottom = option.bottom || 0;
    this.left = option.left || 0;
    this.right = option.right || 0;

    this.xAxisData = option.xAxisData || [];

    this.dataSet = [];
    this.chart = d3.select(option.el)
      .append('svg')
      .attr('height', this.height)
      .attr('width', this.width);

    this.xAxis = this.chart
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', 'translate(' + this.left + ',' + (this.height - this.bottom) + ')')
    this.yAxis = this.chart
      .append('g')
      .attr('class', 'yAxis')
      .attr('transform', 'translate(' + (this.left - 10) + ',' + this.top + ')')
  }

  SODRadarGrid.prototype._drawAxis = function () {
    this.xAxis.call(d3.axisBottom(this._XAxisScale1()));
    this.yAxis.call(d3.axisLeft(this._YAxisScale()));
  };

  SODRadarGrid.prototype._XAxisScale = function () {
    // utc时间
    return d3.scaleBand()
      .paddingInner(0)
      .paddingOuter(0)
      .domain((function () {
        var arr = [];
        for (var i = 0; i < 24; i++) {
          arr.push(i)
        }
        return arr;
      })())
      .range([0, this.width - this.left - this.right])
  };
  SODRadarGrid.prototype._XAxisScale1 = function () {
    // utc时间
    return d3.scaleBand()
      .paddingInner(0)
      .paddingOuter(0)
      .domain(this.xAxisData)
      .range([0, this.width - this.left - this.right])
  };
  SODRadarGrid.prototype._XAxisInnerScale = function () {
    // 内部标尺
    return d3.scaleBand()
      .paddingInner(0.2)
      .paddingOuter(0.8)
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      .range([0, (this.width - this.left - this.right) / 24])
  };
  SODRadarGrid.prototype._YAxisScale = function () {
    // 类目轴
    var yAxisTicks = d3.map(this.dataSet, function (d) {
      return d.id;
    }).keys();

    return d3.scaleBand()
      .paddingInner(0.3)
      .paddingOuter(0)
      .domain(yAxisTicks)
      .range([0, this.height - this.top - this.bottom]);
  };

  SODRadarGrid.prototype._renderRect = function (selection) {
    var XAxisScale = this._XAxisScale();
    var XAxisInnerScale = this._XAxisInnerScale();
    var YAxisScale = this._YAxisScale();
    return selection
      .attr('width', XAxisInnerScale.bandwidth())
      .attr('height', function () {
        return YAxisScale.bandwidth();
      })
      .attr('fill', function (d, i) {
      	if(d.state === 0){//正常
      		return '#005eb6';
      	}else if(d.state === 1){//故障
      		return '#ff7900';
      	}else if(d.state === 2){//没数据
      		return 'grey';
      	}else if(d.state === 3){//停机
      		return 'grey';
      	}
        return '#005eb6';
        // return i === 1 ? '#15a4ff' : '#005eb6';
      })
  };

  SODRadarGrid.prototype._enter = function (selections) {
    var self = this;
    var XAxisScale = this._XAxisScale();
    var XAxisInnerScale = this._XAxisInnerScale();
    var YAxisScale = this._YAxisScale();

    var gEnter = selections
      .append('g')
      .attr('class', 'rectWrapper')
      .attr('transform', function (d) {
        return 'translate(' + (self.left + XAxisScale(Math.floor(d.time / 10)) + XAxisInnerScale(d.time % 10)) + ',' + (self.top + YAxisScale(d.id)) + ')'
      });

    gEnter
      .selectAll('rect')
      .data(function (d) {
        return d.child
      })
      .enter()
      .append('rect')
      .call(this._renderRect.bind(this));
  };
  SODRadarGrid.prototype._update = function (selections) {
    var self = this;
    var XAxisScale = this._XAxisScale();
    var XAxisInnerScale = this._XAxisInnerScale();
    var YAxisScale = this._YAxisScale();

    selections
      .attr('transform', function (d) {
        return 'translate(' + (self.left + XAxisScale(Math.floor(d.time / 10)) + XAxisInnerScale(d.time % 10)) + ',' + (self.top + YAxisScale(d.id)) + ')'
      });

    //画矩形
    selections
      .selectAll('rect')
      .data(function (d) {
        return d.child
      })
      .call(this._renderRect.bind(this));
  };
  SODRadarGrid.prototype._exit = function (selections) {
    selections.remove()
  };

  SODRadarGrid.prototype.update = function (data) {
    this.dataSet = data;

    this._drawAxis();

    var boxes = this.chart
      .selectAll('.rectWrapper')
      .data(this.dataSet);
    var boxesEnter = boxes.enter();
    var boxesExit = boxes.exit();

    // 进入
    this._enter(boxesEnter);

    // 更新
    this._update(boxes);

    // 退出
    this._exit(boxesExit)

  };

  return SODRadarGrid;
})