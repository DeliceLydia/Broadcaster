import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../app';

chai.use(chaiHttp);
dotenv.config();
const { expect } = chai;

const redFlag = {
    title: 'record',
    type: 'red flag',
    location: 'gikondo',
    status: 'draft',
    comment: 'hola como estas'
   }

const payload ={
    id: 1,
    firstname: 'kevin',
    lastname: 'rinda',
    email: 'kevin@gmail.com'
};
const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });
describe('post a red flag', ()=> {
    it('user should be able to post a red flag', (done)=>{
        chai.request(app)
        .post('/api/v1/red-flags')
        .set('authorization', token)
        .send(redFlag)
        .end((err, res) => {
            expect(res.status).to.be.eql(201);
            expect(res.body).to.be.an('Object');
            expect(res.body.message).not.to.be.empty;
            expect(res.body.message).to.equals('Created red flag record');
            done();
        });
    })
    it('user should not be able to post when he/she is unauthorised', (done)=>{
        chai.request(app)
        .post('/api/v1/red-flags')
        .send(redFlag)
        .end((err, res) => {
            expect(res.status).to.be.eql(401);
            expect(res.body).to.be.an('Object');
            done();
        });
    })
    it('user should not be able to post when there is a validation error', (done)=>{
        const redFlag = {
            title: 'record',
            type: 'red flag',
            location: 'gikondo',
            status: 'draft',
            comment: 'hola'
           };
           chai.request(app)
        .post('/api/v1/red-flags')
        .set('authorization', token)
        .send(redFlag)
        .end((err, res) => {
            expect(res.status).to.be.eql(400);
            expect(res.body).to.be.an('Object');
            done();
        });
    })
    it('user should not be able to post when there is a wrong data type', (done)=>{
        const redFlag = {
            title: 'record',
            type: 'red flag',
            location: 'gikondo',
            status: 'draft',
            comment: 122
           };
           chai.request(app)
        .post('/api/v1/red-flags')
        .set('authorization', token)
        .send(redFlag)
        .end((err, res) => {
            expect(res.status).to.be.eql(400);
            expect(res.body).to.be.an('Object');
            done();
        });
    })
    it('user should not be able to post when there is missing information', (done)=>{
        const redFlag = {
            title: 'record',
            type: 'red flag',
            location: 'gikondo',
            status: 'draft',
            comment: ''
           };
           chai.request(app)
        .post('/api/v1/red-flags')
        .set('authorization', token)
        .send(redFlag)
        .end((err, res) => {
            expect(res.status).to.be.eql(400);
            expect(res.body).to.be.an('Object');
            done();
        });
    })
})
// getAll //
describe('get all red flags', ()=>{
    it('user should be able to get all redFlags', (done)=>{
        chai.request(app)
        .get('/api/v1/red-flags')
        .set('authorization', token)
        .end((err, res) => {
            expect(res.status).to.be.eql(200, 'Response status is wrong');
            done();
        
         });
    })
    it('user should not be able to get all redFlags if there is no authorization', (done)=>{
        chai.request(app)
        .get('/api/v1/red-flags')
        .end((err, res) => {
            expect(res.status).to.be.eql(401, 'Response status is wrong');
            done();
        
         });
    })
})
// getOne //
describe('get a specific red flag', ()=>{
    it('user should be able to get a specific redFlag by ID', (done)=>{
        chai.request(app)
        .get('/api/v1/red-flags/1')
        .set('authorization', token)
        .end((err, res) => {
            expect(res.status).to.be.eql(200, 'Response status is wrong');
            done();
        
         });
    })
    it('user should not be able to get a specific redFlag when is unexisted', (done)=>{
        chai.request(app)
        .get('/api/v1/red-flags/10')
        .set('authorization', token)
        .end((err, res) => {
            expect(res.status).to.be.eql(404, 'Response status is wrong');
            done();
        
         });
    })
    it('user should not be able to get a specific redFlag when is not authorised', (done)=>{
        chai.request(app)
        .get('/api/v1/red-flags/10')
        .end((err, res) => {
            expect(res.status).to.be.eql(401, 'Response status is wrong');
            done();
        
         });
    })
})
// update location //
describe('update location', ()=>{
    it('user should be able to update a location', (done)=>{
        const redFlag = {
            location: 'kanombe'
        };
      chai.request(app)
      .patch('/api/v1/red-flags/1/location')
      .set('authorization', token)
      .send(redFlag)
      .end((err, res)=> {
          expect(res.status).to.be.eql(200, 'status is wrong');
          expect(res.body).to.be.an('object');
          expect(res.body.message).not.to.be.empty;
          expect(res.body.message).to.equals("updated red-flag record's location");
          expect(res.body.data).to.be.an('object');
          done();
      })
    })
    it('user should not be able to update a location when the record does not exist', (done)=>{
        const redFlag = {
            location: 'kanombe'
        };
      chai.request(app)
      .patch('/api/v1/red-flags/9/location')
      .set('authorization', token)
      .send(redFlag)
      .end((err, res)=> {
          expect(res.status).to.be.eql(404, 'status is wrong');
          expect(res.body).to.be.an('object');
          done();
      })
    })
    it('user should not be able to update a location when token are different', (done)=>{
        const payload ={
            id: 2,
            firstname: 'kevine',
            lastname: 'rinda',
            email: 'kevine@gmail.com'
        };
        const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });
        const redFlag = {
            location: 'kanombe'
        };
      chai.request(app)
      .patch('/api/v1/red-flags/1/location')
      .set('authorization', token)
      .send(redFlag)
      .end((err, res)=> {
          expect(res.status).to.be.eql(400, 'status is wrong');
          expect(res.body).to.be.an('object');
          done();
      })
    })
    it('user should not be able to update a location when there is a wrong data type', (done)=>{
        const redFlag = {
            location: 12
        };
      chai.request(app)
      .patch('/api/v1/red-flags/1/location')
      .set('authorization', token)
      .send(redFlag)
      .end((err, res)=> {
          expect(res.status).to.be.eql(400, 'status is wrong');
          expect(res.body).to.be.an('object');
          done();
      })
    })
})
describe('update comment',()=>{
    it('user should be able to update a comment of the red flag',(done)=>{
        const redFlag = {
            comment: 'gracias amigos'
        };
        chai.request(app)
        .patch('/api/v1/red-flags/1/comment')
        .set('authorization', token)
        .send(redFlag)
        .end((err, res)=> {
            expect(res.status).to.be.eql(200, 'status is wrong');
            expect(res.body).to.be.an('object');
            expect(res.body.message).not.to.be.empty;
            expect(res.body.message).to.equals("updated red-flag record's comment");
            expect(res.body.data).to.be.an('object');
            done();
        })
      })
      it('user should be not be able to update a comment when the record does not exist', (done)=>{
        const redFlag = {
            comment: 'gracias amigos'
        };
      chai.request(app)
      .patch('/api/v1/red-flags/9/comment')
      .set('authorization', token)
      .send(redFlag)
      .end((err, res)=> {
          expect(res.status).to.be.eql(404, 'status is wrong');
          expect(res.body).to.be.an('object');
          done();
         })
       })
       it('user should be not be able to update a comment when there is a wrong data type', (done)=>{
        const redFlag = {
            comment: 112
        };
      chai.request(app)
      .patch('/api/v1/red-flags/1/comment')
      .set('authorization', token)
      .send(redFlag)
      .end((err, res)=> {
          expect(res.status).to.be.eql(400, 'status is wrong');
          expect(res.body).to.be.an('object');
          done();
         })
       })
       it('user should be not be able to update a comment when there is an empty place', (done)=>{
        const redFlag = {
            comment: ''
        };
      chai.request(app)
      .patch('/api/v1/red-flags/1/comment')
      .set('authorization', token)
      .send(redFlag)
      .end((err, res)=> {
          expect(res.status).to.be.eql(400, 'status is wrong');
          expect(res.body).to.be.an('object');
          done();
         })
       })
       it('user should be not be able to update a location when token are different', (done)=>{
        const payload ={
            id: 2,
            firstname: 'kevine',
            lastname: 'rinda',
            email: 'kevine@gmail.com'
        };
        const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });
        const redFlag = {
            comment: 'gracias amigos'
        };
      chai.request(app)
      .patch('/api/v1/red-flags/1/comment')
      .set('authorization', token)
      .send(redFlag)
      .end((err, res)=> {
          expect(res.status).to.be.eql(400, 'status is wrong');
          expect(res.body).to.be.an('object');
          done();
      })
    })
    it('user should be not be able to update a location when provided invalid token', (done)=>{
        const payload ={
            id: 1,
            firstname: 'kevin',
            lastname: 'rindaaa',
            email: 'kevine@gmail.com'
        };
        const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });
        const redFlag = {
            comment: 'gracias amigos'
        };
      chai.request(app)
      .patch('/api/v1/red-flags/1/comment')
      .set('authorization', token)
      .send(redFlag)
      .end((err, res)=> {
          expect(res.status).to.be.eql(400, 'status is wrong');
          expect(res.body).to.be.an('object');
          done();
      })
    })
   })
