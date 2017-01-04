'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Library = require('../model/library.js');
// const Artist = require('../model/artist.js');

const PORT = 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleLibrary = {
  name: 'test library',
  timestamp: new Date()
};

const exampleArtist = {
  name: 'test artist',
  genre: 'test genre'
};

describe('Library Routes', function() {
  describe('POST: /api/library', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempLibrary) {
          Library.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a library', done => {
        request.post(`${url}/api/library`)
        .send(exampleLibrary)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test library');
          this.tempLibrary = res.body;
          done();
        });
      });
    });
    describe('with an invalid body', function() {
      it('should throw a 400 bad request', done => {
        request.post(`${url}/api/library`)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/library/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Library(exampleLibrary).save()
        .then( library => {
          this.tempLibrary = library;
          return Library.findByIdAndAddArtist(library._id, exampleArtist);
        })
        .then( note => {
          this.tempNote = note;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempLibrary) {
          Library.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a library', done => {
        request.get(`${url}/api/library/${this.tempLibrary._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test library');
          expect(res.body.artists.length).to.equal(1);
          expect(res.body.artists[0].name).to.equal(exampleArtist.name);
          done();
        });
      });
    });
    describe('with an invalid request', function() {
      it('should throw a 404 not found', done => {
        request.get(`${url}/api/library`)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/library/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Library(exampleLibrary).save()
        .then( library => {
          this.tempLibrary = library;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempLibrary) {
          Library.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a library', done => {
        var updated = { name: 'updated name' };

        request.put(`${url}/api/library/${this.tempLibrary._id}`)
        .send(updated)
        .end((err, res) => {
          if (err) return done(err);
          let timestamp = new Date(res.body.timestamp);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(updated.name);
          expect(timestamp.toString()).to.equal(exampleLibrary.timestamp.toString());
          done();
        });
      });
    });
    describe('with an invalid body', function() {
      it('should throw a 404 not found', done => {
        request.put(`${url}/api/library`)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('DELETE: /api/library/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Library(exampleLibrary).save()
        .then( library => {
          this.tempLibrary = library;
          done();
        })
        .catch(done);
      });
      after( done => {
        if(this.tempLibrary) {
          Library.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should delete library', done => {
        request.delete(`${url}/api/library/${this.tempLibrary._id}`)
        .end((err, res) => {
          if(err) return done();
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
    describe('with an invalid body', function() {
      it('should throw a 404 not found', done => {
        request.delete(`${url}/api/library`)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
