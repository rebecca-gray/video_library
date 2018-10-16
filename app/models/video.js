module.exports = (sequelize, Sequelize) =>

    sequelize.define('video', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        title: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        author: {
            type: Sequelize.TEXT,
            allowNull: true
        },

        date: {
            type: Sequelize.TEXT,
            allowNull: true
        },

        source: {
            type: Sequelize.TEXT,
            allowNull: true
        },

        video: {
            type: Sequelize.BLOB,
            allowNull: false
        }
    });
