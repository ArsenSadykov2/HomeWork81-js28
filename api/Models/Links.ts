import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LinksSchema = new Schema({
    originalUrl: {
        type: String,
        required: true },
    shortUrl: {
        type: String,
        required: true,
        unique: true }
});

const Link = mongoose.model('Link', LinksSchema);
export default Link;