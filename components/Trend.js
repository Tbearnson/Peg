Trend = function() {
	function Trend(trend_data) {
		this.trend_data = _.values(trend_data);
	}

	Trend.prototype.draw = function() {
		var self = this;

		console.log(self.trend_data);

		function symbol() {
            return d3.svg.symbol()
                     .size(81)
                     .type("diamond");
        }

		var el = d3.select('#trend');
		var containerWidth = el[0][0].offsetWidth;
		var containerHeight = el[0][0].offsetHeight;
		var margin = {top: 80, right: 140, bottom: 50, left: 50};
        var width = containerWidth - margin.left - margin.right;
        var height = containerHeight - margin.top - margin.bottom;
		
		var svg = el.append('svg')
			.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          	.append("g")
            .attr("transform", "translate(" + margin.left +
                  "," + margin.top + ")");


    	var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        x.domain(d3.extent(self.trend_data, function(d) { return new Date(d.date); }));
		y.domain([0, _.maxBy(self.trend_data, 'actual').actual]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0, 0, 0)
            .tickPadding(10)
            .tickFormat(d3.time.format("%b"))
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(-width, 0, 0)
            .tickPadding(10)
            .orient("left");

		var line = d3.svg.line()
			// .defined(function(d) { return d; })
			.x(function(d) { return x(new Date(d.date));})
			.y(function(d) { return y(d.actual); });

		svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // For the y-axis, we add a label.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 9)
            .attr("dy", ".71em")
            .attr("text-anchor", "end")
            .text("Temperature (°C)");

        // Style the axes. As with other styles, these
        // could be more easily defined in CSS. For this
        // particular code, though, we're avoiding CSS
        // to make it easy to extract the resulting SVG
        // and paste it into a presentation.
        svg.selectAll(".axis line, .axis path")
            .attr("fill", "none")
            .attr("stroke", "#bbbbbb")
            .attr("stroke-width", "2px")
            .attr("shape-rendering", "crispEdges");

        svg.selectAll(".axis text")
            .attr("font-size", "14");

        svg.selectAll(".axis .tick line")
            .attr("stroke", "#d0d0d0")
            .attr("stroke-width", "1");

        svg.selectAll(".point.dataset")
            .data(self.trend_data)
            .enter().append("path")
            .attr("class", "point dataset")
            .attr("fill", "#adadad")
            .attr("stroke", "#adadad")
            .attr("d", symbol())
            .attr("transform", function(d) {
                return "translate(" + x(new Date(d.date)) +
                                  "," + y(d.actual) + ")";
            });

      	svg.append("path")
            .datum(self.trend_data)
            .attr("class", "line dataset")
            .attr("fill", "none")
            .attr("stroke", "#adadad")
            .attr("stroke-width", "2")
            .attr("d", line);

		return self;
	};
		
	return Trend;
}();