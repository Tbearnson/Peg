Trend = function() {
    function Trend(trend_data) {
        this.trend_data = trend_data;
    }

    Trend.prototype.draw = function() {
        var self = this;

        var el = d3.select('#trend');
        var width = el[0][0].offsetWidth;
        var height = el[0][0].offsetHeight;
        
        var map = el.append('svg')
            .attr('width', width)
            .attr('height', height);

        return self;
    };
        
    return Trend;
}();