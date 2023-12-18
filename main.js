
import { M } from './js/model.js';
import { V } from './js/view.js';




await M.init();




var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};

let optionb = {
  title: {
    text: 'World Population',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},

  yAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  xAxis: {
    type: 'category',
    data: ['Comprendre', 'Concevoir', 'Exprimer', 'Développer', 'Entreprendre']
  },
  series: [
    {
      name: 'SAÉ',
      type: 'bar',
      data: [2, 4, 7, 1, 4, 3]
    },
    {
      name: 'Ressources',
      type: 'bar',
      data: [2, 4, 7, 2, 5, 2]

    }
  ]
};


if (option && typeof option === 'object') {
  myChart.setOption(option);
}

document.getElementById('chart-container').addEventListener('click', function () {
  myChart.setOption(optionb);
});


window.addEventListener('resize', myChart.resize);