define(function (require) {
  var d3 = require('d3');

  function CTSGrid(option) {
    this.width = option.width || 0;
    this.height = option.height || 0;

    this.top = option.top || 0;
    this.bottom = option.bottom || 0;
    this.left = option.left || 0;
    this.right = option.right || 0;

    this.paddingInnerX = option.paddingInnerX || 0.15;
    this.paddingOuterX = option.paddingOuterX || 0;
    this.paddingInnerY = option.paddingInnerY || 0.4;
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
      .attr('transform', 'translate(' + this.left + ',' + this.top + ')')
  }

  CTSGrid.prototype._drawAxix = function () {
    this.xAxis.call(d3.axisBottom(this._XAxisScale()));
    this.yAxis.call(d3.axisLeft(this._YAxisScale()));
  };

  CTSGrid.prototype._XAxisScale = function () {
    // utc时间
    return d3.scaleBand()
      .paddingInner(this.paddingInnerX)
      .paddingOuter(this.paddingOuterX)
      .domain(this.xAxisData)
      .range([0, this.width - this.left - this.right])
      .round(true);
  };
  CTSGrid.prototype._YAxisScale = function () {
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

  CTSGrid.prototype._renderRect = function (selection) {
    var XAxisScale = this._XAxisScale();
    var YAxisScale = this._YAxisScale();
    return selection
      .attr('width', XAxisScale.bandwidth())
      .attr('height', YAxisScale.bandwidth() * 0.45)
      .attr('y', function (d, i) {
        return YAxisScale.bandwidth() * 0.55 * i
      })
      .attr('fill', function (d, i) {
        if (d.state === 'outOfPlan') {
          return '#011230';
        }

        if (d.state === 'notInTime') {
          return i === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)';
        }
        if (d.state === 'unnormal') {
          return '#ff7900';
        }

        return i === 'normal' ? '#15a4ff' : '#005eb6';
      })
  };

  CTSGrid.prototype._renderText = function (selection) {
    var XAxisScale = this._XAxisScale();
    var YAxisScale = this._YAxisScale();

    return selection
      .text(function (d) {
        if (d.state === 'unnormal') {
          return d.lack;
        }
        return '';
      })
      .attr('fill', '#fff')
      .attr('y', function (d, i) {
        return YAxisScale.bandwidth() * 0.6 * i
      })
      .attr('dx', XAxisScale.bandwidth() / 2)
      .attr('dy', '0.8em')
      .attr('text-anchor', 'middle')
      .attr('font-size', 14)
  };

  CTSGrid.prototype._enter = function (selections) {
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
  CTSGrid.prototype._update = function (selections) {
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
  CTSGrid.prototype._exit = function (selections) {
    selections.remove()
  };

  CTSGrid.prototype.update = function (data) {
    this.dataSet = data;
    this.xAxisData = [...new Set(
      data.map(function (item) {
        return item.time
      })
    )]
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

  return CTSGrid;
});