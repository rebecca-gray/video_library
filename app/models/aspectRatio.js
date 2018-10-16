module.exports = (sequelize, Sequelize) =>

    sequelize.define('aspectRatio', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        aspect: {
            type: Sequelize.TEXT
        }

    });
