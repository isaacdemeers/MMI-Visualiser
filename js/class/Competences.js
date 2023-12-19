
class Competences {

    #data;
    constructor() {
        this.#data = {};

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
            this.#data[element.id] = temp;
        });

    }

    getCompetences() {
        return this.#data;
    }

    getCompetencesById(id) {
        return this.#data[id];
    }

    getCompetencesByIdList(list) {
        let rep = [];
        list.forEach((id) => {
            rep.push(this.#data[id]);
        });
        return rep;
    }

    getCompetencesByYear(year) {
        let rep = [];
        for (let key in this.#data) {
            if (this.#data[key].ac[year]) {
                rep.push(this.#data[key]);
            }
        }
        return rep;
    }

    getCompetencesByAcIdList(list) {
        let rep = [];
        for (let keys in this.#data) {
            let acs = this.#data[keys].ac;
            for (let key in acs) {
                console.log(acs[key])
                if (list.some(r => acs[key].includes(r))) {
                    rep.push(this.#data[keys]);
                    break;
                }
            }
        }
        return rep;

    }

    // "competences": {
    //     "data": {
    //         "70": {
    //             "id": 70,
    //             "name": "Comprendre",
    //             "description": "Comprendre les écosystèmes, les besoins des utilisateurs et les dispositifs de communication numérique",
    //             "ac": {
    //                 "BUT1": [
    //                     685,
    //                     686,
    //                     687,
    //                     688,
    //                     689,
    //                     690,
    //                     692,
    //                     693,
    //                     694,
    //                     696,
    //                     697
    //                 ],
    //                 "BUT2": [
    //                     685,
    //                     686,
    //                     687,
    //                     688,
    //                     689,
    //                     690,
    //                     692,
    //                     693,
    //                     694,
    //                     696,
    //                     697
    //                 ]
    //             }
    //         },
    //         "71": {
    //             "id": 71,
    //             "name": "Concevoir",
    //             "description": "Concevoir ou co-concevoir une réponse stratégique pertinente à une problématique complexe",
    //             "ac": {
    //                 "BUT1": [
    //                     698,
    //                     699,
    //                     700,
    //                     701,
    //                     704,
    //                     705,
    //                     706,
    //                     708,
    //                     709,
    //                     710,
    //                     711,
    //                     712,
    //                     715
    //                 ],
    //                 "BUT2": [
    //                     698,
    //                     699,
    //                     700,
    //                     701,
    //                     704,
    //                     705,
    //                     706,
    //                     708,
    //                     709,
    //                     710,
    //                     711,
    //                     712,
    //                     715
    //                 ],
    //                 "BUT3": [
    //                     698,
    //                     699,
    //                     700,
    //                     701,
    //                     704,
    //                     705,
    //                     706,
    //                     708,
    //                     709,
    //                     710,
    //                     711,
    //                     712,
    //                     715
    //                 ]
    //             }
    //         },
    //         "72": {
    //             "id": 72,
    //             "name": "Exprimer",
    //             "description": "Exprimer un message avec les médias numériques pour informer et communiquer",
    //             "ac": {
    //                 "BUT1": [
    //                     716,
    //                     717,
    //                     718,
    //                     719,
    //                     720,
    //                     721,
    //                     722,
    //                     723,
    //                     724,
    //                     725,
    //                     726,
    //                     727,
    //                     728,
    //                     729,
    //                     731,
    //                     732,
    //                     2497
    //                 ],
    //                 "BUT2": [
    //                     716,
    //                     717,
    //                     718,
    //                     719,
    //                     720,
    //                     721,
    //                     722,
    //                     723,
    //                     724,
    //                     725,
    //                     726,
    //                     727,
    //                     728,
    //                     729,
    //                     731,
    //                     732,
    //                     2497
    //                 ],
    //                 "BUT3": [
    //                     716,
    //                     717,
    //                     718,
    //                     719,
    //                     720,
    //                     721,
    //                     722,
    //                     723,
    //                     724,
    //                     725,
    //                     726,
    //                     727,
    //                     728,
    //                     729,
    //                     731,
    //                     732,
    //                     2497
    //                 ]
    //             }
    //         }
    //     }
    // },

    getAcsByCompetenceId(id) {
        let rep = [];
        for (let key in this.#data[id].ac) {
            if (!rep.includes(this.#data[id].ac[key])) {
                rep.push(this.#data[id].ac[key]);
            }
        }
        return rep.flat();
    }
}

export { Competences }