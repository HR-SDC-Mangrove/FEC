const express = require('express');
const compression = require('compression');
const reviewsRouter = express.Router();
const reviewsController = require('../controllers/reviewsController');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const upload = multer();

reviewsRouter.get('/meta/:productId', reviewsController.getReviewsMeta);

reviewsRouter.get('/:productId/:sortMethod', compression(), reviewsController.getReviews);

reviewsRouter.put('/:reviewId/report', reviewsController.reportReview);

reviewsRouter.put('/:reviewId/helpful', cookieParser(), reviewsController.markReviewHelpful);

reviewsRouter.post('/', upload.any(), reviewsController.postNewReview);

module.exports = reviewsRouter;
