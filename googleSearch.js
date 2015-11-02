var GoogleSearch = require('./pages/GoogleSearch');
var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until,
test = require('selenium-webdriver/testing');
var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;

test.describe('Google Search page - various title assertion methods', function() {
	var driver;
	this.timeout(10000);
	var query="selenium"
	var page_title=" - Szukaj w Google";

	test.before(function() {
		driver = new webdriver.Builder()
		.forBrowser('firefox')
		.build();
		googleSearch = new GoogleSearch(driver);
	});

	test.beforeEach(function(){
		googleSearch.open();
		googleSearch.search_for(query).then(function(title){
			googleSearch.wait_until_loaded();
		});
	});

	test.it('assert title using chai.should()', function() {
		driver.getTitle().then(function(title){
			title.should.equal(query+page_title);
		});
	});

	test.it('assert title using chai.expect', function() {
		driver.getTitle().then(function(title){
			expect(title).to.equal(query+page_title);
		});
	});

	test.it('assert title using chai.assert', function() {
		driver.getTitle().then(function(title){
			assert.equal(title,query+page_title);
		});
	});

	test.it('assert title using until.titleIs', function() {
		driver.wait(until.titleIs(query+page_title), 10000);
	});

	test.after(function() {
		driver.quit();
	});
});