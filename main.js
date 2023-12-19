
import { M } from './js/model.js';
import { V } from './js/view.js';


await M.init();
let semestre = 'S1';
V.renderSelectIT2(M.lib['ressources'].getRessourcesBySemestre(semestre), M.lib['sae'].getSaeBySemestre(semestre));


let option = M.renderIT1();
let it1 = V.createChart('it1', option);

option = M.renderIT21('S1');
let it21 = V.createChart('it21', option);

option = M.renderIT22(654);
let it22 = V.createChart('it22', option);



document.body.addEventListener('change', (e) => {

  if (e.target.id == 'semestreit1') {
    let option = M.renderIT21(e.target.value);
    it21.setOption(option);

  }

  if (e.target.id == 'semestreit2') {
    let semestre = e.target.value;
    V.renderSelectIT2(M.lib['ressources'].getRessourcesBySemestre(semestre), M.lib['sae'].getSaeBySemestre(semestre));

  }

  if (e.target.id == 'resultit2') {
    let option = M.renderIT22(e.target.value);
    it22.setOption(option);

  }
})


