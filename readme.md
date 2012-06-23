date-picker
============

A simple lightweight date-picker, with no external dependencies.

Open [example/index.html](example/index.html) to see it in effect.


Roadmap
-------

- <s>0.1</s>: Can render and navigate.
- <s>0.2</s>: Can emit events.
- 0.3: More options and customizability.
- 0.4: Popup and binding to input element.
- 0.5: Ender support.

- 1.0: All done and ready for prod-use.


Options
-------

It supports the following options (the values below are the defaults):

	{ weekStart: 1 // 1 == monday
	, weekdays: [ 'su', 'mo', 'tu', 'we', 'th', 'fr', 'sa' ]
	, months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
	, buttons: { next: 'Next', prev: 'Prev' }
	, date: new Date()
	}
