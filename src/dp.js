!function() {
	var template = Hogan.compile($('template').innerHTML)

	global.DatePicker = ctor;

	ctor.prototype =
		{ show: show
		, resolveSelector: resolveSelector
		, render: render
		};

	ctor.getCurrentMonth = getCurrentMonth;
	ctor.getOverflowNext = getOverflowNext;
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

	function getCurrentMonth(now, opts) {
		var year = now.getFullYear()
		  , month = padDate(now.getMonth() + 1)
		  , day = now.getDate()
		  // we do not need to subtract one here, since that has already been done
		  , lastDay = new Date(year, +month, 0).getDate()
		  , days = []
		  , i

		for(i = 1; i <= lastDay; i++) {
			var date = padDate(i)
			days.push(
				{ date: date
				, fullDate: year + '/' + month + '/' + date
				, current: day === i
				}
			);
		}

		return days;
	};
	function getOverflowPrev(now, opts) {
		var firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
		if(firstDayOfMonth.getDay() == opts.weekStart) {
			return [];
		}

		var previousMonth = new Date(now.getFullYear(), now.getMonth(), 0)
		  , year = previousMonth.getFullYear()
		  , month = padDate(previousMonth.getMonth() + 1)
		  , lastDate = previousMonth.getDate()

		  , currentDay = firstDayOfMonth.getDay()
		  , results = []
		  , i
		  , l = currentDay - opts.weekStart

		if(l < 0) l += 7;

		for(i = 0; i < l; i++) {
			var currentDate = (lastDate - l + i + 1).toString()
			results.push(
				{ date: currentDate
				, fullDate: year + '/' + month + '/' + currentDate
				}
			);
		}
		return results;
	};
	function getOverflowNext(now, opts) {
		var firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth()+1, 1)
		if(firstDayOfNextMonth.getDay() == opts.weekStart) {
			return [];
		}

		var year = firstDayOfNextMonth.getFullYear()
		  , month = padDate(firstDayOfNextMonth.getMonth() +1)

		  , result = []
		  , i = firstDayOfNextMonth.getDay() - opts.weekStart
		  , l = 7

		if(i < 0) {
			i += 7
		}

		for(; i < l; i++) {
			var date = padDate(i)
			result.push(
				{ date: date
				, fullDate: year + '/' + month + '/' + date
				}
			);
		}

		return result;
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
