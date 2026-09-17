import 'dotenv/config';
import {app} from './app.js';
import {pool} from './db.js';
const port=Number(process.env.PORT||4000);
const server=app.listen(port,()=>console.log(`Marea House API listening on http://localhost:${port}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{server.close(async()=>{await pool.end();process.exit(0);});setTimeout(()=>process.exit(1),10000).unref();});
