describe('unit/dp.spec.js', function() {
	var dp
	before(function() {
		global.Hogan = { compile: sinon.stub() };
		global.document = { getElementById: sinon.stub() };
		global.document.getElementById.returns({});
		require('../../src/dp')
		dp = global.DatePicker;
	});
	describe('When calling getOverflowNext() with weeks starting on wednesday', function() {
		var result
		  , opts
		beforeEach(function() {
			opts =
				{ weekStart: 3 }
		});
		describe('and the last day is a thursday', function() {
			beforeEach(function() {
				var now = new Date('2012-05-01T12:00:00Z')
				result = dp.getOverflowNext(now, opts)
			});
			it('should return three days', function() {
				expect(result.length).to.equal(5);
			});
		});
		describe('and the last day is a saturday', function() {
			beforeEach(function() {
				var now = new Date('2012-03-01T12:00:00Z')
				result = dp.getOverflowNext(now, opts)
			});
			it('should return three days', function() {
				expect(result.length).to.equal(3);
			});
		});
		describe('and the last day is a wednesday', function() {
			beforeEach(function() {
				var now = new Date('2012-02-01T12:00:00Z')
				result = dp.getOverflowNext(now, opts)
			});
			it('should return six days', function() {
				expect(result.length).to.equal(6);
			});
			it('should date the days properly', function() {
				expect(result).to.approximate(
					[ { date: '01'
					  , fullDate: '2012/03/01'
					  }
					, { date: '02'
					  , fullDate: '2012/03/02'
					  }
					, { date: '03'
					  , fullDate: '2012/03/03'
					  }
					, { date: '04'
					  , fullDate: '2012/03/04'
					  }
					, { date: '05'
					  , fullDate: '2012/03/05'
					  }
					, { date: '06'
					  , fullDate: '2012/03/06'
					  }
					]
				);
			});
		});
		describe('and the last day is a tuesday', function() {
			beforeEach(function() {
				var now = new Date('2012-01-01T12:00:00Z')
				result = dp.getOverflowNext(now, opts)
			});
			it('should return an empty array', function() {
				expect(result).to.deep.equal([]);
			});
		});
	});

	describe('When calling getOverflowPrev() with weeks starting on monday', function() {
		var result
		  , opts

		beforeEach(function() {
			opts =
			  { weekStart: 1 }
		});

		describe('and the first is a sunday', function() {
			beforeEach(function() {
				var now = new Date('2012-01-01T12:00:00Z')
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
				result = dp.getOverflowPrev(now, opts)
			});
			it('should return an empty array', function() {
				expect(result).to.deep.equal([]);
			});
		});
	});
});
