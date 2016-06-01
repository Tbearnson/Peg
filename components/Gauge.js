Gauge = function() {
    function Gauge(config, gauge_number, click_handler) {
        this.config = config;
        this.number = gauge_number;
        this.click_handler = click_handler;
        this.percent = adjustPercentToGauge(config.percent || .6);
        this.sections = [
            {
                startRads: Math.PI,
                endRads: 3*Math.PI/4,
                color: "#FC101E",
                percentage: '60%',
                percentagePosition: {
                    x: -.13,
                    y: 0
                },
                labelPosition: {
                    x: -.43,
                    y: 0
                }
            },
            {
                startRads: 3*Math.PI/4,
                endRads: Math.PI/2,
                color: "#F2854A",
                percentage: '80%',
                percentagePosition: {
                    x: -.09,
                    y: -.09
                },
                labelPosition: {
                    x: -.30,
                    y: -.28
                }
            },
            {
                startRads: Math.PI/2,
                endRads: Math.PI/4,
                color: "#FFD936",
                percentage: '90%',
                percentagePosition: {
                    x: 0,
                    y: -.14
                },
                labelPosition: {
                    x: 0,
                    y: -.39
                }
            },
            {
                startRads: Math.PI/4,
                endRads: Math.PI/8,
                color: "#98D82A",
                percentage: '100%',
                percentagePosition: {
                    x: .09,
                    y: -.09
                },
                labelPosition: {
                    x: .30,
                    y: -.28
                }
            },
            {
                startRads: Math.PI/8,
                endRads: 0,
                color: "#50981B",
                percentage: '120%',
                percentagePosition: {
                    x: .13,
                    y: 0
                },
                labelPosition: {
                    x: .43,
                    y: 0
                }
            }
        ];
        this.needle = new Needle(120, 5);
    }

    function adjustPercentToGauge(original_percentage) {
        if (original_percentage < .6) return 0;
        if (original_percentage < .8) return 1.25*(original_percentage - .6);
        if (original_percentage < 1) return 2.5*(original_percentage - .8) + .25;
        if (original_percentage < 1.2) return 1.25*(original_percentage - 1) + .75;
        return 1;
    }
    Gauge.prototype.drawLabels = function(svg) {
        var self = this;

        // Chart Title Label
        svg.append('text')
            .attr('x', 150)
            .attr('y', .1*300)
            .attr('font-size', 28)
            .text(self.config.chartTitle)
            .style("text-anchor", "middle");
        // Large Needle Labels
        svg.append('text')
            .attr('x', 150)
            .attr('y', .75*300)
            .attr('font-size', 24)
            .text(self.config.percent*100+'%   ('+self.config.value+')')
            .style("text-anchor", "middle");
    };
    Gauge.prototype.drawSections = function(chart, width, height, radius) {
        var self = this;

        self.sections.forEach(function(section, index) {
            arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius - BAR_WIDTH)
                .startAngle(-section.startRads - 3*Math.PI/2)
                .endAngle(-section.endRads - 3*Math.PI/2);
            chart.append('path')
                .attr('class', 'arc')
                .attr('d', arc)
                .attr("fill", section.color);

            // Labels
            chart.append('text')
                .attr('x', width * section.percentagePosition.x)
                .attr('y', height * section.percentagePosition.y)
                .attr('font-size', 12)
                .text(section.percentage)
                .style("text-anchor", "middle");
            chart.append('text')
                .attr('x', width * section.labelPosition.x)
                .attr('y', height * section.labelPosition.y)
                .attr('font-size', 12)
                .text(self.config.labels[index])
                .style("text-anchor", "middle");
        });
    };

    Gauge.prototype.draw = function() {
        var self = this;
        
        var el = d3.select('#chart-gauge-'+(self.number+1));

        var width = el[0][0].offsetWidth;
        var height = el[0][0].offsetHeight;
        var radius = (width / 2) - .15*width;
        
        var svg = el.append('svg')
            .attr('width', width)
            .attr('height', height);
        self.drawLabels(svg);

        var chart = svg.append('g')
            .attr('transform', 'translate(' + (width) / 2 + ', ' + .6*height + ')')
            .on('click', function() {
                self.click_handler();
                self.needle.animate(chart, self.percent);
            });
        self.drawSections(chart, width, height, radius);

        
        self.needle.drawOn(chart, 0);
        self.needle.animateInitial(chart, self.percent);

        return self;
    };

    return Gauge;      
}();