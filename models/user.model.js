module.exports = (sequelize, Sequelize) => {
    const userModel = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        emailId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nationalityId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        countryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        countryCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mobileNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN
        },
        flag: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        lastLogin: {
            type: Sequelize.DATE
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        fbLoginId: {
            type: Sequelize.STRING
        },
        googleLoginId: {
            type: Sequelize.STRING
        },
        fbLoginData: {
            type: Sequelize.JSON
        },
        googleLoginData: {
            type: Sequelize.JSON
        },
        LoginBy: {
            type: Sequelize.INTEGER,
            //fb 1 google 2
        },
        fbProfilePic: {
            type: Sequelize.STRING,
        },
        googleProfilepic: {
            type: Sequelize.STRING
        },
        updateBy: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },

    });
    return userModel;
};