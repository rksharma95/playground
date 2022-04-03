const mongoose = require('mongoose');
const postModel = require("../models/postModel");
const post = { title: "test post title", body: "test post body" };

describe('Posts Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('create & save user successfully', async () => {
        const validPost = new postModel(post);
        const savedPost = await validPost.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedPost._id).toBeDefined();
        expect(savedPost.title).toBe(post.title);
        expect(savedPost.body).toBe(post.body);
    });

    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const postWithInvalidField = new postModel({ name: "title", body: "body", author: "annonymous" });
        const savedPostWithInvalidField = await postWithInvalidField.save();
        expect(savedPostWithInvalidField._id).toBeDefined();
        expect(savedPostWithInvalidField.author).toBeUndefined();
    });

    // It should us told us the errors in on gender field.
    it('create post without required field should failed', async () => {
        const postWithoutRequiredField = new postModel({ title: "title" });
        let err;
        try {
            const savedPostWithoutRequiredField = await postWithoutRequiredField.save();
            error = savedPostWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.body).toBeDefined();
    });

    
})