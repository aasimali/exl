Feature: Test the Google Map

@TC1
Scenario: To check the San Francisco, California coordinates and save the info in text file

#1.Launch Chrome and maximize the window :- Will be happening in background, check onPrepare() function in conf.js

# 2.Navigate to Google Maps (maps.google.com)
Given Open "Google Map" website

# 3.Search for San Francisco, California
When User Search for "San Francisco, California" in the "Search Google Maps" input field

# 4.Verify the coordinates for San Francisco are 37.7577627,-122.4726194
And User verify the "San Francisco, California" coordinates should be "37.7576793,-122.5076402"

# 5.Then search for driving directions (by car) from Chico, California to San Francisco, California.
And User click on "Direction" button
And User Search for "Chico, California" in the "Choose Starting Point" input field
And User click on "Car icon" button

# 6.verify two or more routes are displayed in the list.
Then User verify more than "2" routes are displayed in the "Left Panel"

# 7.Then print the route title, distance in miles, and the travel time to a file titled “routes.txt”.
Then User print the route title, distance in miles, and the travel time to a file titled "routes.txt" 