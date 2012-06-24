<style>
@import url(https://raw.github.com/fizker/date-picker/master/src/dp.css);
</style>

Static date-pickers
-------------------

To show a static, always-present, date picker, simply create it and point it at
a container element:

	Date-picker goes here:
	<div id=container></div>

	<script>
	new DatePicker().show('#container')
	</script>

It will produce the following content:

-----

Date-picker goes here:
<div id=container></div>

-----

<script src=https://raw.github.com/fizker/date-picker/master/src/dp.js></script>
<script>
new DatePicker().show('#container')

</script>