describe('API Testing', () => {
  Cypress.config('baseUrl', 'https://gorest.co.in/public/v2');
  const TOKEN =
    '704fc1d78de7c8031204222c3ebd8f267385f3330bdc634e2f8e0bd16dc7ae20';
 
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';

for(let i=0; i<15; i++){
    string += chars[Math.floor(Math.random() * chars.length)];
}
 var randEmail = string + '@gmail.com';

    it('GET - read', () => {
      cy.request({
        method: 'GET',
        url: '/posts/100/comments',
        headers: {
          'authorization': `Bearer ${TOKEN}`
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('POST - create', () => {
      cy.request({
        method: 'POST',
        url: '/users',
        headers: {
          'authorization': `Bearer ${TOKEN}`
        },
        body: {
          "name": "Goku",
          "email": randEmail,
          "gender": "male",
          "status": "active"
        }
      }).then((res) => {
         expect(res.status).to.eq(201);
         expect(res.body).has.property('email',randEmail);
         expect(res.body).has.property('name','Goku');
         expect(res.body).has.property('gender','male');
         expect(res.body).has.property('status','active');
      })
    });

    it('PUT - update', () => {
      cy.request({
        method: 'PUT',
        url: '/users/3871',
        headers: {
          'authorization': `Bearer ${TOKEN}`
        },
        body: {
          "name": "Goku Test Automation",
          "email": "r@gmail.com",
          "gender": "female",
          "status": "inactive"
        }
      }).then((res) => {
         expect(res.status).to.eq(200);
         expect(res.body).has.property('email',"r@gmail.com");
         expect(res.body).has.property('name','Goku Test Automation');
         expect(res.body).has.property('gender','female');
         expect(res.body).has.property('status','inactive');
      })
    });

    it('DELETE - delete user', () => {
      cy.request({
        method: 'DELETE',
        url: '/users/3871',
        headers: {
          'authorization': `Bearer ${TOKEN}`
        }
      }).then((res) => {
         expect(res.status).to.eq(204);
      })
    });
});
