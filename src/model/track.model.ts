import mongoose from 'mongoose';

interface ITrack {
    trackingId: string;
    opens: number;
    userIps: string[];
}
const trackSchema = new mongoose.Schema({
    trackingId:{
        type: String,
        required: true,
        unique: true
    },
    opens:{
        type: Number,
        default: 0
    },      
    userIps:{
        type: [String],
        default: []
    }
})
const track = mongoose.model<ITrack>("Track", trackSchema)
export default track