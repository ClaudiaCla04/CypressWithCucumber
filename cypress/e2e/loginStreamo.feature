@login

Feature: Login page

Scenario: Check login page open as expected
    Given I am on landing page
    When I click on sign in button
    Then login page opens as expected