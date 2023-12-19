import { Ac } from './class/Ac.js';
import { Competences } from './class/Competences.js';
import { Ressources } from './class/Ressources.js';
import { Sae } from './class/Sae.js';

let M = {}

let lib = {
    competences: new Competences(),
    ac: new Ac(),
    ressources: new Ressources(),
    sae: new Sae()
}

M.options = {
    it1: {

        option: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: []
            },
            series: [

            ]

        },

        template: {
            series: {
                name: '',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            }

        },


    },

    it2: {
        option: {
            series: {
                type: 'sunburst',


                data: [],
                radius: [0, '90%'],
                label: {
                    rotate: 'radial'
                }
            }
        },

        template: {
            name: '',
            children: []
        },

        child: {
            name: '',
            value: 10
        }
    }
}




M.init = async function () {
    for (let key in lib) {
        await lib[key].setup();
    }
    M.renderSelectIT2('S1');
    console.log(lib)
}


M.renderSelectIT2 = function (semestre) {
    let ressources = lib['ressources'].getRessourcesBySemestre(semestre)
    let sae = lib['sae'].getSaeBySemestre(semestre);
    let html = ''
    html += `<option disabled>RESSOURCES  ——————</option>`;
    for (let key in ressources) {
        let option = document.createElement('option');
        option.value = ressources[key].id;
        option.innerHTML = ressources[key].code + ' - ' + ressources[key].name;
        html += option.outerHTML;
    }

    html += `<option disabled>SAE  ——————</option>`;



    for (let key in sae) {
        let option = document.createElement('option');
        option.value = sae[key].id;
        option.innerHTML = sae[key].code + ' - ' + sae[key].name;
        html += option.outerHTML;
    }

    document.getElementById('resultit2').innerHTML = html;
}




M.renderIT1 = function () {
    let option = M.options.it1.option;
    let sae = lib['sae'].getSae();
    let competences = lib['competences'].getCompetences();

    for (let key in sae) {
        option.yAxis.data.push(sae[key].code);
    }

    for (let ckey in competences) {

        let template = JSON.parse(JSON.stringify(M.options.it1.template.series));
        template.name = competences[ckey].name;

        for (let key in sae) {
            let acList = [];

            for (let ac of sae[key].ac) {
                if (lib['competences'].getAcsByCompetenceId(competences[ckey].id).includes(ac)) {
                    acList.push(ac);
                }
            }
            if (acList.length > 0) {
                template.data.push(acList.length);
            }
            else {
                template.data.push('');
            }

        }


        option.series.push(template);
    }
    return option;
}

M.renderIT2 = function (semestre) {
    let option = JSON.parse(JSON.stringify(M.options.it2.option));
    let ressources = lib['ressources'].getRessourcesBySemestre(semestre);
    let competences = lib['competences'].getCompetences();

    let acs = [];
    ressources.forEach((ressource) => {
        acs.push(ressource.ac);
    });
    acs = acs.flat();


    for (let key in competences) {
        let template = JSON.parse(JSON.stringify(M.options.it2.template));

        template.name = competences[key].name;

        let cAcs = lib['competences'].getAcsByCompetenceId(competences[key].id);
        let acList = lib['ac'].getAcByIdList(acs);

        acList.forEach((ac) => {
            if (cAcs.includes(ac.id)) {

                let child = JSON.parse(JSON.stringify(M.options.it2.child));
                child.name = lib['ac'].getAcById(ac.id).code;
                template.children.push(child);
            }

        });

        option.series.data.push(template);

    }

    return option;

}

M.renderIT3 = function (id) {

    let option = JSON.parse(JSON.stringify(M.options.it2.option));
    let data = lib['sae'].getSaeById(id);
    let competences = lib['competences'].getCompetences();


    if (data == undefined) {
        data = lib['ressources'].getRessourcesById(id);
    }

    let acs = data.ac;
    let acList = lib['ac'].getAcByIdList(acs);

    for (let key in competences) {
        let template = JSON.parse(JSON.stringify(M.options.it2.template));

        template.name = competences[key].name;

        let cAcs = lib['competences'].getAcsByCompetenceId(competences[key].id);
        let acList = lib['ac'].getAcByIdList(acs);

        acList.forEach((ac) => {
            if (cAcs.includes(ac.id)) {

                let child = JSON.parse(JSON.stringify(M.options.it2.child));
                child.name = lib['ac'].getAcById(ac.id).code;
                template.children.push(child);
            }

        });

        option.series.data.push(template);

    }

    return option;

}








export { M }