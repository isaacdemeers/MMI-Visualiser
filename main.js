
import { M } from './js/model.js';
import { V } from './js/view.js';


await M.init();


let option = M.renderIT1();
let it1 = V.createChart('it1', option);

option = M.renderIT2('S1');
let it2 = V.createChart('it2', option);




option = M.renderIT3(654);
let it3 = V.createChart('it3', option);

document.body.addEventListener('change', (e) => {

  if (e.target.id == 'semestreit1') {
    let option = M.renderIT2(e.target.value);
    it2.setOption(option);

  }

  if (e.target.id == 'semestreit2') {
    M.renderSelectIT2(e.target.value);

  }

  if (e.target.id == 'resultit2') {
    let option = M.renderIT3(e.target.value);
    it3.setOption(option);

  }
})


