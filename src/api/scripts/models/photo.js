import Relation from './relation';

export default class Photo {
  constructor(data) {
    Object.assign(this, data);
  }

  static create(data) {
    let id = Photo.resource.length + 1;
    return Photo.resource[id - 1] = {
      id: id,
      url: data.url,
      width: data.width,
      height: data.height
    };
  }

  static values() {
    return Photo.resource.map((v) => new Photo(v));
  }

  static offset(offset) {
    return new Relation(Photo.values()).offset(offset);
  }

  static limit(limit) {
    return new Relation(Photo.values()).limit(limit);
  }
}

Photo.resource = [];

const WEB_SERVER_PORT = 3000;

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/1.jpeg`,
  width: 301,
  height: 201
});

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/2.jpeg`,
  width: 302,
  height: 202
});

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/3.jpeg`,
  width: 303,
  height: 203
});

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/4.jpeg`,
  width: 304,
  height: 204
});

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/5.jpeg`,
  width: 305,
  height: 205
});

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/6.jpeg`,
  width: 306,
  height: 206
});

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/7.jpeg`,
  width: 307,
  height: 207
});

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/8.jpeg`,
  width: 308,
  height: 208
});

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/9.jpeg`,
  width: 309,
  height: 209
});

Photo.create({
  url: `http://localhost:${WEB_SERVER_PORT}/10.jpeg`,
  width: 309,
  height: 209
});
