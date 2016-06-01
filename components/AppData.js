var AppData = function() {
	function AppData(instance_dataset) {
		var current_date = new Date();
		var label_percentages = [.6,.8,.9,1,1.2];

		var month_data = instance_dataset
			.filter(function(item) {
				var row_date = new Date(item.Date);
				return row_date.getFullYear()+'-'+row_date.getMonth() === current_date.getFullYear()+'-'+current_date.getMonth();
			});
		var month_actual = month_data
			.reduce(function(cum, new_item) {
				return cum + new_item.Actual
			}, 0);
		var month_target = month_data
			.reduce(function(cum, new_item) {
				return cum + new_item.Target
			}, 0);
		var month_zone_data = _(month_data).groupBy('Region')
			.mapValues(function(value, key) {
				return {
					"long": value[0].Long,
					"lat": value[0].Lat,
					"actual": _.sumBy(value, 'Actual'),
					"target": _.sumBy(value, 'Target')
				};
			})
			.value();

		var ytd_data = instance_dataset
			.filter(function(item) {
				var row_date = new Date(item.Date);
				return row_date.getFullYear()=== current_date.getFullYear() &&
					   row_date <= current_date;
			});
		var ytd_actual = ytd_data
			.reduce(function(cum, new_item) {
				return cum + new_item.Actual
			}, 0);
		var ytd_target = ytd_data
			.reduce(function(cum, new_item) {
				return cum + new_item.Target
			}, 0);
		var ytd_zone_data = _(ytd_data).groupBy('Region')
			.mapValues(function(value, key) {
				return {
					"lat": value[0].Lat,
					"long": value[0].Long,
					"actual": _.sumBy(value, 'Actual'),
					"target": _.sumBy(value, 'Target')
				};
			})
			.value();

		this.month = {
			data: month_data,
			overall_actual: month_actual,
			overall_target: month_target,
			overall_percent: month_actual / month_target,
			overall_labels: label_percentages.map(function(item){return item * month_target;}).map(function(item){return item.toFixed(1);}),
			zones: month_zone_data
		};
		this.ytd = {
			data: ytd_data,
			overall_actual: ytd_actual,
			overall_target: ytd_target,
			overall_percent: ytd_actual / ytd_target,
			overall_labels: label_percentages.map(function(item){return item * ytd_target;}).map(function(item){return item.toFixed(1);}),
			zones: ytd_zone_data
		};
		this.gauges = [
			{
				"type": "month",
				"chartTitle": "Month",
				"percent": this.month.overall_percent.toFixed(2),
				"value": this.month.overall_actual,
				"target": this.month.overall_target,
				"labels": this.month.overall_labels
			},
			{
				"type": "ytd",
				"chartTitle": "YTD",
				"percent": this.ytd.overall_percent.toFixed(2),
				"value": this.ytd.overall_actual,
				"target": this.ytd.overall_target,
				"labels": this.ytd.overall_labels
			} // ,
			// {
			//	 "chartTitle": "LE",
			//	 "percent": 1.7,
			//	 "value": 3.26,
			//	 "labels": [1,2,3,4,5]
			// }
		];
	}

	return AppData;
}();