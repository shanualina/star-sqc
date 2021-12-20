
module.exports = (sequelize, Sequelize) => {
    const nationalityModel = sequelize.define("nationality", {
        name: {
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
    return nationalityModel;
};