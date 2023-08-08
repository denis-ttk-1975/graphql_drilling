import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: String,
  age: Number,
});

export default mongoose.model('Director', directorSchema);
