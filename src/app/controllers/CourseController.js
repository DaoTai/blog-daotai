const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose')

class CourseController {
    // [GET] /course/:slug
    show(req, res, next) {
        // Tên của slug tương ứng với tên slug được route bên routes course
        Course.findOne({
            slug: req.params.slug
        })
            .then(course =>  res.render('courses/show',{
                course: mongooseToObject(course)
            }))
            .catch(err => next(err))
    }

    // [GET] /course/create
    create(req, res, next) {
       res.render('courses/create')
    }

     // [POST] /course/store
    store(req, res, next) {
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/hqdefault.jpg`
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(err => next(err))
    }
}

module.exports = new CourseController();
