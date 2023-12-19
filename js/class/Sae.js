
class Sae {
    #data;

    constructor() {
        this.#data = {};

    }

    async setup() {
        let response = await fetch(`../data/sae.json`);
        let data = await response.json();
        let rep = data;


        rep.forEach((element) => {
            let temp = {};
            let competences = [];
            let acs = [];

            temp['id'] = element.id;
            temp['name'] = element.libelle;

            element.apcSaeCompetences.forEach((competence) => {
                competences.push(competence.competence.id);
            });

            element.apcSaeApprentissageCritiques.forEach((ac) => {
                acs.push(ac.apprentissageCritique.id);
            });

            temp['competences'] = competences;
            temp['ac'] = acs;
            temp['semestre'] = element.semestre.libelle;
            temp['code'] = element.codeMatiere;


            this.#data[element.id] = temp;
        })
    }

    getSae() {
        return this.#data;
    }

    getSaeById(id) {
        return this.#data[id];
    }

    getSaeByIdList(list) {
        let rep = [];
        list.forEach((id) => {
            rep.push(this.#data[id]);
        });
        return rep;
    }

    getSaeByAcId(id) {
        let rep = [];
        for (let key in this.#data) {
            if (this.#data[key].ac.includes(id)) {
                rep.push(this.#data[key]);
            }
        }
        return rep;
    }

    getSaeByCompetenceId(id) {
        let rep = [];
        for (let key in this.#data) {
            if (this.#data[key].competences.includes(id)) {
                rep.push(this.#data[key]);
            }
        }
        return rep;
    }

    getSaeByAcIdList(list) {
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


}

export { Sae }