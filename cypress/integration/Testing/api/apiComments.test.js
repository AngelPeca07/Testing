describe('API Testing', () => {
  Cypress.config('baseUrl', 'https://gorest.co.in/public/v2');
  const TOKEN =
    '704fc1d78de7c8031204222c3ebd8f267385f3330bdc634e2f8e0bd16dc7ae20';

  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';

  for (let i = 0; i < 15; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  var randEmail = string + '@gmail.com';

  it.only('POST - create a new comment', () => {
    cy.request({
      method: 'POST',
      url: '/comments',
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
      body: {
        "post_id": 2000,
        "name": "Omar Bravo",
        "email": "omar.Bravo@gmail.com",
        "body": "El campeonisimo de Gudalajara"
    },
    })
      .then((res) => {
        expect(res.status).to.eq(201);
        cy.log(JSON.stringify(res));
        expect(res.body).has.property('post_id', 2000);
        expect(res.body).has.property('name', 'Omar Bravo');
        expect(res.body).has.property('email', 'omar.Bravo@gmail.com');
        expect(res.body).has.property('body', 'El campeonisimo de Gudalajara');
      })
      .then((res) => {
        const id = res.body.id;
        cy.log('the id is: ' + id);
        //GET - User data
        cy.request({
          method: 'GET',
          url: `/comments/${id}`,
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        })
          .then((res) => {
            expect(res.status).to.eq(200);
            cy.log(JSON.stringify(res));
          })
          .then((res) => {
            const id = res.body.id;
            cy.log('the id is: ' + id);
            //PUT - Update user
            cy.request({
              method: 'PUT',
              url: `/comments/${id}`,
              headers: {
                authorization: `Bearer ${TOKEN}`,
              },
              body: {
                "post_id": 2000,
                "name": "Oswaldo Sanchez",
                "email": "Os.Sanchez@gmail.com",
                "body": "El campeonisimo de Santos"
              },
            })
              .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).has.property('id', id);
                expect(res.body).has.property('name', 'Oswaldo Sanchez');
                expect(res.body).has.property('email', 'Os.Sanchez@gmail.com');
                expect(res.body).has.property('body','El campeonisimo de Santos');
              })
              .then((res) => {
                const userId = res.body.id;
                cy.log('user id: ' + userId);
                // DELETE USER
                cy.request({
                  method: 'DELETE',
                  url: `/comments/${userId}`,
                  headers: {
                    authorization: `Bearer ${TOKEN}`,
                  },
                }).then((res) => {
                  expect(res.status).to.eq(204);
                });
              });
          });
      });
  });
});
