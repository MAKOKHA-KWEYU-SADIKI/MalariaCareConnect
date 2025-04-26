import  {Hono }from 'hono'
import "dotenv/config"
import {logger} from 'hono/logger'
import { HTTPException } from 'hono/http-exception'
import { timeout } from 'hono/timeout'
import { db } from './drizzle/db'
import { serve } from '@hono/node-server'
import {cors} from 'hono/cors'
import{prometheus} from '@hono/prometheus'
import{csrf} from 'hono/csrf'
import{trimTrailingSlash} from 'hono/trailing-slash'


const app = new Hono();
const customTimeoutException = () =>
    new HTTPException(408, {
      message: `Request timeout after waiting for more than 10 seconds`,
})
app.use('*',logger())
app.use(csrf()) 
app.use(trimTrailingSlash()) 
const { printMetrics, registerMetrics } = prometheus()
app.use('/timing', timeout(10000, customTimeoutException))
app.use('*', registerMetrics)
//my routing
import { authRouter } from './Authendication/auth.router'
import { userRouter } from './users/user.router'

app.route('/', authRouter)
app.route("/",userRouter)
const PORT=process.env.PORT || 3000
serve({
    fetch:app.fetch,
    port:Number(process.env.PORT || 3000)
})
console.log('The application is runing on port 8000')