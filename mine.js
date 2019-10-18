const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previousHash=' '){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")){
            this.nounce++;
             this.hash = this.calculateHash();
        }
        
        console.log("Block mined with hash : "+ this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2019", "Genesis Block", "0")
    }

    getLatestBlock(){
        return  this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){  //We will not start will 0, as block 0 is GENESIS BLOCK
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }

        } 

        return true;
    }


}

let TScoin = new Blockchain();

console.log('Mining Block 1...');
TScoin.addBlock(new Block(1, "05/02/2018", { amount: 4 }));

console.log('Mining Block 2...');
TScoin.addBlock(new Block(2, "12/05/2018", { amount: 10 }));

console.log('Mining Block 3...');
TScoin.addBlock(new Block(3, "18/06/2018", { amount: 16 }));

console.log('Mining Block 4...');
TScoin.addBlock(new Block(4, "22/07/2018", { amount: 21 }));

console.log('Mining Block 5...');
TScoin.addBlock(new Block(5, "07/08/2018", { amount: 26 }));

console.log('Mining Block 6...');
TScoin.addBlock(new Block(6, "19/09/2018", { amount: 34 }));

console.log('Mining Block 7...');
TScoin.addBlock(new Block(7, "15/10/2018", { amount: 40 }));

console.log('Mining Block 8...');
TScoin.addBlock(new Block(8, "21/11/2018", { amount: 43 }));

console.log('Mining Block 9...');
TScoin.addBlock(new Block(9, "31/12/2018", { amount: 48 }));

console.log('Mining Block 10...');
TScoin.addBlock(new Block(10, "5/01/2019", { amount: 53 }));

console.log('Mining Block 11...');
TScoin.addBlock(new Block(11, "12/02/2019", { amount: 58 }));

console.log('Mining Block 12...');
TScoin.addBlock(new Block(12, "20/03/2019", { amount: 63 }));

