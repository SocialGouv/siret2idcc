const app = require("../index");
const request = require("supertest");

test("e2e : empty call should return 404", done => {
  request(app)
    .get("/api/v1/")
    .expect(404)
    .end((err, res) => {
      expect(res.text).toMatchSnapshot();
      done(err);
    });
});

test("e2e : /api/v1/82161143100015 should return convention", done => {
  request(app)
    .get("/api/v1/82161143100015")
    .expect(200)
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done(err);
    });
});

test("e2e : unknown siret should return empty array", done => {
  request(app)
    .get("/api/v1/99999999999999")
    .expect(200)
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done(err);
    });
});

test("e2e : invalid siret should return 422", done => {
  request(app)
    .get("/api/v1/banzai")
    .expect(422)
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done(err);
    });
});
