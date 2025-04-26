import { Hono } from 'hono'
import { v4 as uuidv4 } from 'uuid'
import Track from '../model/track.model'
import { sendMail } from '../utils/sendMail'

const app = new Hono()

app.post('/send-mail', async (c) => {
    const { emails, password } = await c.req.json()
    console.log('emails', emails)
    console.log('password', password)
    if (!emails || !password) {
        return c.json({ error: 'Email and password are required' }, 400)
    }
    if (password !== Bun.env.PASSWORD)
        return c.json({ error: 'Invalid password' }, 401)

    //create trackId 
    const trackId = uuidv4()
    console.log('trackId', trackId)
    try {
        //create track in db
        const track = await Track.create({ trackingId: trackId })
        //send email 
        await sendMail(emails, trackId)
        return c.json({ message: 'Email sent successfully', track })
    } catch (error) {
        console.log(error)
        return c.json({ error: 'Failed to send email' }, 500)
    }

})
export default app