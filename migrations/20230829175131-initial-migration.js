'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('Pages', {
      pageID: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      urlEndpoint: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      conditional: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,

        defaultValue: []
      },
      questionID: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
    });

    await queryInterface.createTable('Answers', {
      answerID: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      conditional: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,

      },
      questionID: {
        type: Sequelize.STRING,
        foreignKey: true,
        allowNull: false,
      },
      creationTimestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      modifiedTimestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });


    await queryInterface.createTable('Conditions', {
      answerID: {
        type: Sequelize.UUID,
        allowNull: false,

      },
      ConditionID: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      urlEndPoint: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      questionID: {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
      }
    });

    await queryInterface.createTable('RecordAnswer', {
      RAnswerID: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      questionaireID: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      questionID: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      answer: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: []
      }
    })
    await queryInterface.createTable('Questions', {
      questionID: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM({ values: ['card', 'sliders', 'buttons'] }),
        allowNull: false
      },
      conditional: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      answerID: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },

      pageID: {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
      },
      text: { type: Sequelize.STRING, allowNull: false }
    });
    await queryInterface.createTable('Selectors', {
      selectorID: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(['active', 'blocked']),
        allowNull: false,
        defaultValue: 'active'
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });

    await queryInterface.createTable('Products', {
      productID: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pictureUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shortDescription: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      benefits: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filterColor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filterSize: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productType: {
        type: Sequelize.ENUM(['Gift', 'Household'])
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      }
    });

    await queryInterface.createTable('Questionaires', {
      questionaireID: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      pageUrlEndpoint: {
        type: Sequelize.DECIMAL,
        defaultValue: 1,
        allowNull: true,

      },
      selectorID: {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
      },
      status: { type: Sequelize.ENUM(['completed', 'in-progress']) },
      creationTimestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      modifiedTimestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable('QuestionAnswers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'questionID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      answerID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Answers',
          key: 'answerID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      AnswerAnswerID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Answers',
          key: 'answerID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }, { timestamps: false });


  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('Pages');
    await queryInterface.dropTable('QuestionAnswers')
    await queryInterface.dropTable('Questions');
    await queryInterface.dropTable('Selectors');
    await queryInterface.dropTable('Answers');
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('Questionaires');
    await queryInterface.dropTable('RecordAnswer');
    await queryInterface.dropTable('Conditions')
  }
};
