var locator = require('./../Locators/locators.json');
var test_data = require('./../TestData/test_data.json');
var GenericMethod = require('./genericMethods');
var deferred = protractor.promise.defer();
var expected = protractor.ExpectedConditions;
var expect = require('expect.js');
var fs = require('fs');
var Max_TimeOut = 30000;
var webLocator;

let pageObject = function () {

    this.OpenWebUrl = async function (url) {
        switch (url) {
            case 'Google Map':
                url = test_data.googlemap;
                break;

            default:
                console.log('No case match')
        }

        await browser.get(url);
        deferred.fulfill();
    }

    this.inputData = async function (searchValue, searchField) {
        switch (searchField) {
            case 'Search Google Maps':
                searchField = GenericMethod.SetLocator(locator.SearchOnGoogleMap);
                break;

            case 'Choose Starting Point':
                searchField = GenericMethod.SetLocator(locator.chooseStartPoint);
                break;

            default:
                console.log('No case match')
        }
        await browser.wait(expected.visibilityOf(searchField, Max_TimeOut));
        await browser.actions().mouseMove(searchField).perform();
        await searchField.sendKeys(searchValue);
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        deferred.fulfill();
    }

    this.verifyCoordinates = async function (place, expectedCoordinates) {
        switch (place) {
            case 'San Francisco, California':
                webLocator = GenericMethod.SetLocator(locator.Directions);
                break;

            default:
                console.log('No case match')
        }
        await browser.wait(expected.visibilityOf(webLocator, Max_TimeOut));
        await browser.actions().mouseMove(webLocator).perform();
        let actualCoordinate = await browser.getCurrentUrl()
        actualCoordinate = actualCoordinate.split("@")
        actualCoordinate = actualCoordinate[1].split("/")[0]
        expect(actualCoordinate).to.contain(expectedCoordinates);
        deferred.fulfill();
    }

    this.clickOnButton = async function (button) {
        switch (button) {
            case 'Direction':
                button = GenericMethod.SetLocator(locator.Directions);
                break;

            case 'Car icon':
                button = GenericMethod.SetLocator(locator.carIcon);
                break;

            default:
                console.log('No case match')
        }
        await browser.wait(expected.visibilityOf(button, Max_TimeOut));
        await browser.actions().mouseMove(button).perform();
        await button.click();
        deferred.fulfill();
    }

    this.verifyResultCount = async function (expectedCount, page) {
        switch (page) {
            case 'Left Panel':
                var allWebElement = "h1[class=section-directions-trip-title]"
                break;
            default:
                console.log('No case match')
        }
        await browser.wait(expected.visibilityOf(element(by.css(allWebElement)), Max_TimeOut));
        let actualCount = await element.all(by.css(allWebElement)).count();
        expect(actualCount).to.be.greaterThan(expectedCount);
        deferred.fulfill();
    }

    this.saveData = async function (filename) {
        var allWebElement = "div[class=section-directions-trip-description]"
        await browser.wait(expected.visibilityOf(element(by.css(allWebElement)), Max_TimeOut));
        var actualCount = await element.all(by.css(allWebElement)).count();
        for (var i = 0; i < actualCount; i++) {
            var data = null;
            let test = await element.all(by.css(allWebElement)).get(i).getText();
            data = '******************************* \n' + test + '\n'
            console.log(data)
            fs.appendFileSync(filename, data);
            if (actualCount == (i + 1)) {
                deferred.fulfill();
            }
    }
}

}
module.exports = new pageObject;