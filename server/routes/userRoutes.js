const express=require('express')

const router=express.Router()

const authController=require('../controllers/authController')

const authMiddleware=require('../middlewares/authMiddleware')

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
// router.post('/token/verify', authController.verifyToken);
// router.post('/password/change', authMiddleware.verify, authController.changepassword);
router.get('/logout', authMiddleware.verify, authController.logout);
// router.get('/token/refresh', authMiddleware.verify, authController.refreshToken);


module.exports = router