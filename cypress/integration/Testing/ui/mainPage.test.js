


describe("This will go to the amazon page and validate random items", () => {
    beforeEach(() => {
        cy.visit('www.amazon.com');
      });

    it("Should open the main page", () => {
        cy.get('#nav-logo-sprites', {timeout:2000}).should('be.visible');
        cy.get('span').should('have.class','icp-nav-flag-us');
    });

    it("Should look for products", () => {
        let items = ['iphone', 'iphone', 'iphone'];
        cy.get('.hm-icon', {timeout:2000}).click();
        cy.wait(2000);
        items.forEach(element => {
            cy.get('input[type="text"]').type(element);
            cy.get('#nav-search-submit-button').click();
            cy.get('img[data-image-index="2"]',{ multiple: true }).first().click();
            cy.get('#add-to-cart-button',{timeout:2000}).click();
        })

        //cy.get('#sw-gtc > .a-button-inner > .a-button-text').click();
    });
});