// Delete One //
describe('delete redFlag by ID', ()=>{
    it('user should not be able to delete a red flag when token are different', (done)=>{
        const payload ={
            id: 2,
            firstname: 'kevine',
            lastname: 'rinda',
            email: 'kevine@gmail.com'
        };
        const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24hrs' });
      chai.request(app)
      .delete('/api/v1/red-flags/1')
      .set('authorization', token)
      .end((err, res)=> {
          expect(res.status).to.be.eql(400, 'status is wrong');
          expect(res.body).to.be.an('object');
          done();
      })
    })
    it('user should be able to delete a specific redFlag', (done)=>{
        chai.request(app)
        .delete('/api/v1/red-flags/1')
        .set('authorization', token)
        .end((err, res) => {
            expect(res.status).to.be.eql(200, 'Response status is wrong');
            expect(res.body).to.be.an('Object');
            expect(res.body.message).not.to.be.empty;
            expect(res.body.message).to.equals('red-flag record has been deleted');
            done();
        
         });
       })
       it('user should not be able to delete a specific redFlag if is unexisted', (done)=>{
        chai.request(app)
        .delete('/api/v1/red-flags/10')
        .set('authorization', token)
        .end((err, res) => {
            expect(res.status).to.be.eql(404, 'Response status is wrong');
            expect(res.body).to.be.an('Object');
            done();
        
         });
       })
      
    
    })
