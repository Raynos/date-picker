date-picker
============

A simple lightweight date-picker, with no external dependencies.

Open [example/index.html](example/index.html) to see it in effect.


Roadmap
-------

- <s>0.1</s>: Can render and navigate.
- <s>0.2</s>: Can emit events.
- 0.3: Popup and binding to input element.
- 0.4: More options and customizability.
- 0.5: Ender support.
- 0.6: Full support for touch devices.

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


Special thanks
--------------

- [jQuery](http://jquery.com): For an otherwise great tool, and because I
  lifted some code from there (calculating the offset of an element).
