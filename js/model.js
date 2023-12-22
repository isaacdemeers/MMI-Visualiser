import { Ac } from './class/Ac.js';
import { Competences } from './class/Competences.js';
import { Ressources } from './class/Ressources.js';
import { Sae } from './class/Sae.js';

let M = {}

// J'ai vraiment essayé de rajouter les nom des AC dans les popUp mais pour ma part, impossible de les faire fonctionner.

M.lib = {
    competences: new Competences(),
    ac: new Ac(),
    ressources: new Ressources(),
    sae: new Sae()
}

M.searchData = {
    sae: [

    ],
    ressources: [

    ],
    ac: [

    ],
    competences: [

    ]
}

// COLOR THEME
M.theme = {
    dark: {
        primary: '#1B1725',
        secondary: '#2A2D43',
        alpha: 'rgba(41, 44, 66, 0.707)',
        text: '#fff',

    },
    light: {
        primary: '#efeafd',
        secondary: '#A59BC0',
        alpha: 'rgba(165, 155, 192, 0.707)',
        text: '#222',
    }
}

M.currentTheme = 'dark';


// OPTIONS TEMPLATES
M.options = {
    it1: {

        option: {

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                textStyle: {
                    color: 'source',

                }
            },
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
                data: [

                ],

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
                    show: true,
                    textBorderWidth: 0,
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
                    textBorderWidth: 0,
                    rotate: 'radial'
                }
            }
        },

        template: {
            name: '',
            children: [],
        },

        child: {
            name: '',
            value: 10,
        }
    },

    it3: {
        option: {
            darkMode: 'false',
            textStyle: {
                fontWeight: 'bolder',
            },
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
                        fontSize: 9,
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left',

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




            tooltip: {
                trigger: 'item',
                formatter: '{b0}',


            },

            legend: [
                {
                    data: [],
                    textStyle: {
                        color: 'source',

                    }
                },

            ],

            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: 'texw',
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    data: [],
                    links: [],
                    categories: [],
                    emphasis: {
                        focus: 'adjacency',
                        label: {
                            position: 'right',
                            show: true
                        }
                    },
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
            "symbolSize": 0,
            "value": 4,
            "x": 336.49738,
            "y": -269.55914,
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

M.setSearchData = function () {
    let sae = M.lib['sae'].getSae();
    let ressources = M.lib['ressources'].getRessources();
    let ac = M.lib['ac'].getAc();
    let competences = M.lib['competences'].getCompetences();

    for (let key in sae) {
        let keywords = [];
        let description = '';

        keywords.push(sae[key].code);
        keywords.push(sae[key].semestre);
        keywords.push(sae[key].id);

        description += sae[key].code + ' — ' + sae[key].name;
        M.searchData.sae.push({ keywords, description });




    }

    for (let key in ressources) {
        let keywords = [];
        let description = '';

        keywords.push(ressources[key].code);
        keywords.push(ressources[key].semestre);
        keywords.push(ressources[key].id);
        keywords.push(ressources[key].name);


        description += ressources[key].code + ' — ' + ressources[key].name + '\n';
        description += ressources[key].description;
        M.searchData.ressources.push({ keywords, description });

    }

    for (let key in ac) {
        let keywords = [];
        let description = '';

        keywords.push(ac[key].code);
        keywords.push(ac[key].id);

        description += ac[key].code + ' — ' + ac[key].libelle;
        M.searchData.ac.push({ keywords, description });

    }

    for (let key in competences) {
        let keywords = [];
        let description = '';

        keywords.push(competences[key].name);
        keywords.push(competences[key].id);

        description += competences[key].name + ' — ' + competences[key].description;
        M.searchData.competences.push({ keywords, description });

    }

    console.log(M.searchData)
}


// IT1 RENDERING FUNCTIONS ———
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


// IT2.1 RENDERING FUNCTION ———
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
    console.log(option)

    return option;

}


// IT2.2 RENDERING FUNCTION ———
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

// IT3 RENDERING FUNCTION ———
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


// IT4 RENDERING FUNCTIONS ———
M.createCategories = function () {
    let data = {
        competences: {
            name: 'Compétences'
        },
        sae: {
            name: 'SAE'
        },
        ac: {
            name: 'Apprentissages critiques'
        },
        ressources: {
            name: 'Ressources'
        }
    }
    let categories = [];
    for (let key in data) {
        let category = JSON.parse(JSON.stringify(M.options.it4.categories));
        category.name = data[key].name;
        categories.push(category);
    }
    return categories;
}

// CREATE A LINK BETWEEN TWO NODES
M.createLink = function (source, targets) {
    let links = [];
    targets.forEach((target) => {
        let link = JSON.parse(JSON.stringify(M.options.it4.links));
        link.source = `${source}`;
        link.target = `${target}`;
        links.push(link);
    })
    return links;
}

// CREATE A NODE
M.createNode = function (id, name, category) {

    let node = JSON.parse(JSON.stringify(M.options.it4.nodes));
    node.id = `${id}`;
    node.name = `${name}`;
    node.symbolSize = 8 * (4 - category);
    node.category = category;
    return node;
}


// REMOVE DUPLICATED NODES
M.filterNodes = function (nodes) {
    let rep = [];
    nodes.forEach((node) => {
        if (!rep.some(r => r.id == node.id)) {
            rep.push(node);
        }
    })
    return rep;
}

// IT4 RENDERING FUNCTION ———
M.renderIT4 = function (semestre) {
    let option = JSON.parse(JSON.stringify(M.options.it4.option));
    let categories = M.createCategories();
    let saes = M.lib['sae'].getSaeBySemestre(semestre);
    let links = [];
    let nodes = [];



    option.series[0].categories = categories;
    option.legend[0].data = categories.map(function (a) {
        return a.name;
    });

    saes.forEach((sae) => {
        let saeNode = M.createNode(sae.id, sae.code, 1);
        nodes.push(saeNode);



        sae.competences.forEach((competence) => {
            competence = M.lib['competences'].getCompetencesById(competence);
            let acs = M.lib['competences'].getAcsByCompetenceId(competence.id);

            let competenceNode = M.createNode(competence.id, competence.name, 0);
            nodes.push(competenceNode);




            acs.forEach((ac) => {
                ac = M.lib['ac'].getAcById(ac);
                let ressources = M.lib['ressources'].getRessourcesByAcId(ac.id);

                let acNode = M.createNode(ac.id, ac.code, 2);
                nodes.push(acNode);


                ressources.forEach((ressource) => {
                    let ressourceNode = M.createNode(ressource.id, ressource.code + ' — ' + ressource.name, 3);
                    nodes.push(ressourceNode);

                    links.push(M.createLink(sae.id, [competence.id, ac.id, ressource.id]));
                    links.push(M.createLink(competence.id, [ac.id, ressource.id]));
                    links.push(M.createLink(ac.id, [ressource.id]));
                })
            })
        })
    })

    option.series[0].data = M.filterNodes(nodes);
    option.series[0].links = links.flat();

    return option;

}

export { M }



