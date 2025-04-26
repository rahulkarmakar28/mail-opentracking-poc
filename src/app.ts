import {Hono} from "hono"
import dbConfig from "./config/db.config"
import {cors} from "hono/cors"
import sendMailRoute from "./api/sendMail"
import trackMailRoute from "./api/trackMail"
import getMailStatusRoute from "./api/getMailStatus"

const app = new Hono()
app.use(cors())
dbConfig()

app.get('/', (c)=>{
    return c.text('Hello Hono!')
})
app.route('/api/v1', sendMailRoute)
app.route('/api/v1', trackMailRoute)
app.route('/api/v1', getMailStatusRoute)


export default app