!function() {
	var template = Hogan.compile($('template').innerHTML)

	this.DatePicker = ctor;

	ctor.prototype =
		{ show: show
		, resolveSelector: resolveSelector
		, render: render
		, nextMonth: nextMonth
		, prevMonth: prevMonth
		, dateCellClicked: dateCellClicked
		};

	ctor.getCurrentMonth = getCurrentMonth;
	ctor.getOverflowNext = getOverflowNext;
	ctor.getOverflowPrev = getOverflowPrev;

	function ctor(container) {
		this.container = container;
		this.options =
			{ weekStart: 1 // 1 == monday
			, weekdays: [ 'su', 'mo', 'tu', 'we', 'th', 'fr', 'sa' ]
			, months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
			, date: new Date()
			};

		[ 'nextMonth'
		, 'prevMonth'
		, 'dateCellClicked'
		]
			.forEach(function(func) {
				this[func] = this[func].bind(this);
			}, this)
	};

	function dateCellClicked(event) {
		var elm = event.target
		  , date = elm.dataset.date

		if(!date) {
			return;
		}

		date = date.split('/');

		this.options.date.setFullYear(date[0]);
		this.options.date.setMonth(date[1]-1);
		this.options.date.setDate(date[2]);
		this.show();
	};
	function nextMonth() {
		this.options.date.setMonth(this.options.date.getMonth() + 1);
		this.show();
	};
	function prevMonth() {
		this.options.date.setMonth(this.options.date.getMonth() - 1);
		this.show();
	};

	function render() {
		var frag
		  , now = this.options.date
		  , opts =
		    { weekdays: getWeekdays(this.options)
		    , 'prev-month': getOverflowPrev(now, this.options)
		    , 'next-month': getOverflowNext(now, this.options)
		    , 'cur-month': getCurrentMonth(now)
		    , 'current': this.options.months[now.getMonth()] + ' ' + now.getFullYear()
		    }

		frag = cfrag(template.render(opts));
		$$('.fzk-dp-btn-nxt', frag)[0].onclick = this.nextMonth;
		$$('.fzk-dp-btn-prv', frag)[0].onclick = this.prevMonth;
		$$('.fzk-dp-cells', frag)[0].onclick = this.dateCellClicked;
		return frag;
	};

	function getWeekdays(opts) {
		var days = []
		  , i
		  , current = opts.weekStart

		for(i = 0; i < 7; i++) {
			days[i] = opts.weekdays[current++];
			if(current == 7) current = 0;
		};

		return days;
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
		  , current = 1

		if(i < 0) {
			i += 7
		}

		for(; i < l; i++) {
			var date = padDate(current++)
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
		this.container.className += ' fzk-dp';
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
		return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
	};
}();
