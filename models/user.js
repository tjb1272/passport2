const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      password2: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (User, options) => {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(User.password, salt);
          User.password = hash;
        }
      }
    }
  );

  User.associate = (models) => {
    models.User.hasMany(models.post);
  };

  return User;
};
