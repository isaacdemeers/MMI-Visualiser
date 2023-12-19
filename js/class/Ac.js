
class Ac {
    #data;

    constructor() {
        this.#data = {};

    }

    async setup() {
        let response = await fetch(`../data/competences.json`);
        let data = await response.json();
        let rep = data;


        rep.forEach((element) => {
            element['apcNiveaux'].forEach((apcNiveau) => {
                apcNiveau['apcApprentissageCritiques'].forEach((apcApprentissageCritique) => {
                    this.#data[apcApprentissageCritique.id] = apcApprentissageCritique;
                });
            });
        });
    }

    getAc() {
        return this.#data;
    }

    getAcById(id) {
        return this.#data[id];
    }

    getAcByIdList(list) {
        let rep = [];
        list.forEach((id) => {
            rep.push(this.#data[id]);
        });
        return rep;

    }


}

export { Ac }