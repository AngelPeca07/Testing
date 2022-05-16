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
  
    it.only('POST - create a new todo', () => {
      cy.request({
        method: 'POST',
        url: '/users',
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        body: {
          "name": "Mr. Jones",
          "email": randEmail,
          "gender": "male",
          "status": "active" 
        },
      })
        .then((res) => {
          expect(res.status).to.eq(201);
          cy.log(JSON.stringify(res));
          expect(res.body).has.property('name', 'Mr. Jones');
          expect(res.body).has.property('email', randEmail);
          expect(res.body).has.property('gender','male');
          expect(res.body).has.property('status','active');
        })
        .then((res) => {
          const id = res.body.id;
          cy.log('the id is: ' + id);
          //GET - User data
          cy.request({
            method: 'GET',
            url: `/users/${id}`,
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
                url: `/users/${id}`,
                headers: {
                  authorization: `Bearer ${TOKEN}`,
                },
                body: {
                    "name": "Jhon",
                    "email": randEmail,
                    "gender": "female",
                    "status": "inactive" 
                },
              })
                .then((res) => {
                  expect(res.status).to.eq(200);
                  expect(res.body).has.property('id', id);
                  expect(res.body).has.property('name', 'Jhon');
                  expect(res.body).has.property('email', randEmail);
                  expect(res.body).has.property('gender','female');
                  expect(res.body).has.property('status','inactive');
                })
                .then((res) => {
                  const userId = res.body.id;
                  cy.log('user id: ' + userId);
                  // DELETE USER
                  cy.request({
                    method: 'DELETE',
                    url: `/users/${userId}`,
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