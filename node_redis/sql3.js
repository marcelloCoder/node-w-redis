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
    
        const cod_p = 20;
        console.time("redissave");
    //for(let i=0;i<5;i++){
            let partido = await client.get(`${cod_p}`);
        if (!partido) {
            const [rows] = await conn.query(`SELECT * FROM partido  ` ,[cod_p]);
            partido = rows[0];
            await client.set(`${cod_p}`, JSON.stringify(partido));
            
        }
        else
            console.log(JSON.parse(partido));
            
    
    //}
    console.timeEnd("redissave");
        
})();

