There are a number of external functions on the DatePicker, that allows for
some measure of control.

When it comes to the look-and-feel, even more control can be achieved by
overriding the css.


Exposed non-public methods
--------------------------

There are more exposed methods than should be used normally; they are exposed
for testing purposes to allow unit tests to get into the system, and for extreme
flexibility, where a developer might want to override standard functions.

These methods will not be covered here, but can instead be found by [looking at
the code](https://github.com/fizker/date-picker/blob/master/src/dp.js).


Exposed methods
---------------

The methods that are exposed as public, and thus relatively stable, are described
below.


### Static methods

The following methods are currently available directly on the constructor,
without requiring a new instance first.

<table class="ex-methods">
<tr>
	<td>formatDate(date, format)
	<td>Returns a string-version of the date based on the given format.
<tr>
	<td>parseDate(dateString, format)
	<td>Parses a string and returns a date based on the given format.
</table>

They are called in the following fashion:

	var date = new Date()
	DatePicker.formatDate(date, 'y-m-d');


### Creating the date-picker

The constructor can take the following options:

<table class="ex-methods">
<tr>
	<td>elm
	<td>An element to bind to. This can be a real DOM element or a CSS selector
	  pointing at an element.<br>
	  It is an alternativ to passing the element through
	  <code>#show([selector])</code> or <code>#toggle([selector])</code>.
<tr>
	<td>dateFormat
	<td>A format-string signifying how the code should interpret and print out
	  dates in input-fields.<br>
	  It supports the following keys (example date being 2012/05/07):
	  <table class="ex-methods">
	  <tr>
	    <td>d
	    <td>Day with leading zero (07)
	  <tr>
	    <td>D
	    <td>Day without leading zero (7)
	  <tr>
	    <td>m
	    <td>Month with leading zero (05)
	  <tr>
	    <td>M
	    <td>Month without leading zero (5)
	  <tr>
	    <td>y
	    <td>Year with 4 digits (2012)
	  <tr>
	    <td>Y
	    <td>Year with 2 digits (12)
	  </table>
	  Any other characters will be printed as listed. It defaults to
	  <code>y/m/d</code>.
<tr>
	<td>weekStart
	<td>A number signifying the first day of the week. It goes from <code>0</code>
	  (sunday) to <code>6</code> (saturday) and defaults to <code>1</code>
	  (monday). It corresponds to calling <code>Date#getDay()</code> on a
	  javascript date object.
<tr>
	<td>weekdays
	<td>A list of localized day-names that should be shown above the day-cells.
	  It should start with sunday on index 0, and end with saturday on index 6.
	  It should not be much more than 2 letters of text, as that is approximately
	  what there is room for. It defaults to <code>[ 'su', 'mo', 'tu', 'we',
	  'th', 'fr', 'sa' ]</code>.
<tr>
	<td>months
	<td>A localized list of month names. It starts with January on index 0 and
	  ends with December on index 11. It defaults to <code>[ 'Jan', 'Feb',
	  'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
	  'Dec' ]</code>.
<tr>
	<td>buttons
	<td>Localized texts for the three buttons in the UI (Next month, previous
	  month, close). It defaults to <code>{ next: 'Next', prev: 'Prev', close:
	  '×' }</code>. Empty strings are perfectly acceptable, if CSS will be
	  controlling the look (for example with background images).
<tr>
	<td>date
	<td>The date to initialize the date-picker with. It defaults to the current
	  date, or if bound to an input-element, the parsed version of the
	  input-value.
<tr>
	<td>floatingOverlay
	<td>A bool telling if the floating date picker should put an overlay behind
	  that closes it when clicked. If <code>false</code> (the default), it will
	  only close when a date is selected, the user clicks the close button, or
	  <code>#hide()</code> or <code>#toggle()</code> is called via the API.<br>
	  It is only applicable if the date picker is bound to an input-element, and
	  thus floating.
</table>

It is used in this fashion:

	var options =
		{ dateFormat: 'y-m-d'
		, buttons: { next: '&rarr;', prev: '&larr;', close: 'X' }
		}
	var dp = new DatePicker(options);


### Displaying

<table class="ex-methods">
<tr>
	<td>show([selector])
	<td>Shows the date picker, and attaches it to the last given
	element. Alternatively, an element or css-selector can be supplied for the
	picker to attach to.
<tr>
	<td>hide()
	<td>Hides the date picker.
<tr>
	<td>toggle([selector])
	<td>Toggles between <code>show()</code> and <code>hide()</code> based on
	  the current state. If the picker is currently showing, and
	  <code>selector</code> refers to a different element, it will show at that
	  new element instead of hiding.
<tr>
	<td>render()
	<td>Creates the picker with DOM nodes and returns a document-fragment
	  with the contents. It will not be attached to anything by
	  <code>render()</code>. Internally, this is done by <code>show()</code>.
</table>


	<input name=date>
	<button onclick="dp.toggle('input[name=date]');">Toggle</button>


### Events

The way to get information back out of the DatePicker, especially based on user
actions, is through events. It is possible to register and unregister events
using the `on()` and `off()` functions as shown below:

<table class="ex-methods">
<tr>
	<td>on(event, callback)
	<td>Adds a callback for an event. It throws if <code>callback</code> is not
	  a function.
<tr>
	<td>off(event, callback)
	<td>Removes the specified callback for the named event.
<tr>
	<td>emit(event, [parameters, ..])
	<td>Sends the <code>event</code> to all listeners, passing the parameters
	  as well.
<tr>
	<td>trigger(event, [parameters, ..])
	<td>Synonym for <code>emit()</code>
</table>

The DatePicker currently emits the following events:

<table class="ex-methods">
<tr>
	<td>change
	<td>When a user selects a date. If the DatePicker is attached to an input,
	  this will happen just after the input have been updated.
<tr>
	<td>show
	<td>Emitted after the date-picker appears, or is moved to a new container.
	  This is bound to the <code>show()</code> function.
<tr>
	<td>hide
	<td>Emitted after the date-picker is hidden. This is bound to the
	  <code>hide()</code> function.
</table>
