module.exports = (sequelize, Sequelize) => {
    const userSetModel = sequelize.define("userset", {
        userSet: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        endTime: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        flag: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        updateBy: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });
    return userSetModel;
};