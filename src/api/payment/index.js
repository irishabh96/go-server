import { Router } from 'express';
import Payment from './model';
import Razorpay from 'razorpay';
import { schema } from './model';
import Promise from 'bluebird';
import { success, notFound } from '../../services/response/';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import config from '../../config';
const router = new Router();

const instance = new Razorpay({
	key_id: config.razorPayKeyId,
	key_secret: config.razorPayKeySecret
});

router.get('/:id/:user/:event', function(req, res) {
	const user = req.params.user;
	const event = req.params.event;
	const paymentId = req.params.id;
	instance.payments.fetch(req.params.id).then((json) => {
		Payment.create(
			{
				paymentResponse: json,
				user: user,
				event: event
			},
			function(err, response) {
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(200).json(response);
				}
			}
		);
	});
});

export const index = (req, res, next) => {
	Payment.find({ user: req.params.id }).populate('event').then(success(res)).catch(next);
};
router.get('/fetch/:id', query(), index);

export const AllPayment = (req, res, next) => {
	Payment.find().populate('event').then(success(res)).catch(next);
};
router.get('/fetch', query(), AllPayment);
export default router;
