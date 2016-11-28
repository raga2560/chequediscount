var Web3 = require('web3');




var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));



	var accounts = web3.eth.accounts;

	console.log(accounts);




const source1 = `

pragma solidity ^0.4.2;

contract Chequediscount {

    /* Contract Variables and events */
    
    Transaction[] public transactions;
    
	uint public transactionID;
	

	
	
	event Rated(uint _transactionnumber,  uint _recordid, address _discounter, 
	address _issuer, uint _rating, string _ratingmessage);

	event newTransactionEntered(uint _transactionnumber,  uint _recordid, address _discounter, 
	address _issuer, string _discountername, string _issuername);
	
	
    struct Transaction {
        address issuer;
		address discounter;
        string issuername;
		string discountername;
		uint rating;
		string ratingmessage;
		uint recordid;
        
    }

	
	function newTransaction(
        string issuername,
		string discountername,
		address discounter,
		address issuer,
        uint recordid
        
    )
        
    {
        transactionID = transactions.length++; // increases array length
        Transaction t = transactions[transactionID];
		
		
        t.issuername = issuername;
		t.discountername = discountername;
		t.issuer = issuer;
		t.discounter = discounter;
		t.rating = 0;
		t.ratingmessage = '';
		t.recordid = recordid;
		
		
	newTransactionEntered(transactionID,  recordid, discounter, issuer, discountername, issuername);

		
    }

	
	

	function Rate(
	address rater,
        uint recordid,
		uint rating,
        
        string ratingmessage
    )
        
       
    {
		uint transactionNumber = 0;
        
	//	if(t.discounter != rater) throw;
		if(rating < 1 || rating >5 ) throw;
		
		for(uint i=0; i< transactions.length; i++)
			{
				if(transactions[i].recordid == recordid){
					transactions[i].rating = rating;
					transactions[i].ratingmessage = ratingmessage;
					transactionNumber = i;
					 Rated(transactionNumber,  transactions[i].recordid, transactions[i].discounter, transactions[i].issuer, transactions[i].rating, transactions[i].ratingmessage);
					
					break;
	
				
				}
				
			}
			
		
		
		
        
       
    }
	
	
	function getRating(address addr) returns(uint) {
		uint rating = 5;
		uint trating = 0;
		uint count = 0;
		
			for(uint i=0; i< transactions.length; i++)
			{
				if(transactions[i].issuer == addr){
					if(transactions[i].rating != 0){
	
						count ++;
						trating = trating + transactions[i].rating;		
					}
	
				
				}
				
			}
			
			if(count > 0)
			rating = (trating * 100)/count;
		 
                return rating;
        }
}


`;




// compile solidity source
const bytecode = web3.eth.compile.solidity(source1);
console.log(bytecode);
const abi = bytecode.info.abiDefinition;
const code = bytecode.code;
console.log("[Token bytecode]", code);
console.log("[Token abi]", abi);

var chequehandle;
// make a new contract 
const Alice = web3.eth.accounts[0], Bob = web3.eth.accounts[1];


const info = {from: Alice, data: code, gas:3000000};
console.log("Alice balance="+web3.eth.getBalance(Alice));

web3.eth.sendTransaction({from:accounts[3], to:Alice, value: '0x3141592', gas: 3141592}, function (err, result) {
console.log(err);
console.log(result);
});


const tokenNoTx = web3.eth.contract(abi).new(info, (err, chequediscount) => {
console.log("Alice balance="+web3.eth.getBalance(Alice));
    if (err) return console.error("[cheque.new]", err);

    if (!chequediscount.address) return console.log("[cheque.noaddress] txid",
                                           chequediscount.transactionHash);

    console.log("[Token.new]", chequediscount);
    


   chequehandle = chequediscount;

	chequehandle.newTransactionEntered({}, (err, ev) => {
        if (err) return console.error("[newTransactionEntered event]", err);
        console.log("[newTransactionEntered event]", ev);
        console.log(`_transactionnumber ${ev.args._transactionnumber} _recordid  ${ev.args._recordid } _discounter ${
                     ev.args._discounter }  _issuer ${ev.args._issuer} `);
	     update_transaction_for_recordid(`${ev.args._recordid }`, `${ev.args._transactionnumber }`);
		
    });
    
});




function EthereumAppDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof EthereumAppDAO)) {
        console.log('Warning: escrowstoreDAO constructor called without "new" operator');
        return new EthereumAppDAO(db);
    }

    var ethereumstore = db.collection("ethereumapp");


function update_transaction_for_recordid(recordid, transactionnumber)
{
// will be called by event
			
			
			ethereumstore.update({recordid:recordid}, {$set: {transactionnumber: transactionnumber}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
}


function update_txid_of_rating_for_recordid(recordid, txid, rating, ratingmessage)
{
// will be called when rating is done				
			
			
			ethereumstore.update({recordid:recordid}, {$set: {rating: rating, ratingmessage: ratingmessage}}, function (err){

			if (err) return callback (err, null);
			callback(null, 1);
			});
}



function insert_newtransaction_for_recordid(recordid, txid, discounter, issuer, discountername, issuername)
{

	var etherrec = {
		recordid: recordid,
		transactionnumber: transactionnumber,
		discounter: discounter,
		issuer: issuer,
		discountername: discountername,
		issuername: issuername,
		rectx: txid,
		ratetx:'',
		rating: '',
		ratingmessage:''  // don't know if anything else need to be stored.
		
	};
	ethereumstore.insert(etherrec, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new event");
                return callback(null, result[0]);
            }

            return callback(err, null);
			});
		
}




	this.entertransaction = function(discounter,issuer, discountername, issuername, recordid, callback) {
        "use strict";
	
	
		
		chequehandle.newTransaction(issuer, discounter ,issuername, discountername, recordid, {from: Alice, gas:300000} ,  function (err, txid)  {
        if (err) {console.error("[cheque.newtransaction]", err);
		return callback (err, null);
		}
		
		
		 insert_newtransaction_for_recordid(recordid, txid, discounter, issuer, discountername, issuername);
		
		
		
        console.log("[cheque.send] txid", txid);
		return callback(null, txid);
		});
	   // Once this is done, the event gets called, which will update database.
		
	}
	

	this.setrating = function(addr,recordid, rating, ratingmessage, callback) {
        "use strict";
	
	
	chequehandle.Rate(rater, recordid, rating, message,  {from: rater, gas:300000}, (err, txid) => {
        if (err) return console.error("[cheque.rating]", err);
		update_txid_of_rating_for_recordid(recordid, txid, rating, ratingmessage);
        console.log("[cheque.rating] txid", txid);
    });
	
	
	
		
	}

	this.getuserrating = function(addr, callback) {
        "use strict";
		
		var myrat = chequehandle.getRating.call(addr);
        console.log("[cheque.getrating] ", myrat);
		return callback(null, myrat);
		
	}
	
}
module.exports.EthereumAppDAO = EthereumAppDAO;
