
import { M } from './js/model.js';
import { V } from './js/view.js';


await M.init();


// let option = M.renderIT1();
// let it1 = V.createChart('it1', option);

let option = M.renderIT2('S1');
let it2 = V.createChart('it1', option);


document.body.addEventListener('change', (e) => {

  if (e.target.name == 'semestre') {
    let option = M.renderIT2(e.target.value);
    it2.setOption(option);

  }
})


