var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

GoogleSearch = function GoogleSearch(driver) {
	this.driver = driver;
	this.url = 'http://www.google.pl/';
	this.query_field = By.name('q');
	this.search_button = By.name('btnG');
	this.loaded = By.id('abar_button_opt');


}; 

GoogleSearch.prototype.open = function() {
	this.driver.get(this.url);
	return webdriver.promise.fulfilled(true);
}; 

GoogleSearch.prototype.search_for = function(query) {
	this.driver.findElement(this.query_field).sendKeys(query);	
	this.driver.findElement(this.query_field).sendKeys(webdriver.Key.RETURN);	
	return webdriver.promise.fulfilled(true);
};

GoogleSearch.prototype.wait_until_loaded = function() {
	var d = webdriver.promise.defer();
	this.driver.wait(until.elementLocated(this.loaded), 10000).then(function(present) {
		d.fulfill(present);
	});
	return d.promise;
};

GoogleSearch.prototype.click_search = function() {
	this.driver.findElement(this.search_button).click();	
	return webdriver.promise.fulfilled(true);
};

GoogleSearch.prototype.get_answer = function() {
	var d = webdriver.promise.defer();
	this.driver.findElement(this.out).getText().then(function(text) {
		d.fulfill(text);
	});
	return d.promise;
};

module.exports = GoogleSearch;