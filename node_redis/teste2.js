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
    
        const cod_p = 7;
        console.time("redissave");
    //for(let i=0;i<5;i++){
            let cargo = await client.get(`${cod_p}`);
        if (!cargo) {
            const [rows] = await conn.query(`select * from cargo where cod_cargo = ? ` ,[cod_p]);
            cargo = rows[0];
            await client.set(`${cod_p}`, JSON.stringify(cargo));
            console.log(cargo.descricao);
        }
        else
            console.log(JSON.parse(cargo).descricao);
    //}
    console.timeEnd("redissave");
        
})();

