var CalculatorPage = require('./pages/Calculator');
var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until,
test = require('selenium-webdriver/testing');
var should = require('chai').should();


test.describe('calculator.net -  basic functionalities', function() {
	var driver;
	this.timeout(10000);

	test.before(function() {
		driver = new webdriver.Builder()
		.forBrowser('firefox')
		.build();
		calculatorPage = new CalculatorPage(driver);
		calculatorPage.open();
		calculatorPage.wait_until_loaded();
	});

	test.it('cannot divide by zero ',function() {
		calculatorPage.click_button(calculatorPage.key7);
		calculatorPage.click_button(calculatorPage.key_divide);
		calculatorPage.click_button(calculatorPage.key0);		
		calculatorPage.click_button(calculatorPage.key_eq);	
		calculatorPage.get_answer().then(function(txt){
			txt.should.equal("Error");
		});
	});

	test.it('cannot calculate square root of -1',function() {
		calculatorPage.click_button(calculatorPage.key1);
		calculatorPage.click_button(calculatorPage.key_sign);
		calculatorPage.click_button(calculatorPage.key_sqrt);
		calculatorPage.get_answer().then(function(txt){
			txt.should.equal("Error");
		});
	});

	test.it('cannot calculate factorial of -1',function() {
		calculatorPage.click_button(calculatorPage.key1);
		calculatorPage.click_button(calculatorPage.key_sign);
		calculatorPage.click_button(calculatorPage.key_fact);
		calculatorPage.get_answer().then(function(txt){
			txt.should.equal("Error");
		});
	});


	test.it('adding 1 and 1 equals 2 ',function() {
		calculatorPage.click_button(calculatorPage.key1);
		calculatorPage.click_button(calculatorPage.key_plus);
		calculatorPage.click_button(calculatorPage.key1);
		calculatorPage.click_button(calculatorPage.key_eq);
		calculatorPage.get_answer().then(function(txt){
			txt.should.equal("2.");
		});
	});


	test.it('cannot input more than 11 digits',function() {
		for(var i=0;i<15;i++){
			calculatorPage.click_button(calculatorPage.key1);
		}
		calculatorPage.get_answer().then(function(txt){
			(txt.length).should.equal(11);
		});
	});

	test.it('pressing C should clear input box',function() {
		for(var i=0;i<10;i++){
			calculatorPage.click_button(calculatorPage.key1);
		}
		calculatorPage.click_button(calculatorPage.key_clear);
		calculatorPage.get_answer().then(function(txt){
			txt.should.equal("0.");
		});
	});

	test.it('pressing MR should return previously saved value',function() {
		for(var i=0;i<2;i++){
			calculatorPage.click_button(calculatorPage.key1);
		}
		calculatorPage.click_button(calculatorPage.key_MS);
		calculatorPage.click_button(calculatorPage.key_clear);
		calculatorPage.click_button(calculatorPage.key_MR);
		calculatorPage.get_answer().then(function(txt){
			txt.should.equal("11.");
		});
	});

	test.it('pressing MC should clear memory',function() {
		for(var i=0;i<2;i++){
			calculatorPage.click_button(calculatorPage.key5);
		}
		calculatorPage.click_button(calculatorPage.key_MS);
		calculatorPage.click_button(calculatorPage.key_MC);
		calculatorPage.click_button(calculatorPage.key_MR);
		calculatorPage.get_answer().then(function(txt){
			txt.should.equal("0.");
		});
	});

	test.it('adding in memory should work',function() {
		for(var i=0;i<2;i++){
			calculatorPage.click_button(calculatorPage.key5);
		}
		calculatorPage.click_button(calculatorPage.key_MADD);
		calculatorPage.click_button(calculatorPage.key5);
		calculatorPage.click_button(calculatorPage.key_MADD);
		calculatorPage.click_button(calculatorPage.key_MR);
		calculatorPage.get_answer().then(function(txt){
			txt.should.equal("60.");
		});
	});

	test.it('pressing π should return the value of PI',function() {
		calculatorPage.click_button(calculatorPage.key_pi);
		calculatorPage.get_answer().then(function(txt){
			txt.should.equal("3.1415926536");
		});
	});

	test.after(function() {
		driver.quit();
	});
});