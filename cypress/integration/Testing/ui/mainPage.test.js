let url = require("../../../fixtures/environment.json");
let labels = require("../../../fixtures/labels.json");

describe('This will go to the amazon page and validate random items', () => {
  beforeEach(() => {
    cy.visit(url.amazon);
  });

  it('Should open the main page', () => {
    cy.get(labels.logo, { timeout: 2000 }).should('be.visible');
    cy.get(labels.spanFlag).should('have.class', labels.flag);
  });

  it('Should look for products', () => {
    var items = ['iphone X', 'iphone 8', 'iphone'];
    var result = [];
    var text = '';
    cy.get('.hm-icon', { timeout: 2000 }).click();
    cy.wait(2000);
    items.forEach((element) => {
      cy.get('input[type="text"]').type(element);
      cy.get('#nav-search-submit-button').click();
      cy.get('img[data-image-index="2"]', { multiple: true }).first().click();
      cy.get('.a-offscreen').then(($aprice) => {
        text = $aprice.eq(0).text();
        result.push(parseFloat(text.substring(1)));
        var sum = result.reduce((a, b) => a + b, 0);
        cy.log(`[TOTAL:${sum}](http://example.com)`);
      });
      cy.get('#add-to-cart-button', { timeout: 2000 }).click();
    });
    cy.get('#nav-cart-count').then(($num) => {
      var value = $num.text();
      var txt = parseInt(value);
      expect(txt).to.equal(items.length);
    });
    cy.get('#nav-cart-count').should('have.length.greaterThan', 0);
    cy.get('#sc-buy-box-ptc-button').should(
      'have.css',
      'color',
      'rgb(15, 17, 17)'
    );
  });

  it('Should validate the color of the elements', () => {
    cy.get('#nav-xshop').should('have.css', 'color', 'rgb(15, 17, 17)');
    cy.get('#nav-tools').should('have.css', 'color', 'rgb(15, 17, 17)');
    cy.get('#nav-search-submit-button').should(
      'have.css',
      'color',
      'rgb(255, 255, 255)'
    );
  });
});
