fakeDOM();

require('../../src/dp')

module.exports = global.DatePicker;

// This function fakes the DOM in order to do unit-tests in node.js
function fakeDOM() {
	global.document =
		{ createDocumentFragment: createDocumentFragment
		, createElement: createElement
		, querySelectorAll: createQuerySelectorAll()
		, querySelector: createQuerySelector()
		};
};

function createQuerySelectorAll() {
	var func = sinon.stub();
	func.returns([]);
	return func;
};
function createQuerySelector() {
	var func = sinon.stub();
	func.returns(null);
	return func;
};

function createElement(elementName) {
	return (
		{ appendChild: sinon.spy()
		, tagName: elementName.toUpperCase()
		, dataset: {}
		, querySelector: createQuerySelector()
		, querySelectorAll: createQuerySelectorAll()
		}
	);
};

function createDocumentFragment() {
	return this.fakeDocFrag ||
		{ appendChild: function() {}
		, querySelector: createQuerySelector()
		, querySelectorAll: createQuerySelectorAll()
		};
};
