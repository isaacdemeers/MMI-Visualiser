
class Competences {
    constructor() {
        this.data = {};

    }

    async setup() {
        let response = await fetch(`../data/competences.json`);
        let data = await response.json();
        let rep = data;


        rep.forEach((element) => {
            let temp = {};
            let ac = [];
            let years = {};

            temp['id'] = element.id;
            temp['name'] = element.nom_court;
            temp['description'] = element.libelle;
            element.apcNiveaux.forEach((niveau) => {
                niveau['apcApprentissageCritiques'].forEach((apcApprentissageCritique) => {
                    ac.push(apcApprentissageCritique.id);
                });
                years[niveau.annee.libelle] = ac;
            });
            temp['ac'] = years;
            this.data[element.id] = temp;
        });

    }

}

export { Competences }