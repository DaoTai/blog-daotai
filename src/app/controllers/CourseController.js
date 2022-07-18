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

    // [GET] /course/create
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course =>  res.render('courses/edit',{
                course: mongooseToObject(course)
            }))
            .catch(err => next(err))
    }

    // [PUT] /course/id
    update(req, res, next) {
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`
        Course.findOneAndUpdate({ _id: req.params.id}, formData) 
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
}

module.exports = new CourseController();
