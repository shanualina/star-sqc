module.exports = (sequelize, Sequelize) => {
    const countryModel = sequelize.define("country", {
        country_name: {
            type: Sequelize.STRING
        },
        country_code: {
            type: Sequelize.STRING
        },
        flag: {
            type: Sequelize.BOOLEAN
        },
        nationalityId: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }

    });
    return countryModel;
};
// coun_id,created_at,coun_name,coun_code,updated_at,flag