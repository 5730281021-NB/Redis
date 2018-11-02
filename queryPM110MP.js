const config = require('./config');
//const sql =  require('mssql/msnodesqlv8');


module.exports = (async function(PNID,res){
    const pool = await new require('node-jt400').pool(config);
    st = await ("Select PNDETAIL,TH_NAME,TH_SURNAM  From MBRFLIB/PM100MP WHERE PNID="+PNID);
    let q1 = await pool.query(st);
    const rows = await q1.recordset;
	if(rows[0] != null){
		//console.log('MBCODE is:'+MBCODE);
		return {rows};
	}else {
		res.status(301).send({message: "No record in Cobrand"});
		return false;
	}
})