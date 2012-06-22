describe('unit/dp.spec.js', function() {
	var dp
	before(function() {
		global.Hogan = { compile: sinon.stub() };
		global.document = { getElementById: sinon.stub() };
		global.document.getElementById.returns({});
		require('../../src/dp')
		dp = global.DatePicker;
	});
	describe('When calling getOverflowPrev() with first-of-week being monday', function() {
		var result
		describe('and the first is a sunday', function() {
			beforeEach(function() {
				var now = new Date('2012-01-01T12:00:00Z')
				  , opts =
				    { firstDay: 1 }
				result = dp.getOverflowPrev(now, opts)
			});
			it('should return six days', function() {
				expect(result.length).to.equal(6);
			});
			it('should date the days properly', function() {
				expect(result).to.approximate(
					[ { date: '26'
					  , fullDate: '2011/12/26'
					  }
					, { date: '27'
					  , fullDate: '2011/12/27'
					  }
					, { date: '28'
					  , fullDate: '2011/12/28'
					  }
					, { date: '29'
					  , fullDate: '2011/12/29'
					  }
					, { date: '30'
					  , fullDate: '2011/12/30'
					  }
					, { date: '31'
					  , fullDate: '2011/12/31'
					  }
					]
				);
			});
		});
		describe('and the first is a wednesday', function() {
			beforeEach(function() {
				var now = new Date('2012-02-01T12:00:00Z')
				  , opts =
				    { firstDay: 1 }
				result = dp.getOverflowPrev(now, opts)
			});
			it('should return two days', function() {
				expect(result.length).to.equal(2);
			});
			it('should date the days properly', function() {
				expect(result).to.approximate(
					[ { date: '30'
					  , fullDate: '2012/01/30'
					  }
					, { date: '31'
					  , fullDate: '2012/01/31'
					  }
					]
				);
			});
		});
		describe('and the first is the first of the week', function() {
			beforeEach(function() {
				var now = new Date('2012-10-01T12:00:00Z')
				  , opts =
				    { firstDay: 1 }
				result = dp.getOverflowPrev(now, opts)
			});
			it('should return an empty array', function() {
				expect(result).to.deep.equal([]);
			});
		});
	});
});
