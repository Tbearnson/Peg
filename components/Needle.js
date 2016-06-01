Needle = function () {
    function Needle(length, radius) {
        this.length = length;
        this.radius = radius;
    }

    function percToRad(percent) {
        return percent * 2 * Math.PI;
    }

    Needle.prototype.drawOn = function(el, perc) {
        el.append('circle')
            .attr('class', 'needle-center')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', this.radius);
        return el.append('path')
            .attr('class', 'needle')
            .attr('d', this.mkCmd(perc));
    };

    Needle.prototype.animateInitial = function(el, perc) {
        var self = this;

        return el.transition()
            .delay(500)
            .ease('elastic')
            .duration(3000)
            .selectAll('.needle')
            .tween('progress', function () {
                return function (percentOfPercent) {
                    var progress = percentOfPercent * perc;
                    return d3.select(this).attr('d', self.mkCmd(progress));
                };
            });
    };
    Needle.prototype.animate = function(el, perc) {
        var self = this;
        function up(el, round) {
            el.selectAll('.needle')
            .transition()
            .attr("d", self.mkCmd(perc+.02))
            .ease('linear')
            .duration(150)
            .each("end", function() {
                if (round < 3) down(el, round+1);
                else back(el);
            });
        }
        function down(el, round) {
            el.selectAll('.needle')
            .transition()
            .attr("d", self.mkCmd(perc-.02))
            .ease('linear')
            .duration(150)
            .each("end", function() {
                if (round < 3) up(el, round+1);
                else back(el);
            });
        }
        function back(el) {
            el.selectAll('.needle')
            .transition()
            .attr("d", self.mkCmd(perc))
            .ease('linear')
            .duration(150);
        }
        
        return up(el, null);
    };

    Needle.prototype.mkCmd = function(perc) {
        var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
        thetaRad = percToRad(perc / 2);
        centerX = 0;
        centerY = 0;
        topX = centerX - this.length * Math.cos(thetaRad);
        topY = centerY - this.length * Math.sin(thetaRad);
        leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
        return 'M ' + leftX + ' ' + leftY + ' L ' + topX + ' ' + topY + ' L ' + rightX + ' ' + rightY;
    };

    return Needle;
}();