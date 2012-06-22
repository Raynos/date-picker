!function() {
	var template = Hogan.compile($('template').innerHTML)

	global.DatePicker = ctor;

	ctor.prototype =
		{ show: show
		, resolveSelector: resolveSelector
		, render: render
		};

	ctor.getOverflowPrev = getOverflowPrev;

	function ctor(container) {
		this.container = container;
		this.options =
			{ firstDay: 1 // 1 == monday
			, weekdays: [ 'sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat' ]
			};
	};
	function render() {
		var frag
		  , opts =
		    { showControls: true
		    , weekdays: [ 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun' ]
		    }

		frag = cfrag(template.render(opts));
		return frag;
	};

	function getOverflowPrev(now, opts) {
		var firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
		if(firstDayOfMonth.getDay() == opts.firstDay) {
			return [];
		}

		var previousMonth = new Date(now.getFullYear(), now.getMonth(), 0)
		  , year = previousMonth.getFullYear()
		  , month = previousMonth.getMonth()
		  , lastDate = previousMonth.getDate()

		  , currentDay = firstDayOfMonth.getDay()
		  , results = []
		  , i
		  , l = currentDay - opts.firstDay

		if(l < 0) l += 7;

		for(i = 0; i < l; i++) {
			var currentDate = (lastDate - l + i + 1).toString()
			results.push(
				{ date: currentDate
				, fullDate: year + '/' + padDate(month +1) + '/' + currentDate
				}
			);
		}
		return results;
	};
	function padDate(date) {
		date = +date;
		return date < 10 ? '0' + date : date.toString();
	};

	function show() {
		this.resolveSelector(this.container);
		this.container.innerHTML = '';
		this.container.appendChild(this.render());
	};
	function resolveSelector(sel) {
		if(typeof(this.container) === 'string') {
			this.container = $$(this.container)[0];
		}
		if(!this.container) {
			throw new Error('<' + sel + '> does not resolve to any element!');
		}
	};

	function cfrag(html) {
		var div = document.createElement('div')
		  , frag = document.createDocumentFragment()
		  , elm

		div.innerHTML = html;
		while(elm = div.firstChild) {
			frag.appendChild(elm);
		}
		return frag;
	};

	function $(id) {
		return document.getElementById(id);
	};
	function $$(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};
}();
