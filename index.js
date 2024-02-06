import express, { json } from 'express';
import routes from './routes/routes.js';
import envConfigJs from "./env.config.js";
const { port } = envConfigJs;

const app = express()

app.use(json());
app.use('/', routes)

app.listen(port, (err) => {
  if (err) {
    console.log("Error while starting server");
  }
  else {
    console.log("Server has been started at " + port);
  }
})

export default app