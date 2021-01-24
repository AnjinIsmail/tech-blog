const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Post extends Model {
    // static post(body, models) {
    //     return models.post.create({
    //         user_id: body.user_id,
    //         post_id: body.post_id
    //     }).then(() => {
    //         return Post.findOne({
    //             where: {
    //                 id: body.post_id
    //             },
    //             attributes: [
    //                 'id',
    //                 'content',
    //                 'title',
    //                 'created_at',
    //             ],
    //             include: [
    //                 {
    //                     model: models.Comment,
    //                     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],

    //                 },
    //                 {
    //                     model: models.User,
    //                     attributes: ['username']
    //                 }
    //             ]
    //         });
    //     });
    // }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }

        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }

    },
    {
        sequelize,
        freeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;
