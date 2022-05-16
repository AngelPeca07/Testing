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
      url: '/users/1952/todos',
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
      body: {
        user_id: 1952,
        title: 'Doctor appointment',
        status: 'completed',
        due_on: '2022-06-13T00:00:00.000+05:30',
      },
    })
      .then((res) => {
        expect(res.status).to.eq(201);
        cy.log(JSON.stringify(res));
        expect(res.body).has.property('user_id', 1952);
        expect(res.body).has.property('title', 'Doctor appointment');
        expect(res.body).has.property('status', 'completed');
        expect(res.body).has.property('due_on','2022-06-13T00:00:00.000+05:30');
      })
      .then((res) => {
        const id = res.body.id;
        cy.log('the id is: ' + id);
        //GET - User data
        cy.request({
          method: 'GET',
          url: `/todos/${id}`,
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
              url: `/todos/${id}`,
              headers: {
                authorization: `Bearer ${TOKEN}`,
              },
              body: {
                title: 'Change appointment date',
                status: 'completed',
                due_on: '2022-07-13T00:00:00.000+05:30',
              },
            })
              .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).has.property('id', id);
                expect(res.body).has.property('title', 'Change appointment date');
                expect(res.body).has.property('status', 'completed');
                expect(res.body).has.property('due_on','2022-07-13T00:00:00.000+05:30');
              })
              .then((res) => {
                const userId = res.body.id;
                cy.log('user id: ' + userId);
                // DELETE USER
                cy.request({
                  method: 'DELETE',
                  url: `/todos/${userId}`,
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
