describe('unit/ctor.spec.js', function() {
	var ctor = require('../helpers/date-picker')

	describe('When calling ctor', function() {
		it('should give the same result if called with or without new', function() {
			var withNew = new ctor()
			  , without = ctor()

			expect(withNew).to.have.property('show').and.be.a('function');
			expect(without).to.have.property('show').and.be.a('function');
		});
	});
});
