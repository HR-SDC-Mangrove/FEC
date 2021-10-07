require('dotenv').config();
const axios = require('axios');
const imgbbUploader = require('imgbb-uploader');
const multer = require('multer');
const upload = multer();

const baseUrl = 'localhost:8888';

const getQuestions = (req, res) => {
  let num = req.params.productId;

  //let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${num}&page=1&count=100`;
  let url = `${baseUrl}/qa/questions?product_id=${num}&page=1&count=100`;

  axios
    .get(url, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.log('err', err);
    });
};

const postQuestion = (req, res) => {
  let data = req.body.data;
  //let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions';
  let url = `${baseUrl}/qa/questions`;

  axios
    .post(url, data, {
      headers: {
        Authorization: process.env.TOKEN,
      },
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log('err', err);
    });
};

const markAnswerHelpful = (req, res) => {
  let answerId = req.body.answerId;
  //let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/helpful`;
  let url = `${baseUrl}/qa/answers/${answerId}/helpful`;

  axios
    .put(
      url,
      {},
      {
        headers: {
          Authorization: process.env.TOKEN,
        },
      }
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const markQuestionHelpful = (req, res) => {
  let questionId = req.body.questionId;
  // let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/helpful`;
  let url = `${baseUrl}/qa/questions/${questionId}/helpful`;

  axios
    .put(
      url,
      {},
      {
        headers: {
          Authorization: process.env.TOKEN,
        },
      }
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const reportQuestion = (req, res) => {
  let questionId = req.body.questionId;
  // let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/report`;
  let url = `${baseUrl}/qa/questions/${questionId}/report`;

  axios
    .put(
      url,
      {},
      {
        headers: {
          Authorization: process.env.TOKEN,
        },
      }
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const reportAnswer = (req, res) => {
  let answerId = req.body.answerId;
  // let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/report`;
  let url = `${baseUrl}/qa/answers/${answerId}/report`;

  axios
    .put(
      url,
      {},
      {
        headers: {
          Authorization: process.env.TOKEN,
        },
      }
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const postAnswer = async (req, res) => {
  try {
    let questionId = req.body.questionId;
    // let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/answers`;
    let url = `${baseUrl}/qa/questions/${questionId}/answers`;

    let data = {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
    };

    if (req.files.length) {
      let files = req.files.map((file, i) => {
        return new Promise(async (resolve, reject) => {
          let base64string = file.buffer.toString('base64');
          let options = {
            apiKey: process.env.IMG_API_KEY,
            base64string,
          };

          let url = await imgbbUploader(options);
          resolve(url.image.url);
        });
      });

      let fileUrls = await Promise.all(files);
      data.photos = fileUrls;
    }

    axios
      .post(url, data, {
        headers: {
          Authorization: process.env.TOKEN,
        },
      })
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    res.send(error);
  }
};

const getProductName = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.productId}`;
  //let url = `${baseUrl}/qa/answers/${answerId}/helpful`;

  // axios.get(url, {
  //   headers: {
  //     Authorization: process.env.TOKEN
  //   }
  // })
  //   .then(response => {
  //     res.json(response.data);
  //   })
  //   .catch(err => {
  //     console.log('err', err);
  //   });
};

module.exports = {
  getQuestions,
  postQuestion,
  markAnswerHelpful,
  markQuestionHelpful,
  reportQuestion,
  reportAnswer,
  postAnswer,
  getProductName,
};
