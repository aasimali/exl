let pageObjectFile = require('./Pages/pageObject.js')

module.exports = function () {

    /************************************************************ This method opens the webpage ************************************************/
    this.Given(/^Open "([^"]*)" website$/, function (url, callback) {
        pageObjectFile.OpenWebUrl(url).then(function () {
            callback();
        }, function (err) {
            callback("error is >> " + err)
        });
    });

    /************************************************************ This method inputs the data in search text/area ************************************************/
    this.When(/^User Search for "([^"]*)" in the "([^"]*)" input field$/, function (searchValue, searchField, callback) {
        pageObjectFile.inputData(searchValue, searchField).then(function () {
            callback();
        }, function (err) {
            callback("error is >> " + err)
        });
    });

    /************************************************************ This method verify the coordinates ************************************************/
    this.When(/^User verify the "([^"]*)" coordinates should be "([^"]*)"$/, function (place, coordinates, callback) {
        pageObjectFile.verifyCoordinates(place, coordinates).then(function () {
            callback();
        }, function (err) {
            callback("error is >> " + err)
        });
    });

    /************************************************************ This method clicks on button *************************************************/
    this.When(/^User click on "([^"]*)" button$/, function (button, callback) {
        pageObjectFile.clickOnButton(button).then(function () {
            callback();
        }, function (err) {
            callback("error is >>> " + err)
        })

    });

    /***************************************************** This Method verify count ******************************************************/
    this.Then(/^User verify more than "([^"]*)" routes are displayed in the "([^"]*)"$/, function (count, page, callback) {
        pageObjectFile.verifyResultCount(count, page).then(function () {
            callback();
        }, function (err) {
            callback("error is >>> " + err)
        })
    });

    /***************************************************** This Method save the data ******************************************************/
    this.Then(/^User print the route title, distance in miles, and the travel time to a file titled "([^"]*)"$/, function (filename, callback) {
        pageObjectFile.saveData(filename).then(function () {
            callback();
        }, function (err) {
            callback("error is >>> " + err)
        })
    });


}; // end of main function
