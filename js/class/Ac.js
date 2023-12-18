
class Ac {
    constructor() {
        this.data = {};

    }

    async setup() {
        let response = await fetch(`../data/competences.json`);
        let data = await response.json();
        let rep = data;


        rep.forEach((element) => {
            element['apcNiveaux'].forEach((apcNiveau) => {
                apcNiveau['apcApprentissageCritiques'].forEach((apcApprentissageCritique) => {
                    this.data[apcApprentissageCritique.id] = apcApprentissageCritique;
                });
            });
        });
    }

}

export { Ac }