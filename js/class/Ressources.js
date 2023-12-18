
class Ressources {
    constructor() {
        this.data = {};

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
                competences.push(competence.id);
            });

            temp['competences'] = competences;

            element.apcRessourceApprentissageCritiques.forEach((ac) => {
                acs.push(ac.id);
            });

            temp['ac'] = acs;
            temp['description'] = element.description;

            this.data[element.id] = temp;


        });

    }

}

export { Ressources }