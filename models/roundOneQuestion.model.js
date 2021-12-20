
module.exports = (sequelize, Sequelize) => {
    const roundOneQueModel = sequelize.define("roundOneQue", {
        categoryId: {
            type: Sequelize.STRING
        },
        videos: {
            type: Sequelize.STRING
        },
        questionNo: {
            type: Sequelize.INTEGER
        },
        question: {
            type: Sequelize.STRING
        },
        optionFirst: {
            type: Sequelize.STRING
        },
        optionSec: {
            type: Sequelize.STRING
        },
        optionThird: {
            type: Sequelize.STRING
        },
        optionFourth: {
            type: Sequelize.STRING
        },
        correctAns: {
            type: Sequelize.STRING
        },
        point: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.STRING
        },//sencond
        flag: {
            type: Sequelize.BOOLEAN
        },
        updatedBy: {
            type: Sequelize.BOOLEAN
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });
    return roundOneQueModel;
};

