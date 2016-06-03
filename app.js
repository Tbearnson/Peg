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
    // domo.get('/data/v1/target_data')
    // .then(function(dataset){
    //     console.log(JSON.stringify(dataset));
    //     var the_data = new AppData(dataset);
    //     console.log(the_data);

    //     var the_trend = new Trend(the_data.ytd.trends).draw();
    //     var the_map = new Map(the_data.month.zones).draw();
    //     the_data.gauges.map(function(config, index) {
    //         var click_handler = function() {
    //             d3.selectAll('#map svg').remove();
    //             the_map = new Map(the_data[config.type].zones).draw();
    //         };
    //         new Gauge(config, index, click_handler).draw();
    //     });
        
    // });

var dataset = [{"Date":"2016-01-02","Zone":"NAZ","Actual":130,"Target":125,"Lat":39.0558,"Long":-95.689},{"Date":"2016-01-02","Zone":"MEX","Actual":32,"Target":34,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-01-02","Zone":"LAN","Actual":45,"Target":50,"Lat":14.235,"Long":-51.9253},{"Date":"2016-01-02","Zone":"LAS","Actual":12,"Target":18,"Lat":35.6751,"Long":-71.543},{"Date":"2016-01-02","Zone":"EUR","Actual":30,"Target":34,"Lat":51.9194,"Long":19.1451},{"Date":"2016-01-02","Zone":"APAC","Actual":32,"Target":34,"Lat":35.8617,"Long":104.1954},{"Date":"2016-02-02","Zone":"NAZ","Actual":120,"Target":108,"Lat":54.526,"Long":-95.689},{"Date":"2016-02-02","Zone":"MEX","Actual":35,"Target":48,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-02-02","Zone":"LAN","Actual":55,"Target":67,"Lat":14.235,"Long":-51.9253},{"Date":"2016-02-02","Zone":"LAS","Actual":36,"Target":49,"Lat":35.6751,"Long":-71.543},{"Date":"2016-02-02","Zone":"EUR","Actual":24,"Target":33,"Lat":51.9194,"Long":19.1451},{"Date":"2016-02-02","Zone":"APAC","Actual":30,"Target":25,"Lat":35.8617,"Long":104.1954},{"Date":"2016-03-02","Zone":"NAZ","Actual":112,"Target":113,"Lat":54.526,"Long":-95.689},{"Date":"2016-03-02","Zone":"MEX","Actual":38,"Target":41,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-03-02","Zone":"LAN","Actual":65,"Target":58,"Lat":14.235,"Long":-51.9253},{"Date":"2016-03-02","Zone":"LAS","Actual":36,"Target":44,"Lat":35.6751,"Long":-71.543},{"Date":"2016-03-02","Zone":"EUR","Actual":24,"Target":32,"Lat":51.9194,"Long":19.1451},{"Date":"2016-03-02","Zone":"APAC","Actual":30,"Target":31,"Lat":35.8617,"Long":104.1954},{"Date":"2016-04-02","Zone":"NAZ","Actual":100,"Target":105,"Lat":54.526,"Long":-95.689},{"Date":"2016-04-02","Zone":"MEX","Actual":32,"Target":42,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-04-02","Zone":"LAN","Actual":62,"Target":66,"Lat":14.235,"Long":-51.9253},{"Date":"2016-04-02","Zone":"LAS","Actual":36,"Target":26,"Lat":35.6751,"Long":-71.543},{"Date":"2016-04-02","Zone":"EUR","Actual":24,"Target":23,"Lat":51.9194,"Long":19.1451},{"Date":"2016-04-02","Zone":"APAC","Actual":30,"Target":36,"Lat":35.8617,"Long":104.1954},{"Date":"2016-05-02","Zone":"NAZ","Actual":105,"Target":106,"Lat":54.526,"Long":-95.689},{"Date":"2016-05-02","Zone":"MEX","Actual":35,"Target":35,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-05-02","Zone":"LAN","Actual":58,"Target":54,"Lat":14.235,"Long":-51.9253},{"Date":"2016-05-02","Zone":"LAS","Actual":36,"Target":32,"Lat":35.6751,"Long":-71.543},{"Date":"2016-05-02","Zone":"EUR","Actual":24,"Target":23,"Lat":51.9194,"Long":19.1451},{"Date":"2016-05-02","Zone":"APAC","Actual":30,"Target":37,"Lat":35.8617,"Long":104.1954},{"Date":"2016-06-02","Zone":"NAZ","Actual":110,"Target":108,"Lat":54.526,"Long":-95.689},{"Date":"2016-06-02","Zone":"MEX","Actual":30,"Target":25,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-06-02","Zone":"LAN","Actual":60,"Target":62,"Lat":14.235,"Long":-51.9253},{"Date":"2016-06-02","Zone":"LAS","Actual":36,"Target":34,"Lat":35.6751,"Long":-71.543},{"Date":"2016-06-02","Zone":"EUR","Actual":24,"Target":28,"Lat":51.9194,"Long":19.1451},{"Date":"2016-06-02","Zone":"APAC","Actual":30,"Target":32,"Lat":35.8617,"Long":104.1954},{"Date":"2016-07-02","Zone":"NAZ","Actual":130,"Target":125,"Lat":54.526,"Long":-95.689},{"Date":"2016-07-02","Zone":"MEX","Actual":32,"Target":34,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-07-02","Zone":"LAN","Actual":45,"Target":50,"Lat":14.235,"Long":-51.9253},{"Date":"2016-07-02","Zone":"LAS","Actual":12,"Target":18,"Lat":35.6751,"Long":-71.543},{"Date":"2016-07-02","Zone":"EUR","Actual":30,"Target":34,"Lat":51.9194,"Long":19.1451},{"Date":"2016-07-02","Zone":"APAC","Actual":34,"Target":34,"Lat":35.8617,"Long":104.1954},{"Date":"2016-08-02","Zone":"NAZ","Actual":120,"Target":108,"Lat":54.526,"Long":-95.689},{"Date":"2016-08-02","Zone":"MEX","Actual":35,"Target":48,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-08-02","Zone":"LAN","Actual":55,"Target":67,"Lat":14.235,"Long":-51.9253},{"Date":"2016-08-02","Zone":"LAS","Actual":36,"Target":49,"Lat":35.6751,"Long":-71.543},{"Date":"2016-08-02","Zone":"EUR","Actual":24,"Target":33,"Lat":51.9194,"Long":19.1451},{"Date":"2016-08-02","Zone":"APAC","Actual":35,"Target":25,"Lat":35.8617,"Long":104.1954},{"Date":"2016-09-02","Zone":"NAZ","Actual":112,"Target":113,"Lat":54.526,"Long":-95.689},{"Date":"2016-09-02","Zone":"MEX","Actual":38,"Target":41,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-09-02","Zone":"LAN","Actual":65,"Target":58,"Lat":14.235,"Long":-51.9253},{"Date":"2016-09-02","Zone":"LAS","Actual":36,"Target":44,"Lat":35.6751,"Long":-71.543},{"Date":"2016-09-02","Zone":"EUR","Actual":24,"Target":32,"Lat":51.9194,"Long":19.1451},{"Date":"2016-09-02","Zone":"APAC","Actual":30,"Target":31,"Lat":35.8617,"Long":104.1954},{"Date":"2016-10-02","Zone":"NAZ","Actual":140,"Target":105,"Lat":54.526,"Long":-95.689},{"Date":"2016-10-02","Zone":"MEX","Actual":45,"Target":42,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-10-02","Zone":"LAN","Actual":62,"Target":66,"Lat":14.235,"Long":-51.9253},{"Date":"2016-10-02","Zone":"LAS","Actual":36,"Target":26,"Lat":35.6751,"Long":-71.543},{"Date":"2016-10-02","Zone":"EUR","Actual":24,"Target":23,"Lat":51.9194,"Long":19.1451},{"Date":"2016-10-02","Zone":"APAC","Actual":30,"Target":36,"Lat":35.8617,"Long":104.1954},{"Date":"2016-11-02","Zone":"NAZ","Actual":105,"Target":106,"Lat":54.526,"Long":-95.689},{"Date":"2016-11-02","Zone":"MEX","Actual":35,"Target":35,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-11-02","Zone":"LAN","Actual":58,"Target":54,"Lat":14.235,"Long":-51.9253},{"Date":"2016-11-02","Zone":"LAS","Actual":36,"Target":32,"Lat":35.6751,"Long":-71.543},{"Date":"2016-11-02","Zone":"EUR","Actual":24,"Target":23,"Lat":51.9194,"Long":19.1451},{"Date":"2016-11-02","Zone":"APAC","Actual":30,"Target":37,"Lat":35.8617,"Long":104.1954},{"Date":"2016-12-02","Zone":"NAZ","Actual":120,"Target":108,"Lat":54.526,"Long":-95.689},{"Date":"2016-12-02","Zone":"MEX","Actual":30,"Target":25,"Lat":23.6345,"Long":-102.5528},{"Date":"2016-12-02","Zone":"LAN","Actual":60,"Target":62,"Lat":14.235,"Long":-51.9253},{"Date":"2016-12-02","Zone":"LAS","Actual":36,"Target":34,"Lat":35.6751,"Long":-71.543},{"Date":"2016-12-02","Zone":"EUR","Actual":24,"Target":28,"Lat":51.9194,"Long":19.1451},{"Date":"2016-12-02","Zone":"APAC","Actual":30,"Target":32,"Lat":35.8617,"Long":104.1954}];
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