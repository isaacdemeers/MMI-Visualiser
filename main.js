import { M } from './js/model.js';
import { V } from './js/view.js';


await M.init();
let semestre = 'S1';
V.renderSelectIT2(M.lib['ressources'].getRessourcesBySemestre(semestre), M.lib['sae'].getSaeBySemestre(semestre));
V.renderSelectIT3(M.lib['sae'].getSae());

M.setSearchData();



let option = M.renderIT1();
let it1 = V.createChart('it1', option);

option = M.renderIT21('S1');
let it21 = V.createChart('it21', option);

option = M.renderIT22(654);
let it22 = V.createChart('it22', option);

option = M.renderIT3(283);
let it3 = V.createChart('it3', option);

option = M.renderIT4('S1');
let it4 = V.createChart('it4', option);

V.hideLoader();


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

  if (e.target.id == 'saeit3') {
    let option = M.renderIT3(e.target.value);
    it3.setOption(option);

  }

  if (e.target.id == 'semestreit4') {
    let option = M.renderIT4(e.target.value);
    it4.setOption(option);

  }
})

document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('moon')) {
    e.target.classList.add('hidden');
    document.querySelector('.sun').classList.remove('hidden');
    V.setTheme('light', M.theme);
    M.currentTheme = 'light';
  }
  if (e.target.classList.contains('sun')) {
    e.target.classList.add('hidden');
    document.querySelector('.moon').classList.remove('hidden');
    V.setTheme('dark', M.theme);
    M.currentTheme = 'dark';

  }

  if (e.target.classList.contains('search')) {
    document.querySelector('.searchSection').classList.toggle('hidden');
    document.querySelector('.search').classList.toggle('active');
    document.querySelector('#searchInput').focus();
  }
});

searchInput.addEventListener('input', function (event) {
  let userInput = event.target.value;
  V.updateResults(userInput, M.searchData);
});

// si detecte un scroll
document.querySelector('.main').addEventListener('scroll', () => {
  document.querySelector('.searchSection').classList.add('hidden');
  document.querySelector('.search').classList.remove('active');

});







