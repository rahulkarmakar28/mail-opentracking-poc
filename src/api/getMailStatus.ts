import { Hono } from "hono"
import Track from "../model/track.model"
const app = new Hono()
app.get('/get-mail-status/:id', async (c) => {
    const id = c.req.param('id')
    if (!id) {
        return c.json({ error: 'Tracking ID is required' }, 400)
    }
    try {
        const track = await Track.findOne({ trackingId: id })
        if (!track) {
            return c.json({ error: 'Tracking ID not found' }, 404)
        }
        return c.json({ track })
    } catch (error) {
        console.log(error)
        return c.json({ error: 'Failed to track error' }, 500)
    }
}
)
export default app