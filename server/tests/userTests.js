import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../server';

dotenv.config();
chai.use(chaiHttp);
const {expect} = chai;

const user = {
    firstname : "uwera",
    lastname : "Claudette",
    email : "claudette@gmail.com",
    phoneNumber: "0786846798",
    username: "coco",
    password: "Lydie1@"
};

// signup //
describe('signup', ()=> {
    it('server should be able to run', (done)=>{
        chai.request(app)
        .get('/')
        .end((err, res)=> {
            expect(res.status).to.be.eql(200, 'Response status is wrong');
            expect(res.body).to.be.an('Object');
            expect(res.body.message).not.to.be.empty;
            expect(res.body.message).to.equals('Welcome to the Broadcaster application');
            done();
        })
    })
    it('user should be able to create an account', (done)=>{
        chai.request(app)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res)=>{
            expect(res.status).to.be.eql(201);
            expect(res.body).to.be.an('Object');
            expect(res.body.message).not.to.be.empty;
            expect(res.body.message).to.equals('User created successfully');
            done();
        })
    })
    it('user should not be able to create an account when using existing email', (done)=>{
        const newUser = {
            firstname : "uwera",
            lastname : "Claudette",
            email : "claudette@gmail.com",
            phoneNumber: "0786846798",
            username: "coco",
            password: "Lydie1@"
        };
        chai.request(app)
        .post('/api/v2/auth/signup')
        .send(newUser)
        .end((err, res)=>{
            expect(res.status).to.be.eql(400);  
            expect(res.body).to.be.an('Object');       
            done();
        })
    })
    it('user should not be able to create an account when using existing username', (done)=>{
        const newUser = {
            firstname : "uwera",
            lastname : "Claudette",
            email : "claudette@gmail.com",
            phoneNumber: "0786846798",
            username: "coco",
            password: "Lydie1@"
        };
        chai.request(app)
        .post('/api/v2/auth/signup')
        .send(newUser)
        .end((err, res)=>{
            expect(res.status).to.be.eql(400);  
            expect(res.body).to.be.an('Object');       
            done();
        })
    })
    it('user should not be able to post when there is an empty place', (done)=>{
        const newUser = {
            firstname : "uwera",
            lastname : "Claudette",
            email : "claudette@gmail.com",
            phoneNumber: "0786846798",
            username: "",
            password: "Lydie1@"
        };
        chai.request(app)
        .post('/api/v2/auth/signup')
        .send(newUser)
        .end((err, res)=>{
            expect(res.status).to.be.eql(400);  
            expect(res.body).to.be.an('Object');       
            done();
        })
    })
    it('user should not be able to post when there is an incorrect data type', (done)=>{
        const newUser = {
            firstname : 12,
            lastname : "Claudette",
            email : "claudette@gmail.com",
            phoneNumber: "0786846798",
            username: "coco",
            password: "Lydie1@"
        };
        chai.request(app)
        .post('/api/v2/auth/signup')
        .send(newUser)
        .end((err, res)=>{
            expect(res.status).to.be.eql(400);  
            expect(res.body).to.be.an('Object');       
            done();
        })
    })
})
// signin//
describe('signin', ()=>{
    it('user should be able to signin', (done)=>{
     const returningUser = {
        email: "claudette@gmail.com",
        password: 'Lydie1@'
     };
     chai.request(app)
     .post('/api/v2/auth/signin')
     .send(returningUser)
     .end((err, res)=>{
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.an('Object');
        expect(res.body.message).not.to.be.empty;
        expect(res.body.message).to.equals('User is successfully logged in!');
        done();
     })
    })
    it('user should not be able to signin when provided unexisted email',(done)=>{
        const returningUser = {
            email: 'cynthia@gmail.com',
            password: 'Lydie1@'
         };
         chai.request(app)
     .post('/api/v2/auth/signin')
     .send(returningUser)
     .end((err, res)=>{
        expect(res.status).to.be.eql(400);
        expect(res.body).to.be.an('Object');
        done();
    })
})
it('user should not be able to signin when provided wrong password',(done)=>{
    const returningUser = {
        email: 'cycy@gmail.com',
        password: '12345687'
     };
     chai.request(app)
 .post('/api/v2/auth/signin')
 .send(returningUser)
 .end((err, res)=>{
    expect(res.status).to.be.eql(400);
    expect(res.body).to.be.an('Object');
    done();
     })
  })
  it('user should not be able to signin when provided wrong data type',(done)=>{
    const returningUser = {
        email: 123,
        password: 'Lydie1@'
     };
     chai.request(app)
 .post('/api/v2/auth/signin')
 .send(returningUser)
 .end((err, res)=>{
    expect(res.status).to.be.eql(400);
    expect(res.body).to.be.an('Object');
    done();
     })
  })
})