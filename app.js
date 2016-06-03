// GLOBALS
    var BAR_WIDTH = 50;
    var PERCENT_TO_COLOR = function(percent) {
        if (percent < .8 ) return "#FC101E";
        if (percent < .9 ) return "#F2854A";
        if (percent < 1 ) return "#FFD936";
        if (percent < 1.1 ) return "#98D82A";
        return "#50981B";
    }

// BOOTSTRAP
    domo.get('/data/v1/target_data')
    .then(function(dataset){
        var the_data = new AppData(dataset);
        console.log(the_data);

        var the_trend = new Trend(the_data.ytd.trends).draw();
        var the_map = new Map(the_data.month.zones).draw();
        the_data.gauges.map(function(config, index) {
            var click_handler = function() {
                d3.selectAll('#map svg').remove();
                the_map = new Map(the_data[config.type].zones).draw();
            };
            new Gauge(config, index, click_handler).draw();
        });
        
    });
