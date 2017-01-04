'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Library = require('../model/library.js');
const Artist = require('../model/artist.js');

const PORT = 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleArtist = {
  name: 'test artist',
  genre: 'test artist content'
};

const exampleLibrary = {
  name: 'example library',
  timestamp: new Date()
};

describe('Artist Routes', function() {
  describe('POST: /api/library/:libraryID/artist', function() {
    describe('with a valid library id and artist body', () => {
      before( done => {
        new Library(exampleLibrary).save()
        .then( library => {
          this.tempLibrary = library;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          Library.remove({}),
          Artist.remove({})
        ])
        .then(() => done())
        .catch(done);
      });

      it('should return an artist', done => {
        request.post(`${url}/api/library/${this.tempLibrary._id}/artist`)
        .send(exampleArtist)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(exampleArtist.name);
          expect(res.body.libraryID).to.equal(this.tempLibrary._id.toString());
          done();
        });
      });
    });
    describe('with an invalid LibraryID', () => {
      it('should return a 404 status code', done => {
        request.post(`${url}/api/library/0000/artist`)
        .send(exampleArtist)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('with an invalid artist body', () => {
      it('should return a 400 status code', done => {
        request.post(`${url}/api/library/`)
        .send({}) //TODO: fix this line to pass tests
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('GET: api/artist/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        exampleLibrary.timestamp = new Date();
        new Library(exampleLibrary).save()
        .then( library => {
          this.tempLibrary = library;
          return Library.findByIdAndAddArtist(library._id, exampleArtist);
        })
        .then( artist => {
          this.tempArtist = artist;
          done();
        })
        .catch(done);
      });
      after( done => {
        Promise.all([
          Library.remove({}),
          Artist.remove({})
        ])
        .then( () => done())
        .catch(done);
      });
      it('should return an artist', done => {
        request.get(`${url}/api/artist/${this.tempArtist._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test artist');
          done();
        });
      });
    });
    describe('invalid get request', function() {
      it('should throw a 404 status code', done => {
        request.get(`${url}/api/artist/`)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('PUT: /api/artist/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Artist(exampleArtist).save()
        .then( artist => {
          this.tempArtist = artist;
          done();
        })
        .catch(done);
      });
      after( done => {
        if(this.tempArtist) {
          Artist.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should update by id', done => {
        request.put(`${url}/api/artist/${this.tempArtist._id}`)
        .send({name:'name', genre:'genre'})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('name');
          expect(res.body.genre).to.equal('genre');
          done();
        });
      });
    });
    describe('bad put request', function() {
      it('should thorw a 404 status code', done => {
        request.put(`${url}/api/artist/`)
        .send({name:'name', genre:'genre'})
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('DELETE: /api/artist/:id', function() {
    describe('with a valid body', function() {
      before(done => {
        new Artist(exampleArtist).save()
        .then( artist => {
          this.tempArtist = artist;
          done();
        })
        .catch(done);
      });
      after( done => {
        if(this.tempArtist) {
          Artist.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should delete an artist', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
    describe('bad delete request', function() {
      it('should throw a 404 status code', done => {
        request.delete(`${url}/api/artist`)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
