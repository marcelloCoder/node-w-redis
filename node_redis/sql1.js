(async ()=>{

    const mysql = require("mysql2/promise");
    const conn = await mysql.createConnection("mysql://root:@localhost:3306/tse2022");
    console.log("Conectou no MySQL!");
    const redis = require('redis');
    const client = redis.createClient();
    client.connect();
    
    client.on("error", (error) => {
        console.error(error);
    });
    
        const cod_p = 90001723653;
        console.time("redissave");
    //for(let i=0;i<5;i++){
            let bens = await client.get(`${cod_p}`);
        if (!bens) {
            const [rows] = await conn.query(`select * from bens where sq_cand = ? ` ,[cod_p]);
            bens = rows[0];
            await client.set(`${cod_p}`, JSON.stringify(bens));
            
        }
        else
            console.log(JSON.parse(bens));
            
    
    //}
    console.timeEnd("redissave");
        
})();

