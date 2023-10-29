import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String,
  rate: Number,
  isWatched: Boolean,
});

export default mongoose.model('Movie', movieSchema);
