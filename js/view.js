
let V = {}



V.createChart = function (htmlId, options) {
    let dom = document.getElementById(htmlId);
    let chart = echarts.init(dom);
    chart.setOption(options);
    window.addEventListener('resize', chart.resize);

    return chart;
}


V.renderSelectIT2 = function (ressources, sae) {

    let html = ''
    html += `<option disabled>RESSOURCES  ——————</option>`;
    for (let key in ressources) {
        let option = document.createElement('option');
        option.value = ressources[key].id;
        option.innerHTML = ressources[key].code + ' - ' + ressources[key].name;
        html += option.outerHTML;
    }
    html += `<option disabled>SAE  ——————</option>`;
    for (let key in sae) {
        let option = document.createElement('option');
        option.value = sae[key].id;
        option.innerHTML = sae[key].code + ' - ' + sae[key].name;
        html += option.outerHTML;
    }

    document.getElementById('resultit2').innerHTML = html;
}

V.renderSelectIT3 = function (sae) {
    let html = ''
    for (let key in sae) {
        let option = document.createElement('option');
        option.value = sae[key].id;
        option.innerHTML = sae[key].code + ' - ' + sae[key].name;
        html += option.outerHTML;
    }

    document.getElementById('saeit3').innerHTML = html;
}

V.setTheme = function (theme, colorScheme) {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colorScheme[theme].primary);
    root.style.setProperty('--color-secondary', colorScheme[theme].secondary);
    root.style.setProperty('--color-text', colorScheme[theme].text);
}

V.hideLoader = function () {
    document.querySelector('.loader').classList.add('hidden');
}

export { V }