<link href=lib/dp.css rel=stylesheet>

<script src=lib/dp.js>
</script>


Static date-pickers
-------------------

To show a static, always-present, date picker, simply create it and point it at
a container element.

Please note that we can easily register to get the selected date.

	Date-picker goes here:
	<div id=container></div>
	<div id=result></div>

	<script>
	new DatePicker().show('#container').on('change', function(date) {
		document.getElementById('result').innerHTML = date.toString();
	});
	</script>

It will produce the following content:

<div class="example">

Date-picker goes here:
<div id=container></div>
<div id=result></div>

<script>
new DatePicker().show('#container').on('change', function(date) {
	document.getElementById('result').innerHTML = date.toString();
});
</script>

</div>

------

To have a date-picker that automatically picks up the content of an input-field,
simply point it at an input-field instead of a container-element.

We do have to open the date-picker manually, either by having a button for it or
by registering `onblur` and `onfocus` on the input.

	Date-picker goes here:
	<input name=date value="15-02-2012">
	<button onclick="dp.toggle('input[name=date]')">Toggle date-picker</button>

	<script>
	var dp = new DatePicker({ dateFormat: 'd-m-y' })
	</script>

<div class="example">
	Date-picker goes here:
	<input name=date value="15-02-2012">
	<button onclick="dp.toggle('input[name=date]')">Toggle date-picker</button>

	<script>
	var dp = new DatePicker({ dateFormat: 'd-m-y' })
	</script>
</div>

It automatically picks up the current value in the text-field, and puts the
selected value back in there.

------

The DatePicker can also be used for formatting and parsing dates:

	var date = DatePicker.parseDate('2012/05/30', 'y/m/d')
