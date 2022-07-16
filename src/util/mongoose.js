module.exports = {
    multipleMongooseToObject: (mongooses) => {
        return mongooses.map(mongooses => mongooses.toObject())
    },
    mongooseToObject: (mongoose) => {
        return mongoose ? mongoose.toObject() : mongoose
    }
}