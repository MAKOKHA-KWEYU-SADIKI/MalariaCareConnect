import {migrate} from 'drizzle-orm/neon-http/migrator';
import {db} from './db';

async function migration(){
    try{
        console.log('_Migration started_');
        await migrate(db,{
            migrationsFolder: __dirname + '/migrations',
        });
        console.log("Migration completed");
        process.exit(0);
    } catch(error){
        console.log("Migration unsuccessful", error);
       
    }
}

migration().catch((e) => {
    console.error("Unexpected error",e);

})