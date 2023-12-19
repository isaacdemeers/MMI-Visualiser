
class Ressources {

    #data;
    constructor() {
        this.#data = {};

    }

    async setup() {
        let response = await fetch(`../data/ressources.json`);
        let data = await response.json();
        let rep = data;


        rep.forEach((element) => {
            let temp = {};

            let acs = [];
            let competences = [];

            temp['name'] = element.libelle;
            temp['id'] = element.id;

            element.apcRessourceCompetences.forEach((competence) => {
                competences.push(competence.competence.id);
            });

            temp['competences'] = competences;

            element.apcRessourceApprentissageCritiques.forEach((ac) => {
                acs.push(ac.apprentissageCritique.id);
            });

            temp['ac'] = acs;
            temp['description'] = element.description;
            temp['semestre'] = element.semestre.libelle;
            temp['code'] = element.codeMatiere;

            this.#data[element.id] = temp;


        });

    }

    getRessources() {
        return this.#data;
    }

    getRessourcesById(id) {

        return this.#data[id];

    }

    getRessourcesByCompetenceId(id) {
        let rep = [];
        for (let key in this.#data) {
            if (this.#data[key].competences.includes(id)) {
                rep.push(this.#data[key]);
            }
        }
        return rep;
    }

    getRessourcesByAcId(id) {
        let rep = [];
        for (let key in this.#data) {
            if (this.#data[key].ac.includes(id)) {
                rep.push(this.#data[key]);
            }
        }
        return rep;
    }

    getRessourcesByAcIdList(list) {
        let rep = [];
        for (let key in this.#data) {
            let acs = this.#data[key].ac;
            for (let key in acs) {
                if (acs[key].some(r => list.includes(r))) {
                    rep.push(this.#data[key]);
                }
            }
        }
        return rep;
    }

    getRessourcesBySemestre(semestre) {
        let rep = [];
        for (let key in this.#data) {
            if (this.#data[key].semestre == semestre) {
                rep.push(this.#data[key]);
            }
        }
        return rep;
    }


}

export { Ressources }



let e = {
    "competences": {
        "data": {
            "70": {
                "id": 70,
                "name": "Comprendre",
                "description": "Comprendre les écosystèmes, les besoins des utilisateurs et les dispositifs de communication numérique",
                "ac": {
                    "BUT1": [
                        685,
                        686,
                        687,
                        688,
                        689,
                        690,
                        692,
                        693,
                        694,
                        696,
                        697
                    ],
                    "BUT2": [
                        685,
                        686,
                        687,
                        688,
                        689,
                        690,
                        692,
                        693,
                        694,
                        696,
                        697
                    ]
                }
            },
            "71": {
                "id": 71,
                "name": "Concevoir",
                "description": "Concevoir ou co-concevoir une réponse stratégique pertinente à une problématique complexe",
                "ac": {
                    "BUT1": [
                        698,
                        699,
                        700,
                        701,
                        704,
                        705,
                        706,
                        708,
                        709,
                        710,
                        711,
                        712,
                        715
                    ],
                    "BUT2": [
                        698,
                        699,
                        700,
                        701,
                        704,
                        705,
                        706,
                        708,
                        709,
                        710,
                        711,
                        712,
                        715
                    ],
                    "BUT3": [
                        698,
                        699,
                        700,
                        701,
                        704,
                        705,
                        706,
                        708,
                        709,
                        710,
                        711,
                        712,
                        715
                    ]
                }
            },
            "72": {
                "id": 72,
                "name": "Exprimer",
                "description": "Exprimer un message avec les médias numériques pour informer et communiquer",
                "ac": {
                    "BUT1": [
                        716,
                        717,
                        718,
                        719,
                        720,
                        721,
                        722,
                        723,
                        724,
                        725,
                        726,
                        727,
                        728,
                        729,
                        731,
                        732,
                        2497
                    ],
                    "BUT2": [
                        716,
                        717,
                        718,
                        719,
                        720,
                        721,
                        722,
                        723,
                        724,
                        725,
                        726,
                        727,
                        728,
                        729,
                        731,
                        732,
                        2497
                    ],
                    "BUT3": [
                        716,
                        717,
                        718,
                        719,
                        720,
                        721,
                        722,
                        723,
                        724,
                        725,
                        726,
                        727,
                        728,
                        729,
                        731,
                        732,
                        2497
                    ]
                }
            }
        }
    },
    "ac": {
        "data": {
            "685": {
                "libelle": "Présenter une organisation, ses activités et son environnement (économique, sociologique, culturel, juridique, technologique, communicationnel et médiatique)",
                "code": "AC11.01",
                "ordre": 1,
                "id": 685
            },
            "686": {
                "libelle": "Évaluer un site web, un produit multimédia ou un dispositif interactif existant en s’appuyant sur des guides de bonnes pratiques",
                "code": "AC11.02",
                "ordre": 2,
                "id": 686
            },
            "687": {
                "libelle": "Produire des analyses statistiques descriptives et les interpréter pour évaluer un contexte socio-économique",
                "code": "AC11.03",
                "ordre": 3,
                "id": 687
            }
        }
    },
    "ressources": {
        "data": {
            "654": {
                "name": "Anglais",
                "id": 654,
                "competences": [
                    73560,
                    73561,
                    73562
                ],
                "ac": [
                    207362,
                    207363,
                    207364,
                    207365,
                    207366
                ],
                "description": "Objectifs : prolonger les acquis de l’enseignement secondaire par l’élargissement des connaissances culturelles du monde anglo-saxon, en particulier les usages du numérique et le monde de l’entreprise :\r\n- Autonomie en matière d’apprentissage de la langue et bonne utilisation des outils de recherche ;\r\n- Compréhension orale d'un langage standard\r\n- Activités de prise de parole en continu et en interaction, en lien avec les champs d’action couverts par la formation : publicité, série et film, média d'informations, monde du travail, culture artistique et numérique ;\r\n\r\nUn travail de remédiation en autonomie peut être envisagé pour les étudiants en difficulté en les guidant sur l'utilisation d'outils en ligne."
            },
            "655": {
                "name": "Anglais Renforcé ou LV2",
                "id": 655,
                "competences": [
                    73618,
                    73619
                ],
                "ac": [
                    207514,
                    207515,
                    207516,
                    207517
                ],
                "description": "LV2 : prolonger les acquis dans la langue concernée et développer l’aisance dans la langue, tout en intégrant la dimension interculturelle. Acquérir des notions de base de la communication interculturelle.\r\n\r\nAnglais renforcé : consolider les acquis par de la remédiation ou approfondir les apprentissages dans les 5 compétences langagières (expression orale, expression écrite, compréhension orale, compréhension écrite et expression orale en interaction)."
            },
            "656": {
                "name": "Ergonomie et Accessibilité",
                "id": 656,
                "competences": [
                    73565
                ],
                "ac": [
                    207371
                ],
                "description": "Objectifs : découvrir l’ergonomie, l’étude des usages et les contraintes liées à l'accessibilité numérique :\r\n- Architecture de l’information ;\r\n- Fondamentaux de l’ergonomie des interfaces et dispositifs numériques (origine, enjeux, typologie, notions) ;\r\n- Démarche centrée utilisateur ;\r\n- Panorama des méthodes d’évaluation qualitatives et quantitatives ;\r\n- Introduction aux référentiels de qualité pour le web."
            }
        }
    }
}