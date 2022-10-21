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
    
        const cod_p = 14122;
        console.time("redissave");
    //for(let i=0;i<5;i++){
            let candidatos = await client.get(`${cod_p}`);
        if (!candidatos) {
            const [rows] = await conn.query(`select * from candidatos where numero = ? ` ,[cod_p]);
            candidatos = rows[0];
            await client.set(`${cod_p}`, JSON.stringify(candidatos));
            
        }
        else
            console.log(JSON.parse(candidatos));
            
    
    //}
    console.timeEnd("redissave");
        
})();

