const Sequelize = require("sequelize");
const UserModel = require('./user')
const VideoModel = require('./video')
const AspectRatioModel = require('./aspectRatio')
const TypeModel = require('./type')
const MetadataModel = require('./metadata')

const sqlite = require('sqlite3');
const db = new sqlite.Database("../../test.sqlite");
const sequelize = new Sequelize('database', '', '', {
  dialect: 'sqlite',
  storage: "../../test.sqlite"
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
