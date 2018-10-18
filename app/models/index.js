const Sequelize = require("sequelize");
const UserModel = require('./user')
const VideoModel = require('./video')
const AspectRatioModel = require('./aspectRatio')
const TypeModel = require('./type')
const MetadataModel = require('./metadata')
const path = require('path')
const sqlite3 = require('sqlite3')
const dbPath = path.resolve(__dirname, 'test.db')
new sqlite3.Database(dbPath)

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  storage: dbPath,

  operatorsAliases: false
});

const User = UserModel(sequelize, Sequelize);
const Video = VideoModel(sequelize, Sequelize);
const AspectRatio = AspectRatioModel(sequelize, Sequelize);
const Type = TypeModel(sequelize, Sequelize);
const Metadata = MetadataModel(sequelize, Sequelize);

Video.belongsTo(AspectRatio);
Video.belongsTo(Type);
Video.belongsTo(Metadata);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });


module.exports = {
  User,
  Video,
  Type,
  AspectRatio,
  Metadata,
}
