var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

CalculatorPage = function CalculatorPage(driver) {
	this.driver = driver;
	this.url = 'http://www.calculator.net/';
	this.out = By.id('sciOutPut');
	this.key0 = By.css("span[onclick*='r(0)']");
	this.key1 = By.css("span[onclick*='r(1)']");
	this.key2 = By.css("span[onclick*='r(2)']");
	this.key3 = By.css("span[onclick*='r(3)']");
	this.key4 = By.css("span[onclick*='r(4)']");
	this.key5 = By.css("span[onclick*='r(5)']");
	this.key6 = By.css("span[onclick*='r(6)']");
	this.key7 = By.css("span[onclick*='r(7)']");
	this.key8 = By.css("span[onclick*='r(8)']");
	this.key9 = By.css("span[onclick*='r(9)']");
	this.key_divide = By.xpath("//span[contains(.,'÷')]");
	this.key_sqrt = By.css('span[onclick*="r(\'sqrt\')"]');
	this.key_fact = By.css('span[onclick*="r(\'n!\')"]');
	this.key_pi = By.css('span[onclick*="r(\'pi\')"]');
	this.key_sign = By.xpath("//span[contains(.,'±')]");
	this.key_plus = By.xpath("//span[contains(.,'+')]");
	this.key_clear = By.xpath("//span[contains(.,'C')]");
	this.key_eq = By.xpath("//span[contains(.,'=')]");
	this.key_MS =By.xpath("//span[contains(.,'MS')]");
	this.key_MR = By.xpath("//span[contains(.,'MR')]");
	this.key_MC = By.xpath("//span[contains(.,'MC')]");
	this.key_MADD = By.xpath("//span[contains(.,'M+')]");
}; 

CalculatorPage.prototype.open = function() {
	this.driver.get(this.url);
	return webdriver.promise.fulfilled(true);
}; 

CalculatorPage.prototype.wait_until_loaded = function() {
	var d = webdriver.promise.defer();
	this.driver.wait(until.elementLocated(this.out), 10000).then(function(present) {
		d.fulfill(present);
	});
	return d.promise;
};

CalculatorPage.prototype.click_button = function(button) {
	this.driver.findElement(button).click();
	return webdriver.promise.fulfilled(true);
};

CalculatorPage.prototype.get_answer = function() {
	var d = webdriver.promise.defer();
	this.driver.findElement(this.out).getText().then(function(text) {
		d.fulfill(text);
	});
	return d.promise;
};

module.exports = CalculatorPage;