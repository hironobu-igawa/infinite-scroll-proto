import express from 'express';
import cors from 'cors';

import PhotoResource from './resources/photo_resource';

exports.start = () => {
  let app = express();

  app.use(cors());

  new PhotoResource().init(app);

  app.listen(3001);
};
