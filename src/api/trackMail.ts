import { Hono } from 'hono'
import { getConnInfo } from 'hono/bun'
import { v4 as uuidv4 } from 'uuid'
import Track from '../model/track.model'
import { promises as fs } from 'fs'

const app = new Hono()

let imageBuffer:Buffer
(async()=>{
    try {
        imageBuffer = await fs.readFile(__dirname + '/assets/image.jpg')
    } catch (error) {
        console.error('Error reading image file:', error)
    }
})();
app.get('/track-mail/:id', async (c) => {
    const id = c.req.param('id')
    const userIp =
        c.req.raw.headers.get('true-client-ip') ||
        c.req.raw.headers.get('cf-connecting-ip') ||
        getConnInfo(c).remote.address as string

    if (!id) {
        return c.json({ error: 'Tracking ID is required' }, 400)
    }
    try {
        const track = await Track.findOne({ trackingId: id })
        if (!track) {
            return c.json({ error: 'Tracking ID not found' }, 404)
        }

        if(!track.userIps.includes(userIp)) {
            track.userIps.push(userIp)
            track.opens += 1
            await track.save()
        }

        //send an image in response 
        return new Response(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': imageBuffer.length.toString(),
                'Cache-Control': 'no-cache',
            },
        })
    } catch (error) {
        console.log(error)
        return c.json({ error: 'Failed to track error' }, 500)
    }
})

export default app