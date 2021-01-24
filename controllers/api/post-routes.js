const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAut = require('../../utils/auth');


// find All
router.get('/', (req, res) => {
    Post.findAll({
        attributes:
            [
                'id',
                'title',
                'content',
                'created_at',
                'updated_at'
            ],

        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },

            {
                model: User,
                attributes: ['username']
            }
        ]
    }
    ).then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

    // post find all returns a promise. the result in the .then is stored in a variable. 

});

/************************************************************************************************************************************** */


//find One
router.get('/:id', (req, res) => {
    Post.findOne({

        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                module: User,
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


/************************************************************************************************************************************** */



router.post('/', withAut, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id

        ///ex :    "title": "testing my new app " , "content": "google.com", "user_id":1 
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

/************************************************************************************************************************************** */

//put/update 
router.put('/:id', withAut, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/************************************************************************************************************************************** */


//delete
router.delete('/:id', withAut, (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});




module.exports = router;
