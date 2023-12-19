let V = {}

V.createChart = function (htmlId, options) {
    let dom = document.getElementById(htmlId);
    let chart = echarts.init(dom);


    chart.setOption(options);

    window.addEventListener('resize', chart.resize);

    return chart;

}

// {
//     "id": 283,
//         "name": "Auditer une communication numérique",
//             "competences": [
//                 70
//             ],
//                 "ac": [
//                     685,
//                     686,
//                     687,
//                     688,
//                     689
//                 ],
//                     "semestre": "S1",
//                         "code": "SAÉ 1.01"
// }
//
// OR
//
// {
//     "name": "Anglais",
//     "id": 654,
//     "competences": [
//         71,
//         72,
//         74
//     ],
//     "ac": [
//         700,
//         701,
//         719,
//         757,
//         2492
//     ],
//     "description": "Objectifs : prolonger les acquis de l’enseignement secondaire par l’élargissement des connaissances culturelles du monde anglo-saxon, en particulier les usages du numérique et le monde de l’entreprise :\r\n- Autonomie en matière d’apprentissage de la langue et bonne utilisation des outils de recherche ;\r\n- Compréhension orale d'un langage standard\r\n- Activités de prise de parole en continu et en interaction, en lien avec les champs d’action couverts par la formation : publicité, série et film, média d'informations, monde du travail, culture artistique et numérique ;\r\n\r\nUn travail de remédiation en autonomie peut être envisagé pour les étudiants en difficulté en les guidant sur l'utilisation d'outils en ligne.",
//     "semestre": "S1"
// }
V.renderSelectIT2 = function (options) {
    let select = document.createElement('select');
    select.id = 'semestreit2';
    select.classList.add('form-control');
    for (let key in options) {
        let option = document.createElement('option');
        option.value = options[key];
        option.innerHTML = options[key];


        select.appendChild(option);
    }
    return select;
}

export { V }