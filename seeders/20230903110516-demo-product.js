'use strict';

const faker = require('faker/locale/en'); // Specify the locale as needed

const generateDummyProduct = () => ({
  productID: faker.datatype.uuid(),
  productName: faker.commerce.productName(),
  pictureUrl: faker.image.imageUrl(),
  shortDescription: faker.lorem.sentence(),
  benefits: faker.lorem.words(5),
  filterColor: faker.random.arrayElement(['Green', 'Blue', 'Black']),
  filterSize: faker.random.arrayElement(['Small', 'Medium', 'Large']),
  productType: faker.random.arrayElement(['Gift', 'Household']),
  price: faker.random.arrayElement([1000, 2000, 3000, 4000, 5000, 10000]),

});
const dummyProducts = Array.from({ length: 1000 }, () => generateDummyProduct());


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', dummyProducts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
