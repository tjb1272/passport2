module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define('post', {
      title: DataTypes.STRING
    });
  
    Post.associate = (models) => {
      models.post.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };
