const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();
const ongController = require('./controllers/ongController');
const incidentsController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

routes.post(
	'/sessions',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			id: Joi.string().required(),
		}),
	}),
	sessionController.create,
);

routes.get('/ongs', ongController.index);
routes.post(
	'/ongs',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			whatsapp: Joi.string().required().min(10).max(11),
			cidade: Joi.string().required(),
			uf: Joi.string().required().length(2),
		}),
	}),
	ongController.create,
);

routes.get('/incidents', incidentsController.index);

routes.post('/incidents', incidentsController.create);

routes.delete('/incidents/:id', incidentsController.delete);

routes.get(
	'/profile',
	celebrate({
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required(),
		}).unknown(),
	}),
	profileController.index,
);

module.exports = routes;
