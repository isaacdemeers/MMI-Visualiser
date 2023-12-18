import { Ac } from './class/Ac.js';
import { Competences } from './class/Competences.js';
import { Ressources } from './class/Ressources.js';

let M = {}

let lib = {
    competences: new Competences(),
    ac: new Ac(),
    ressources: new Ressources()
}



M.init = async function () {
    for (let key in lib) {
        await lib[key].setup();
    }

    console.log(lib);
}



export { M }