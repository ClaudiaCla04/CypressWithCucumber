
Feature: Accessories page

    Background:
        Given I login into my account
        When I navigate to "Accessories"

    Scenario: Check accessories page opens as expected
        Then I should see the page title "Accessories"
        And I should see a list of accessories items displayed

    @beforeOneAccessoryTest
    Scenario: Verify each item contain all the details
        Then each accessory should display an image, name, and price
        
    @smoke
    Scenario Outline: View details of an accessory
        When I click on "<accessory>" item
        Then "<accessory>" item page opens as expected

        Examples:
            | accessory                |
            | Brown bear cushion       |
            | Mug The adventure begins |
            | Mountain fox notebook    |
            | Pack Mug + Framed poster |
            | Customizable mug         |

    Scenario Outline: Filter accessories by subcategory
        When I select the "<subcategory>" filter
        Then only "<subcategory>" items should be visible

        Examples:
            | subcategory      |
            | Stationery       |
            | Home Accessories |
      @smoke
    Scenario: Sort accessories alphabetically
        When I choose to sort items alphabetically
        Then the items should be ordered alphabetically from A to Z

   @cleanupRemoveItemFromCart
    Scenario: Add accessory to cart 
        When I click on "Mountain fox notebook" item
        And I add the item to cart
        Then item is successfully added to cart