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
        Course.updateOne({ _id: req.params.id}, formData) 
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [PATCH] /course/id
    restore(req, res, next) {
        Course.restore({ _id: req.params.id}) 
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /course/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /course/:id/force-delete
    forceDelete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /course/handle-all
    handleAll(req, res, next) {
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: { $in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next)
                break;
            case 'restore':
                Course.restore({_id: { $in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next)
                break;
            case 'force-delete':
                Course.deleteMany({_id: { $in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next)
                break;
            default:
                res.json({message: "Action is invalid"})
        }
        
    }
}

module.exports = new CourseController();
