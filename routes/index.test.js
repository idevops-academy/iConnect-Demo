const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)


//Unit Tests

function isEvenNumber(nmbr) {
    return nmbr%2 == 0;
}

it('Test if the number is even', () => {
    expect(isEvenNumber(4)).toBe(true);
})

it('Test if the number is odd', () => {
    expect(isEvenNumber(5)).toBe(false);
})

it('Testing to see if Jest works', () => {
    expect(2).toBe(2)
})




// Integration Tests

//test the contacts endpoints.
it('test if the contacts endpoint returns data', async done => {
    const response = await request.get('/contacts')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length > 0).toBe(true)
    done()
})

//test get contact by id.
it('test get contact by id', async done => {
    const response = await request.get('/contacts/1')
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({id: 1})
    done()
})

//test contact not found
it('test contact not found', async done => {
    const response = await request.get('/contacts/7')
    expect(response.status).toBe(404)
    done()
})

//test contact add
it('test contact addition', async done => {
    const response = await request.post('/contacts').send({name:"shaik",email:"shaik@gmail.com",phone:"05640"})
    expect(response.status).toBe(200)
    done()
})


//test contact delete
it('test contact delete', async done => {
    const response = await request.delete('/contacts/2')
    expect(response.status).toBe(200)
    done()
})

//test health end point
it('test health point', async done => {
    const response = await request.get('/health')
    expect(response.status).toBe(200)
    expect(response.body.includes("Healthy")).toBe(true)
    done()
})





