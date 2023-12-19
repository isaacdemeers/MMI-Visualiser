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
    },

    it3: {
        option: {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',
                    data: [],
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    emphasis: {
                        focus: 'descendant'
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        },

        template: {
            name: '',
            children: []
        },

    },

    it4: {
        option: {
            title: {
                text: 'Les Miserables',
                subtext: 'Circular layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {},
            legend: [
                {
                    data: [].map(function (a) {
                        return a.name;
                    })
                }
            ],
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: '',
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    data: [],
                    links: [],
                    categories: [],
                    roam: true,
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    }
                }
            ]
        },

        categories: {
            "name": ""
        },

        links: {
            "source": "",
            "target": ""
        },

        nodes: {
            "id": "",
            "name": "",
            "symbolSize": 19.12381,
            "value": "",
            "category": 0
        },
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


M.renderIT3 = function (saeId) {
    let option = JSON.parse(JSON.stringify(M.options.it3.option));
    let sae = M.lib['sae'].getSaeById(saeId);

    let saeTpl = JSON.parse(JSON.stringify(M.options.it3.template));
    saeTpl.name = sae.code;

    sae.competences.forEach((competence) => {
        competence = M.lib['competences'].getCompetencesById(competence);
        let acs = M.lib['competences'].getAcsByCompetenceId(competence.id);

        let competenceTpl = JSON.parse(JSON.stringify(M.options.it3.template));
        competenceTpl.name = competence.name;


        acs.forEach((ac) => {
            ac = M.lib['ac'].getAcById(ac);
            let ressources = M.lib['ressources'].getRessourcesByAcId(ac.id);

            let acTpl = JSON.parse(JSON.stringify(M.options.it3.template));
            acTpl.name = ac.code;

            ressources.forEach((ressource) => {
                let ressourceTpl = JSON.parse(JSON.stringify(M.options.it3.template));
                ressourceTpl.name = ressource.code + ' — ' + ressource.name;

                acTpl.children.push(ressourceTpl);

            })

            competenceTpl.children.push(acTpl);

        })

        saeTpl.children.push(competenceTpl);
    })

    option.series[0].data.push(saeTpl);

    return option;

}






export { M }



