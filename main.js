
import { M } from './js/model.js';
import { V } from './js/view.js';


await M.init();


let option = M.renderIT1();

var dom = document.getElementById('it1');
var chart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});


chart.setOption(option);



window.addEventListener('resize', chart.resize);