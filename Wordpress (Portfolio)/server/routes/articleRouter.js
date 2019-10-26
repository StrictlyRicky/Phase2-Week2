const router = require('express').Router()
const ArticleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')
// const images = require('../helpers/images')

router.use(authentication, authorization)
router.get("/", ArticleController.findAll)
router.get("/:id", ArticleController.findOne)
router.post("/", ArticleController.create)
router.patch("/:id", ArticleController.update)
router.delete("/:id", ArticleController.delete)
// router.post('/uploadGCS/:id', images.multer.single('image'), images.sendUploadToGCS, ArticleController.uploadGCS)

module.exports = router