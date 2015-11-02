var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

InfoludekPage = function InfoludekPage(driver) {
	this.driver = driver;
	this.url = 'http://ogloszenia.infoludek.pl/ogloszenia/kategorie/short/praca.xhtml';
	this.elems = By.className('OP_short');
	this.view = By.id('widok_prosty');
	this.selector = By.className('MM_pg_selekt');
}; 

InfoludekPage.prototype.open = function() {
	this.driver.get(this.url);
	return webdriver.promise.fulfilled(true);
}; 

InfoludekPage.prototype.set_display = function(count) {
	this.driver.findElement(this.selector).sendKeys(count);	
	return webdriver.promise.fulfilled(true);
};

InfoludekPage.prototype.wait_until_loaded = function() {
	var d = webdriver.promise.defer();
	this.driver.wait(until.elementLocated(this.selector), 10000).then(function(present) {
		d.fulfill(present);
	});
	return d.promise;
};

InfoludekPage.prototype.focus = function(query) {
	this.driver.findElement(this.view).click();	
	this.driver.sleep(2000);
	return webdriver.promise.fulfilled(true);
};

InfoludekPage.prototype.count_elements = function() {
	return this.driver.findElements(this.elems);
};

module.exports = InfoludekPage;