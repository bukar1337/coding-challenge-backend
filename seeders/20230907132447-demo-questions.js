'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const uuidv4 = require('uuid').v4;
    const questionsText = await getRandomDataForQuestion()
    const answerText = await getRandomDataForAnswer()

    const questions = Array.from({ length: 4 }).map((_, i) => (
      {
        questionID: uuidv4(),
        type: ['card', 'sliders', 'buttons'][Math.floor(Math.random() * 3)],
        pageID: uuidv4(),
        answerID: answerText[i].answerID,
        text: questionsText[i].text,
      }),

    );
    const answerArray = answerText.map((el, i) => {

      return el.answer.map((element, j) => {
        return {
          answerID: el.answerID[j],
          value: element,
          questionID: questions[i].questionID
        }
      })
    })
    await queryInterface.bulkInsert('Questions', questions, {});
    await answerArray.forEach(async el => {
      await queryInterface.bulkInsert('Answers', el, {})
    })

    const pages = Array.from({ length: 4 }).map((_, i) => ({
      pageID: questions[i].pageID,
      urlEndpoint: i + 1,
      questionID: [questions[i].questionID],

    }));
    await queryInterface.bulkInsert('Pages', pages, {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Pages', null, {});
    await queryInterface.bulkDelete('Answers', null, {})
  }
};


async function getRandomDataForQuestion() {

  return [
    {
      text: 'What kind of product you need?',
      answerID: ["d61b249e-fc92-4bf0-869d-75b981273ea4", "8d8d7443-029b-43cf-b385-332b311e909c"]
    },
    {
      text: 'In which color?',
      answerID: ["c1bfa212-43c2-4db4-8543-4decaf47b284", "95db6d5f-1fd1-4a6f-bc67-e6bf6784b0f3", "fda9d4bf-1b4f-4b88-bbc0-5ec5935891d8"]
    },
    {
      text: 'In which size?',
      answerID: ["e223aaee-2e96-448b-a93d-8e3c3f760557", "8cdf41d8-d6f9-4451-9318-23826e4b0d92", "ac8af380-51cf-44ab-bd43-e3ade83e2938"]

    },
    {
      text: 'What is your maximum price (upper limit)?',
      answerID: ["726bd8a5-81b0-4deb-8010-91381cebdbcf", "2ee0a32d-c435-457f-b2f5-8b057f504584", "91fe3c1a-a8b4-407c-bff3-23c80612ee06", "b3d68495-8752-4925-8c39-53dc82ff5fe1"]
    },
  ]
}
async function getRandomDataForAnswer() {
  return [
    {
      answer: ['Household', 'Gift'],
      answerID: ["d61b249e-fc92-4bf0-869d-75b981273ea4", "8d8d7443-029b-43cf-b385-332b311e909c"]
    },
    {
      answer: ['Green', 'Blue', 'Black'],
      answerID: ["c1bfa212-43c2-4db4-8543-4decaf47b284", "95db6d5f-1fd1-4a6f-bc67-e6bf6784b0f3", "fda9d4bf-1b4f-4b88-bbc0-5ec5935891d8"]
    },
    {
      answer: ['Small', 'Large', 'Medium'],
      answerID: ["e223aaee-2e96-448b-a93d-8e3c3f760557", "8cdf41d8-d6f9-4451-9318-23826e4b0d92", "ac8af380-51cf-44ab-bd43-e3ade83e2938"]

    },
    {
      answer: ['1000', '5000', '10000', '2000'],
      answerID: ["726bd8a5-81b0-4deb-8010-91381cebdbcf", "2ee0a32d-c435-457f-b2f5-8b057f504584", "91fe3c1a-a8b4-407c-bff3-23c80612ee06", "b3d68495-8752-4925-8c39-53dc82ff5fe1"]
    },

  ]
}