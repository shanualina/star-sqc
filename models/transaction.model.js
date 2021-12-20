module.exports = (sequelize, Sequelize) => {
    const transactionModel = sequelize.define("transaction", {
        userId: {
            type: Sequelize.INTEGER
        },
        questionId: {
            type: Sequelize.INTEGER
        },
        userSetId: {
            type: Sequelize.STRING
        },
        userAns: {
            type: Sequelize.STRING
        },
        userPoint: {
            type: Sequelize.INTEGER
        },
        userRound: {
            type: Sequelize.INTEGER
        },
        bouncePoint: {
            type: Sequelize.INTEGER
        },
        qtimeTaken: {
            type: Sequelize.STRING
        },
        flag: {
            type: Sequelize.BOOLEAN
        },
        updatedBy: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });
    return transactionModel;
};
