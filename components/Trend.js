Trend = function() {
	function Trend(trend_data) {
		this.trend_data = _.values(trend_data);
	}

	Trend.prototype.draw = function() {
		var self = this;

		console.log(self.trend_data);

		var el = d3.select('#trend');
		var width = el[0][0].offsetWidth;
		var height = el[0][0].offsetHeight;
		
		var trend = el.append('svg')
			.datum(self.trend_data)
			.attr('width', width-20)
			.attr('height', height-20)
			.attr("transform", "translate(" + 20 + "," + 20 + ")");;

		var x = d3.time.scale()
			.range([0,width]);
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var y = d3.scale.linear()
			.range([0,height]);
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.tickSize(10, 0)

		var line = d3.svg.line()
			.defined(function(d) { return d; })
			.x(function(d) { return x(new Date(d.date));})
			.y(function(d) { return y(d.actual); });

		var gX = trend.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + 250 + ")");

		var gY = trend.append("g")
			.attr("class", "axis axis--y");

		console.log(_.maxBy(self.trend_data, 'actual').actual);
		x.domain(d3.extent(self.trend_data, function(d) { return new Date(d.date); }));
		y.domain([0, _.maxBy(self.trend_data, 'actual').actual]);

		gX.call(xAxis);
		gY.call(yAxis);

		trend.append("path")
			.datum(self.trend_data)
			.attr("class", "line")
			.attr("d", line);

		return self;
	};
		
	return Trend;
}();