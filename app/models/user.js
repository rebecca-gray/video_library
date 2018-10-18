module.exports = (sequelize, Sequelize) =>

    sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        email: {
            type: Sequelize.TEXT
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        }

    });
