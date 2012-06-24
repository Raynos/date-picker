There are a number of external functions on the DatePicker, that allows for
some measure of control.

When it comes to the look-and-feel, even more control can be achieved by
overriding the css.


Exposed non-public methods
--------------------------

First off, there are more exposed methods than should be used normally; they are
exposed for testing purposes to allow unit tests to get into the system, and for
extreme flexibility, where a developer might want to override standard functions.

I will not cover those here, and instead refer to the source code.


Exposed methods
---------------

Instead, the following methods are safe for use:

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
