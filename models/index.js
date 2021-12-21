const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    logging: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    },
    timezone: '+05:30',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.userModel = require("./user.model")(sequelize, Sequelize);
db.categoryModel = require("./category.model")(sequelize, Sequelize);
db.countryModel = require("./country.model")(sequelize, Sequelize);
db.nationalityModel = require("./nationality.model")(sequelize, Sequelize);
db.roundOneQuestionModel = require("./roundOneQuestion.model")(sequelize, Sequelize);
db.roundTwoQuestionModel = require("./roundTwoQuestion.model")(sequelize, Sequelize);
db.roundThirdQuestionModel = require("./roundThirdQuestion.model")(sequelize, Sequelize);
db.userSetModel = require("./userSet.model")(sequelize, Sequelize);
db.transactionModel = require("./transaction.model")(sequelize, Sequelize);


//forgein key relations

db.nationalityModel.belongsTo(db.userModel);
db.categoryModel.belongsTo(db.userModel);

module.exports = db;