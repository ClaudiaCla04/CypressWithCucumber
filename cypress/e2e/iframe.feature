Feature: iframe Testing

    Scenario: Handling iframe
        Given I open my iframe web
        When I click on "Our Products" section inside the iframe
        Then Our Products section opens as expected
            | section         |
            | Special Offers  |
            | Cameras         |
            | New Laptops     |
            | Used Laptops    |
            | Game Consoles   |
            | Components      |
            | Desktop Systems |
            | Audio           |