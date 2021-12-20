module.exports = (sequelize, Sequelize) => {
    const categoryModel = sequelize.define("category", {
        name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        },
        categoryImage: {
            type: Sequelize.STRING
        },
        serialNo:{
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });
    return categoryModel;
};
