let V = {}

V.createChart = function (htmlId, options) {
    var dom = document.getElementById(htmlId);

    var chart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });

    chart.setOption(options);

    return chart;

}

export { V }