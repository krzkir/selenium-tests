var InfoludekPage = require('./pages/InfoludekPage');
var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until,
test = require('selenium-webdriver/testing');
var should = require('chai').should();

test.describe('infoludek - changing elements display count', function() {
	var driver;
	this.timeout(20000);

	test.before(function() {
		driver = new webdriver.Builder()
		.forBrowser('firefox')
		.build();
		infoludekPage = new InfoludekPage(driver);
	});
	test.beforeEach(function(){
		infoludekPage.open();
		infoludekPage.wait_until_loaded();
	});

	test.it('should display 20 elements on page by default', function() {
		infoludekPage.count_elements().then(function(elem){
			(elem.length).should.equal(20);
		});
	});

	test.it('should display 50 elements on page after selecting 50 elements', function() {
		infoludekPage.set_display("50");
		infoludekPage.focus();
		infoludekPage.count_elements().then(function(elem){
			(elem.length).should.equal(50);
		});
	});

	test.it('should display 100 elements on page after selecting 100 elements', function() {
		infoludekPage.set_display("100");
		infoludekPage.focus();
		infoludekPage.count_elements().then(function(elem){
			(elem.length).should.equal(100);
		});
	});

	test.after(function() {
		driver.quit();
	});
});

