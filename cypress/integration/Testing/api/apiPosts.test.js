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
  
    it.only('POST - create a new post', () => {
      cy.request({
        method: 'POST',
        url: '/posts',
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        body: {
          "user_id": 5000,
          "title": "Cosmos",
          "body": "Renowned astrophysicist Neil deGrasse Tyson takes viewers on a journey through the infinite cosmos. Scientific concepts are presented clearly, with both skepticism and wonder, to give full effect."
      },
      })
        .then((res) => {
          expect(res.status).to.eq(201);
          cy.log(JSON.stringify(res));
          expect(res.body).has.property('user_id', 5000);
          expect(res.body).has.property('title', 'Cosmos');
          expect(res.body).has.property('body', 'Renowned astrophysicist Neil deGrasse Tyson takes viewers on a journey through the infinite cosmos. Scientific concepts are presented clearly, with both skepticism and wonder, to give full effect.');
        })
        .then((res) => {
          const id = res.body.id;
          cy.log('the id is: ' + id);
          //GET - User data
          cy.request({
            method: 'GET',
            url: `/posts/${id}`,
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
                url: `/posts/${id}`,
                headers: {
                  authorization: `Bearer ${TOKEN}`,
                },
                body: {
                    "user_id": 5000,
                    "title": "Cosmos",
                    "body": "Neil deGrasse Tyson."
                },
              })
                .then((res) => {
                  expect(res.status).to.eq(200);
                  expect(res.body).has.property('id', id);
                  expect(res.body).has.property('user_id', 5000);
                  expect(res.body).has.property('title', 'Cosmos');
                  expect(res.body).has.property('body','Neil deGrasse Tyson.');
                })
                .then((res) => {
                  const userId = res.body.id;
                  cy.log('user id: ' + userId);
                  // DELETE USER
                  cy.request({
                    method: 'DELETE',
                    url: `/posts/${userId}`,
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
  