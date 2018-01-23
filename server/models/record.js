import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  name: {type:String},
  rating: {type: Array}
});

const Record = mongoose.model('Record', RecordSchema);

export default Record;
