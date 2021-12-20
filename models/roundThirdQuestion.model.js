module.exports = (sequelize, Sequelize) => {
    const roundTwoQueModel = sequelize.define("roundTwoQue", {
        quesrionNO: {
            type: Sequelize.STRING
        },
        question: {
            type: Sequelize.STRING
        },
        video: {
            type: Sequelize.STRING
        },
        ansOne: {
            type: Sequelize.STRING
        },
        ansTwo: {
            type: Sequelize.STRING
        },
        ansThree: {
            type: Sequelize.STRING
        },
        ansFour: {
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
        },
        flag: {
            type: Sequelize.BOOLEAN
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });
    return roundTwoQueModel;
};
