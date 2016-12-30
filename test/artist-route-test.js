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
        request.post(`${url}/api/library/${this.tempLibrary.id}/artist`)
        .send(exampleArtist)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(exampleArtist.name);
          expect(res.body.libraryID).to.equal(this.tempLibrary._id.toString());
          done();
        });
      });
    });
  });
});
