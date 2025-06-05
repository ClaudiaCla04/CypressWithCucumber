Feature: UI PLayground Testing

    Scenario: shadowDom
        Given I open my "shadowdom" web
        When I click on generate code icon
        And I click on copy code icon
        Then code is generated

 Scenario: window alert
        Given I open my "alerts" web
        When I click on alert button
        Then alert is visible

 Scenario: window confirm yes
        Given I open my "alerts" web
        When I click on confirm button and choose yes
        Then window alert responds yes

 Scenario: window confirm no
        Given I open my "alerts" web
        When I click on confirm button and choose no
        Then window alert responds no