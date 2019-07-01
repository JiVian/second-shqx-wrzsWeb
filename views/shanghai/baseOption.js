define(function () {
  let mapOption = {
      geo: {
          map: "shanghai",
          itemStyle: {
              normal: {
                  areaColor: "#042a6e",
                  borderColor: "#1299dc",
                  opacity: 1
              },
              emphasis: {
                  areaColor: "#042a6e",
                  borderColor: "#1299dc",
                  opacity: 1
              }
          },
          label: {
              normal: {
                  show: false
              },
              emphasis: {
                  show: false
              }
          },
          layoutCenter: ["48%", "43%"],
          layoutSize: 570
      },
      series: [{
        type: 'scatter',
        coordinateSystem: 'geo',
        label: {
            normal: {
                show: true,
                formatter: "{b}",
                fontSize: 13,
                color: "#fff",
                opacity: 1
            },
            emphasis: {
                show: true,
                formatter: "{b}",
                fontSize: 13,
                color: "#fff",
                opacity: 1
            }
        },
        itemStyle: {
            normal: { color: "transparent" }
        },
        // symbolSize: 5,
        data: [
            {
                name: '闵行',
                value: [121.47, 31.07]
            },
            {
                name: '宝山',
                value: [121.43, 31.35]
            },
            {
                name: '徐家汇',
                value: [121.43, 31.24]
            },
            {
                name: '嘉定',
                value: [121.25, 31.34]
            },
            {
                name: '崇明',
                value: [121.59, 31.62]
            },
            {
                name: '浦东',
                value: [121.75, 31.15]
            },
            {
                name: '惠南',
                value: [121.78, 31.04]
            },
            /*
            {
                name: '上海\n\n市区',
                value: [121.43, 31.28]
            },
            */
            {
                name: '金山',
                value: [121.37, 30.8]
            },
            {
                name: '青浦',
                value: [121.03, 31.1]
            },
            {
                name: '松江',
                value: [121.27, 31.05]
            },
            {
                name: '奉贤',
                value: [121.6, 30.92]
            },
            {
                name: '小洋山',
                value: [122, 30.6]
            },
            // [121.37, 31.1], // 闵行
            // [121.45, 31.4], // 宝山
            // [121.2, 31.38], // 嘉定
            // [121.49, 31.67], // 崇明
            // [121.43, 31.2], // 徐家汇
            // [121.78, 31.05], // 南汇
            // [121.53, 31.23], // 浦东
            // [121.27, 30.82], // 金山
            // [121.12, 31.13], // 青浦
            // [121.18, 31.02], // 松江
            // [121.5, 30.88], // 奉贤
            // [122.05, 30.63], // 小洋山
        ],
      }]
  };
  return {
      mapOption
  };
});
