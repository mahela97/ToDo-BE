const User = require('../../schemas/user.schema');
const mongoose = require("mongoose");

const chai = require ('chai')
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const server = require('../../index.js')

 describe("User Tests",()=>{
     before(done=>{
        mongoose.connect(
            process.env.DB_CONNECT,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err) => {
                if (err) {
                    console.log(err);
                    done(err)
                } else {
                    done()
                    console.log("Succesfully connected to database");
                }
            }
        );
     })
     describe("POST /api/user/login",()=>{
         it("It should login user",(done)=>{
             const user={email:"mahela@gmail.com",password:"123456"}
             chai.request(server)
                .post('/api/user/login')
                .send(user)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.a('object');
                    res.body.should.have.property('sucess').eq(1);
                    res.body.should.have.property('message');
                    res.body.should.have.property('token');
                    res.body.should.have.property('user');
                    done()
                })
         })
     })

     describe("POST /api/user/register",()=>{
        it("It should register user",(done)=>{
            const user={email:"regTest123@gmail.com",password:"123456",name:"Mahela"}
            chai.request(server)
               .post('/api/user/register')
               .send(user)
               .end((err,res)=>{
                   res.should.have.status(201);
                   res.body.should.have.a('object');
                   res.body.should.have.property('result');
                   done()
               })
        })
        after(async()=>{
           const res = await User.findOneAndDelete({email:'regTest123@gmail.com'});
       })
    })

    describe("GET /api/user/me",()=>{
        let token;
        before(done=>{
            const user={email:"mahela@gmail.com",password:"123456"}
            chai.request(server)
                .post('/api/user/login')
                .send(user)
                .end((err,res)=>{
                    res.should.have.status(200);
                    token=res.body.token
                    done()
                })
        })
        it("It should give current user",(done)=>{
            chai.request(server)
               .get('/api/user/me')
               .set({ "Authorization": `Bearer ${token}` })
               .end((err,res)=>{
                   res.should.have.status(201);
                   done()
               })
        })
    })
 })