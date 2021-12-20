
module.exports = (sequelize, Sequelize) => {
    const roundTwoQueModel = sequelize.define("roundTwoQue", {
        qutinNo: {
            type: Sequelize.STRING
        },
        question: {
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
        clueOneVideo: {
            type: Sequelize.STRING
        },
        clueOneqution: {
            type: Sequelize.STRING
        },
        clueOneImage: {
            type: Sequelize.STRING
        },
        clueOnePoint: {
            type: Sequelize.STRING
        },
        clueTwoVideo: {
            type: Sequelize.STRING
        },
        cluetwoqution: {
            type: Sequelize.STRING
        },
        clueTwoImage: {
            type: Sequelize.STRING
        },
        clueTwoPoint: {
            type: Sequelize.STRING
        },
        clueThreeVideo: {
            type: Sequelize.STRING
        },
        clueThreeqution: {
            type: Sequelize.STRING
        },
        clueThreeImage: {
            type: Sequelize.STRING
        },
        clueThreePoint: {
            type: Sequelize.STRING
        },
        clueTime: {
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
    return roundTwoQueModel;
};
