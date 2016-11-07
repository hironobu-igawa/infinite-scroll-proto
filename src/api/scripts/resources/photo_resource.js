import Photo from './../models/photo';

export default class PhotoResource {
  init(app) {
    app.get('/photos', this.index.bind(this));
  }

  index(req, res) {
    res.send(Photo.offset(req.query.offset).limit(req.query.limit).values());
  }
}
