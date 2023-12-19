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


    }
}




M.init = async function () {
    for (let key in lib) {
        await lib[key].setup();
    }
    console.log(lib)
}



M.renderIT1 = function () {
    let option = M.options.it1.option;


    let sae = lib['sae'].getSae();
    let competences = lib['competences'].getCompetences();

    console.log(sae);

    for (let key in sae) {
        option.yAxis.data.push(sae[key].code);
    }

    for (let ckey in competences) {

        let template = JSON.parse(JSON.stringify(M.options.it1.template.series));
        template.name = competences[ckey].name;

        for (let key in sae) {
            if (sae[key].competences.includes(competences[ckey].id)) {
                let acs = lib['competences'].getAcsByCompetenceId(competences[ckey].id);
                template.data.push(acs.length);
            }
            else { template.data.push(''); }
        }
        option.series.push(template);
    }
    return option;
}




export { M }