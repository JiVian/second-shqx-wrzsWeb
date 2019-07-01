define(function (require) {
  var d3 = require('d3');

  function CMACastGrid(option) {
    this.width = option.width || 0;
    this.height = option.height || 0;

    this.top = option.top || 0;
    this.bottom = option.bottom || 0;
    this.left = option.left || 0;
    this.right = option.right || 0;

    this.paddingInnerX = option.paddingInnerX || 0;
    this.paddingOuterX = option.paddingOuterX || 0;
    this.paddingInnerY = option.paddingInnerY || 0;
    this.paddingOuterY = option.paddingOuterY || 0;

    this.xAxisData = [];

    this.dataSet = [];
    this.chart = d3.select(option.el)
      .append('svg')
      .attr('height', this.height)
      .attr('width', this.width);

      this.xAxis = this.chart
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', 'translate(' + this.left + ',' + (this.height - this.bottom) + ')');

      this.yAxis = this.chart
      .append('g')
      .attr('class', 'yAxis')
      .attr('transform', 'translate(' + this.left + ',' + this.top + ')');
  }

  CMACastGrid.prototype._drawAxix = function () {
    this.xAxis.call(d3.axisBottom(this._XAxisScale()));
    this.yAxis.call(d3.axisLeft(this._YAxisScale()));
  };

  CMACastGrid.prototype._XAxisScale = function () {
    // utc时间
    return d3.scaleBand()
      .paddingInner(this.paddingInnerX)
      .paddingOuter(this.paddingOuterX)
      .domain(this.xAxisData)
      .range([0, this.width - this.left - this.right])
      .round(true);
  }
  CMACastGrid.prototype._YAxisScale = function () {
    // 类目轴
    var yAxisTicks = d3.map(this.dataSet, function (d) {
      return d.id;
    }).keys();
    return d3.scaleBand()
      .paddingInner(this.paddingInnerY)
      .paddingOuter(this.paddingOuterY)
      .domain(yAxisTicks)
      .range([0, this.height - this.top - this.bottom]);
  };

  CMACastGrid.prototype._renderRect = function (selection) {
    var XAxisScale = this._XAxisScale();
    var YAxisScale = this._YAxisScale();
    return selection
      .attr('width', function(d){
        // return XAxisScale.bandwidth()*d.ratio/100
        return XAxisScale.bandwidth()
      })
      .attr('height', YAxisScale.bandwidth())
      .attr('fill', function (d, i) {
        if (d.state === 'notInTime') {
          return 'rgba(255,255,255,0.5)';
        }
        if (d.state === 'unnormal') {
          return '#ff7900';
        }

        //正常
        return '#005eb6';
      })
  };
  CMACastGrid.prototype._renderText = function (selection) {
    var XAxisScale = this._XAxisScale();
    var YAxisScale = this._YAxisScale();

    return selection
      .text(function (d) {
        return Number(d.ratio).toFixed(1)+'%';
      })
      .attr('fill', '#fff')
      .attr('x',function(d){ // mark
        // var barWidth = XAxisScale.bandwidth() * d.ratio / 100;
        // if(barWidth > 70){
        //   return barWidth
        // } else {
        //   return barWidth + 60
        // }
        return XAxisScale.bandwidth();
      })
      .attr('y',YAxisScale.bandwidth() * 0.5)
      .attr('dx', '-1em')
      .attr('dy', '0.3em')
      .attr('text-anchor', 'end')
      .attr('font-size', 14)
  };

  CMACastGrid.prototype._enter = function (selections) {
    var self = this;
    var XAxisScale = this._XAxisScale();
    var YAxisScale = this._YAxisScale();

    var gEnter = selections
      .append('g')
      .attr('class', 'rectWrapper')
      .attr('transform', function (d) {
        return 'translate(' + (self.left + XAxisScale(d.time)) + ',' + (self.top + YAxisScale(d.id)) + ')'
      });

    gEnter
      .selectAll('rect')
      .data(function (d) {
        return d.child
      })
      .enter()
      .append('rect')
      .call(this._renderRect.bind(this));

    gEnter
      .selectAll('text')
      .data(function (d) {
        return d.child
      })
      .enter()
      .append('text')
      .call(this._renderText.bind(this));
  };
  CMACastGrid.prototype._update = function (selections) {
    var self = this;
    var XAxisScale = this._XAxisScale();
    var YAxisScale = this._YAxisScale();

    selections
      .attr('transform', function (d) {
        return 'translate(' + (self.left + XAxisScale(d.time)) + ',' + (self.top + YAxisScale(d.id)) + ')'
      });

    //画矩形
    selections
      .selectAll('rect')
      .data(function (d) {
        return d.child
      })
      .call(this._renderRect.bind(this));
    //写文字
    selections
      .selectAll('text')
      .data(function (d) {
        return d.child
      })
      .call(this._renderText.bind(this))
  };
  CMACastGrid.prototype._exit = function (selections) {
    selections.remove()
  };

  CMACastGrid.prototype.update = function (data) {
    this.dataSet = data;
    this.xAxisData = [...new Set(data.map(function(item){
      return item.time
    }))]

    this._drawAxix();

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

  return CMACastGrid;
});