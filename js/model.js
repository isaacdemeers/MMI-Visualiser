import { Ac } from './class/Ac.js';
import { Competences } from './class/Competences.js';
import { Ressources } from './class/Ressources.js';
import { Sae } from './class/Sae.js';

let M = {}

M.lib = {
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
    for (let key in M.lib) {
        await M.lib[key].setup();
    }
    console.log(M.lib)
}







M.renderIT1 = function () {
    let option = M.options.it1.option;
    let sae = M.lib['sae'].getSae();
    let competences = M.lib['competences'].getCompetences();

    for (let key in sae) {
        option.yAxis.data.push(sae[key].code);
    }

    for (let ckey in competences) {

        let template = JSON.parse(JSON.stringify(M.options.it1.template.series));
        template.name = competences[ckey].name;

        for (let key in sae) {
            let acList = [];

            for (let ac of sae[key].ac) {
                if (M.lib['competences'].getAcsByCompetenceId(competences[ckey].id).includes(ac)) {
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

M.renderIT21 = function (semestre) {
    let option = JSON.parse(JSON.stringify(M.options.it2.option));
    let ressources = M.lib['ressources'].getRessourcesBySemestre(semestre);
    let competences = M.lib['competences'].getCompetences();

    let acs = [];
    ressources.forEach((ressource) => {
        acs.push(ressource.ac);
    });
    acs = acs.flat();


    for (let key in competences) {
        let template = JSON.parse(JSON.stringify(M.options.it2.template));

        template.name = competences[key].name;

        let cAcs = M.lib['competences'].getAcsByCompetenceId(competences[key].id);
        let acList = M.lib['ac'].getAcByIdList(acs);

        acList.forEach((ac) => {
            if (cAcs.includes(ac.id)) {

                let child = JSON.parse(JSON.stringify(M.options.it2.child));
                child.name = M.lib['ac'].getAcById(ac.id).code;
                template.children.push(child);
            }

        });

        option.series.data.push(template);

    }

    return option;

}

M.renderIT22 = function (id) {

    let option = JSON.parse(JSON.stringify(M.options.it2.option));
    let data = M.lib['sae'].getSaeById(id);
    let competences = M.lib['competences'].getCompetences();


    if (data == undefined) {
        data = M.lib['ressources'].getRessourcesById(id);
    }

    let acs = data.ac;
    let acList = M.lib['ac'].getAcByIdList(acs);

    for (let key in competences) {
        let template = JSON.parse(JSON.stringify(M.options.it2.template));

        template.name = competences[key].name;

        let cAcs = M.lib['competences'].getAcsByCompetenceId(competences[key].id);
        let acList = M.lib['ac'].getAcByIdList(acs);

        acList.forEach((ac) => {
            if (cAcs.includes(ac.id)) {

                let child = JSON.parse(JSON.stringify(M.options.it2.child));
                child.name = M.lib['ac'].getAcById(ac.id).code;
                template.children.push(child);
            }

        });

        option.series.data.push(template);

    }

    return option;

}









export { M }