describe('unit/render.spec.js', function() {
	var ctor = require('../helpers/date-picker')
	  , dp
	  , inputElm

	beforeEach(function() {
		dp = ctor({ dateFormat: 'd - M - y' });
		document.fakeDocFrag = document.createDocumentFragment();
		document.fakeDocFrag.querySelector.returns(document.createElement('button'));
		inputElm = document.createElement('input');
		inputElm.getBoundingClientRect.returns({ top: 0, left: 0 });
	});
	afterEach(function() {
		document.fakeDocFrag = null;
	});

	describe('When showing on an input', function() {
		beforeEach(function() {
			inputElm.value = '04 - 2 - 2012';
			sinon.spy(ctor, 'parseDate');
			dp.show(inputElm);
		});
		afterEach(function() {
			ctor.parseDate.restore();
		});
		it('should attach to body', function() {
			expect(document.body.appendChild).to.have.been.called;
		});
		it('should use the input-value', function() {
			expect(ctor.parseDate).to.have.been.calledWith('04 - 2 - 2012');
		});
	});
	describe('When clicking a cell', function() {
		var fakeEvent
		  , cells

		beforeEach(function() {
			cells = document.createElement('div');
			document.fakeDocFrag.querySelector.withArgs('.fzk-dp-cells').returns(cells);

			fakeEvent =
				{ target: document.createElement('span')
				};
			fakeEvent.target.dataset.date = '2012/04/05';

			dp.show(inputElm);
		});
		it('should update the input', function() {
			cells.onclick(fakeEvent);
			expect(inputElm.value).to.equal('05 - 4 - 2012');
		});
	});
});
