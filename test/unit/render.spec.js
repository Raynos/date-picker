describe('unit/render.spec.js', function() {
	var ctor = require('../helpers/date-picker')
	  , dp

	beforeEach(function() {
		dp = ctor();
	});
	afterEach(function() {
		document.fakeDocFrag = null;
	});

	describe('When adding event listeners', function() {
		var next
		  , prev
		  , cells

		beforeEach(function() {
			document.fakeDocFrag = document.createDocumentFragment();

			next = {};
			prev = {};
			cells = {};

			document.fakeDocFrag.querySelector.withArgs('.fzk-dp-btn-nxt').returns(next);
			document.fakeDocFrag.querySelector.withArgs('.fzk-dp-btn-prv').returns(prev);
			document.fakeDocFrag.querySelector.withArgs('.fzk-dp-cells').returns(cells);

			dp.render();
		});

		it('should bind onclick to next', function() {
			expect(next).to.have.property('onclick').and.to.be.a('function');
		});
		it('should bind onclick to prev', function() {
			expect(prev).to.have.property('onclick').and.to.be.a('function');
		});
		it('should bind onclick to cells', function() {
			expect(cells).to.have.property('onclick').and.to.be.a('function');
		});
	});

	describe('When clicking on a "cell"', function() {
		var cells
		  , fakeEvent

		beforeEach(function() {
			fakeEvent =
				{ target: document.createElement('span')
				};
			cells = {};

			document.fakeDocFrag = document.createDocumentFragment();
			document.fakeDocFrag.querySelector.returns({});
			document.fakeDocFrag.querySelector.withArgs('.fzk-dp-cells').returns(cells);

			dp.render();
		});
		it('should call "change" listener when clicking on cell', function() {
			var changeSpy = sinon.spy()

			fakeEvent.target.dataset.date = '2012/06/02';

			dp.on('change', changeSpy);
			cells.onclick(fakeEvent);

			expect(changeSpy).to.have.been.called;
		});
		it('should not emit "show" event', function() {
			var showSpy = sinon.spy()

			dp.on('show', showSpy);
			cells.onclick(fakeEvent);

			expect(showSpy).not.to.have.been.called;
		});
	});

	describe('When calling rerender()', function() {
		var container
		  , frag
		beforeEach(function() {
			frag = document.createDocumentFragment();
			document.fakeDocFrag = frag;
			document.fakeDocFrag.querySelector.returns({});

			container = document.createElement('div');

			dp.container = container;
			dp.rerender();
		});
		it('should add the fragment from render() to "this.container"', function() {
			expect(container.appendChild).to.have.been.calledWith(frag);
		});
	});
});
