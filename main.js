const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previousHash=' '){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();


    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2019", "Genesis Block", "0")
    }

    getLatestBlock(){
        return  this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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
TScoin.addBlock(new Block(1, "05/02/2018", { amount: 4 }));
TScoin.addBlock(new Block(2, "12/05/2018", { amount: 10 }));
TScoin.addBlock(new Block(3, "12/05/2018", { amount: 16 }));

console.log('Is Blockchain valid ? ' + TScoin.isChainValid());

TScoin.chain[1].data = { amount: 100};

console.log('Is Blockchain valid ? ' + TScoin.isChainValid());

//console.log(JSON.stringify(TScoin, null, 4));
