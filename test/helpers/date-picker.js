fakeDOM();

require('../../src/dp')

module.exports = global.DatePicker;

// This function fakes the DOM in order to do unit-tests in node.js
function fakeDOM() {
	global.document =
		{ createDocumentFragment: createDocumentFragment
		, createElement: createElement
		, querySelectorAll: sinon.stub()
		, querySelector: sinon.stub()
		};

	document.querySelector.returns(null);
	document.querySelectorAll.returns([]);
};

function createElement(elementName) {
	return (
		{ appendChild: function() {}
		, tagName: elementName.toUpperCase()
		}
	);
};

function createDocumentFragment() {
	return (
		{ appendChild: function() {}
		}
	);
};
