const router = require('express').Router();
const userController = require('../../controllers/userControllers')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../models');

router.route('/signup').post(
    [
        body('username', 'Please enter a Valid Username')
        .not()
        .isEmpty(),
        body('password', 'Please enter a Valid password').isLength({
            min: 8
        }),
        body('email', 'Please enter a Valid email').isEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        let {
            username,
            email,
            password
        } = req.body;

        // const oldPassword = password;
        
        bcrypt.genSalt(10, await function (err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                password = hash;
                return password;
            })
        })
       
        let user = await db.User.findOne({
            email
        });
    
        if (user) {
            return res.status(400).json({
                msg: 'User Already Exists'
            });
        }   
       
        await db.User.create({
            username: username,
            password: password,
            email: email
        })
        .then(user => {
            const payload = {
                user: {
                    id: user.id,
                    // password: oldPassword
                }
            };
            console.log('payload', payload);
            jwt.sign(
                payload,
                'secret', {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            )
            res.json(user)})
        .catch(err => {
            console.log(err.message);
            res.status(500).send('Error in Saving');
        })
    },
);

router.route('/login').post(
    [
        body('email', 'Please enter a Valid email')
        .isEmail(),
        body('password', 'Please enter a Valid password').isLength({
            min: 8
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        let {
            email,
            password
        } = req.body

        let user = await db.User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                msg: 'User Doesn\'t Exists'
            });
        }

        console.log('user', user.password);
        console.log('password', password);
        let isMatch;
        await bcrypt.compare(password, user.password, function(err, res) {
            isMatch = res;
            console.log(isMatch);
            
        });
        
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password!'})
        };

//             await user.create();
//             const payload ={
//                 user: {
//                     id: user.id
//                 }
//             };

//             jwt.sign(
//                 payload,
//                 'randomString', {
//                     expiresIn: 10000
//                 },
//                 (err, token) => {
//                     if (err) throw err;
//                     res.status(200).json({
//                         token
//                     });
//                 }
//             );
//         } catch (err) {
//             console.log(err.message);
//             res.status(500).send('Error in Saving');
//         }
//     }
    }
);

router.route('/:id')
    .get(userController.findUserById)
    .put(userController.updateUser)

module.exports = router