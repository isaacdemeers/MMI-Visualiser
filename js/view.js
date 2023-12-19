let V = {}

V.createChart = function (htmlId, options) {
    let dom = document.getElementById(htmlId);
    let chart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });


    chart.setOption(options);

    window.addEventListener('resize', chart.resize);

    return chart;

}

export { V }