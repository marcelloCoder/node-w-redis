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
    
        const cod_p = 112;
        console.time("redissave");
    for(let i=0;i<5;i++){
            let ocupacao = await client.get(`${cod_p}`);
        if (!ocupacao) {
            const [rows] = await conn.query(`select * from ocupacao where cod_ocupacao = ? ` ,[cod_p]);
            ocupacao = rows[0];
            await client.set(`${cod_p}`, JSON.stringify(ocupacao));
            console.log(ocupacao.descricao);
        }
        else
            console.log(JSON.parse(ocupacao).descricao);
    }
    console.timeEnd("redissave");
        
})();

