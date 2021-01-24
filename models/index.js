const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');



// // create associations 
User.hasMany(Post, {
    foreignKey: 'user_id'
})


Post.belongsTo(User, {
    foreignKey: 'user_id'
});


// Post.hasOne(User, {
//     : 'user_id'
// });

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

module.exports = { Post, User, Comment };

