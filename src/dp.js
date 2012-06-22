!function(global) {
	var template = Hogan.compile($('template').innerHTML)

	global.DatePicker = ctor;

	ctor.prototype =
		{ show: show
		, resolveSelector: resolveSelector
		, render: render
		};

	function ctor(container) {
		this.container = container;
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
}(this);
