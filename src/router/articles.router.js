const router = require("express").Router();
const Articles = require("../components/articles.component");
const articles = new Articles();

router.get("/", async (req, res, next) => {
    await articles.articles()
        .then(dta => res.status(200).json(dta))
        .catch(err => next(err))
});

router.get("/:slug", async (req, res, next) => {
    await articles.article({ slug: req.params.slug })
        .then(dta => res.status(200).json(dta))
        .catch(err =>  next(err))
});

router.put("/update/:index", async (req, res, next) => {
    await articles.update({ index: req.params.index })
        .then(dta => res.status(200).json(dta))
        .catch(err => next(err))
});

module.exports = router;