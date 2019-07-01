define(function (require) {
  var $ = require('jquery');

  function ResourceStatus(option) {
    this.el = option.el || '';
    this.data = '';
  }

  ResourceStatus.prototype.update = function (data) {
    this.data = data;
    this._render();
  };
  ResourceStatus.prototype._render = function () {
    "use strict";
    if (this.data !== null) {
      var str = '';
      str = '   <table class="commonTable">' +
        '          <tbody>' +
        '            <tr>' +
        '              <td>' +
        '                <img src="../../images/zhuji.png" alt="">' +
        '                <span style="margin-left: 5px">主机' + this.data.host + '个</span>' +
        '              </td>' +
        '            </tr>' +
        '            <tr>' +
        '              <td>' +
        '                <img src="../../images/cpu.png" alt="">' +
        '                <span style="margin-left: 5px">CPU总合核数' + this.data.cpuAudit + '</span>' +
        '              </td>' +
        '            </tr>' +
        '            <tr>' +
        '              <td>' +
        '                <img src="../../images/neicun.png" alt="">' +
        '                <span style="margin-left: 5px">总内存' + this.data.totalMemory + 'T</span>' +
        '              </td>' +
        '            </tr>' +
        '            <tr>' +
        '              <td>' +
        '                <img src="../../images/chunchu.png" alt="">' +
        '                <span style="margin-left: 5px">总存储' + this.data.totalStorage + 'T</span>' +
        '              </td>' +
        '            </tr>' +
        '            <tr>' +
        '              <td>' +
        '                <img src="../../images/shengyu.png" alt="">' +
        '                <span style="margin-left: 5px">剩余存储' + this.data.freeStorage + 'T</span>' +
        '              </td>' +
        '            </tr>' +
        '          </tbody>' +
        '        </table>';
      $(this.el).empty().append(str);
    }
  };

  return ResourceStatus;
});