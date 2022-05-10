describe("API Testing", () => {
  it("GET - read", () => {
        cy.request('GET', 'https://gorest.co.in/public/v2/posts/100/comments').then((response) => {
            expect(response).to.have.property('status', 200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.have.length(1);
        });
    });
});