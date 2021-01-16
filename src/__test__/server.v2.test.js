const app = require("../index");
const request = require("supertest");

test("e2e : empty call should return 404", (done) => {
  request(app)
    .get("/api/v2/")
    .expect(404)
    .end((err, res) => {
      expect(res.text).toMatchSnapshot();
      done(err);
    });
});

test("e2e : /api/v2/82161143100015 should return convention", (done) => {
  request(app)
    .get("/api/v2/82161143100015")
    .expect(200)
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done(err);
    });
});

test("e2e : unknown siret should return empty array", (done) => {
  request(app)
    .get("/api/v2/99999999999999")
    .expect(200)
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done(err);
    });
});

test("e2e : invalid siret", (done) => {
  request(app)
    .get("/api/v2/banzai")
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done(err);
    });
});

test("e2e : /api/v2/82161143100015,82161143100016,82161143100017 should return conventions", (done) => {
  request(app)
    .get("/api/v2/82161143100015,82161143100016,82161143100017")
    .expect(200)
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done(err);
    });
});

test("e2e : /api/v2/82161143100015,xxx,82161143100123,11111111111111 should return conventions", (done) => {
  request(app)
    .get("/api/v2/82161143100015,xxx,82161143100123,11111111111111")
    .expect(200)
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done(err);
    });
});
