@afterAllApisHook

Feature: API Testing

    Background:
        Given I open API page
        Given I login into my account using API

    Scenario: Select article list
        When I get all list of articles
        And I select the first article
        Then I am able to see its content

    @cleanupDeleteNewArticleAdded
    Scenario: Add new article
        Given I login in my account from UI
        When I add a new article with "Test1" title
        Then new article with "Test1" title is created

    Scenario: Get articles with specific tag
        When I search for articles with specific tag
            | tag            |
            | YouTube        |
            | Test           |
            | QA Skills      |
            | Bondar Academy |
        Then only articles with specific tag are shown
            | tag            |
            | YouTube        |
            | Test           |
            | QA Skills      |
            | Bondar Academy |

    Scenario: Validate JSON schema
        When I get the response of all articles
        Then I compare the responses and see that my list has a valid JSON format

    Scenario: Multi tab
        When I click on real world project link
        Then a new tab opens

    Scenario: Iterate through each article
        Then I can see all available articles