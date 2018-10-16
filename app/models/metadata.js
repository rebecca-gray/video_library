module.exports = (sequelize, Sequelize) =>

    sequelize.define('metadata', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        metadata: {
            type: Sequelize.BLOB
        }

    });
