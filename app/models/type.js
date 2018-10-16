module.exports = (sequelize, Sequelize) =>

    sequelize.define('type', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        type: {
            type: Sequelize.TEXT
        }

    });
