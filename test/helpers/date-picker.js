fakeDOM();

require('../../src/dp')

module.exports = global.DatePicker;

// This function fakes the DOM in order to do unit-tests in node.js
function fakeDOM() {
	global.document =
		{ createDocumentFragment: createDocumentFragment
		, createElement: createElement
		, querySelectorAll: function() { return [] }
		, querySelector: function() { return null }
		, body: createElement('body')
		, documentElement: createElement('documentElement')
		};
};

function createElement(elementName) {
	return (
		{ appendChild: function() {}
		, tagName: elementName.toUpperCase()
		, dataset: {}
		, querySelector: function() { return null }
		, querySelectorAll: function() { return [] }
		, getBoundingClientRect: function() {}
		, ownerDocument: global.document
		, style: {}
		, parentNode: { removeChild: function() {} }
		}
	);
};

function createDocumentFragment() {
	return this.fakeDocFrag ||
		{ appendChild: function() {}
		, querySelector: function() { return null }
		, querySelectorAll: function() { return [] }
		};
};
