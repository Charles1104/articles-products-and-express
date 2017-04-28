/*jshint esversion: 6 */

const request = require('supertest');
const chai = require ('chai');
const expect = chai.expect;
const app = require('../server.js');

describe('GET METHOD ARTICLES', function() {
 it('/articles to respond with html', function(done) {
   request(app)
     .get('/articles')
     .expect('Content-Type', /html/)
     .expect(200, done);
 });
 it('/articles/new to respond with html', function(done) {
   request(app)
     .get('/articles/new')
     .expect('Content-Type', /html/)
     .expect(200, done);
 });
 it('/articles/:title to respond with html', function(done) {
   request(app)
     .get('/articles/:title')
     .expect('Content-Type', /html/)
     .expect(200, done);
 });
 it('/articles/:title/edit to respond with html', function(done) {
   request(app)
     .get('/articles/:title/edit')
     .expect('Content-Type', /html/)
     .expect(200, done);
 });
  it('/articlers/new to respond with html', function(done) {
   request(app)
     .get('/articlres/new')
     .expect('Content-Type', /html/)
     .expect(404, done);
 });
  it('/ to respond with html', function(done) {
   request(app)
     .get('/')
     .expect('Content-Type', /html/)
     .expect(404, done);
 });
});

describe('POST METHOD ARTICLES', function(){

  it('POSTING with good parameters should redirect to the articles/ route', function(done) {
   request(app)
     .post('/articles/')
     .type('form')
     .send({"title":"Da Vinci Code", "body":"nice book","author":"Dan Brown"})
     .set('accept','application/json')
     .expect(302, done);
  });

  it('POSTING two times with the same title should render the articles/new route', function(done) {
   request(app)
     .post('/articles/')
     .type('form')
     .send({"title":"Da Vincii Code", "body":"nice book","author":"Dan Brown"})
     .set('accept','application/json')
     .expect(302)
     .end(function(err,res){
        request(app)
        .post('/articles/')
        .type('form')
        .send({"title":"Da Vincii Code", "body":"nice book","author":"Dan Brown"})
        .set('accept','application/json')
        .expect(200, done);
        });
  });

  it('POSTING with wrong parameters should render the articles/new route', function(done) {
   request(app)
     .post('/articles/')
     .type('form')
     .send({"titlfzfze":"Code", "bocsdy":"book","author":"Brown"})
     .set('accept','application/json')
     .expect(200, done);
  });

});

describe('PUT METHOD ARTICLES', function(){

  it('EDITING (PUT) an existing article should redirect to the articles/:title route', function(done) {
   request(app)
     .post('/articles/')
     .type('form')
     .send({"title":"Bible", "body":"religious","author":"Jesus"})
     .set('accept','application/json')
     .expect(302)
     .end(function(err,res){
        request(app)
        .put('/articles/Bible')
        .type('form')
        .send({"title":"Bible2", "body":"religious2","author":"God"})
        .set('accept','application/json')
        .expect(303, done);
        });
  });

  it('EDITING (PUT) an unknown article should render articles/new route', function(done) {
   request(app)
     .post('/articles/')
     .type('form')
     .send({"title":"Bible", "body":"religious","author":"Jesus"})
     .set('accept','application/json')
     .expect(302)
     .end(function(err,res){
        request(app)
        .put('/articles/toto')
        .type('form')
        .send({"title":"Bible2", "body":"religious2","author":"God"})
        .set('accept','application/json')
        .expect(200, done);
        });
  });

  it('EDITING (PUT) with wrong properties should render articles/new route', function(done) {
   request(app)
     .post('/articles/')
     .type('form')
     .send({"title":"Bible", "body":"religious","author":"Jesus"})
     .set('accept','application/json')
     .expect(302)
     .end(function(err,res){
        request(app)
        .put('/articles/Bible')
        .type('form')
        .send({"titole":"Bible2", "body":"religious2","author":"God"})
        .set('accept','application/json')
        .expect(200, done);
        });
  });
});

describe('DELETE METHOD ARTICLES', function(){
  it('DELETING with good title should redirect to the articles/ route', function(done) {
   request(app)
     .post('/articles/')
     .type('form')
     .send({"title":"Bible", "body":"religious","author":"Jesus"})
     .set('accept','application/json')
     .expect(302)
     .end(function(err,res){
        request(app)
        .delete('/articles/Bible')
        .expect(303, done);
        });
  });
  it('DELETING with wrong title should redirect to the articles/new route', function(done) {
   request(app)
     .post('/articles/')
     .type('form')
     .send({"title":"Bible", "body":"religious","author":"Jesus"})
     .set('accept','application/json')
     .expect(302)
     .end(function(err,res){
        request(app)
        .delete('/articles/Bibleretret')
        .expect(200, done);
        });
  });


});


