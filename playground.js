let treeify = require('treeify');

function HuffmanNode(tag,value){
    this.value = value
    this.tag = tag
    this.right = null
    this.left = null
}

const node = new HuffmanNode(2,'d')

function lookTree(current,letter){
    let output = ''

    while(true){
        if(!current){
            break
        }
        
        if(current.right&&current.right.tag.indexOf(letter)!==-1){
            output=output+'1'
            current=current.right
        }else if(current.left&&current.left.tag.indexOf(letter)!==-1){
            
            output=output+'0'
            current=current.left    
        }else{break}

    }

    return output
}

function encode(initString){
    const hashTableNodes = [new HuffmanNode('x',0)]
    const enconding = []
    // first letter will be always in asci
    let output = initString[0].charCodeAt(0).toString(2) 
    
    // constructed initial tree with letter and dugger ax
    hashTableNodes.push(new HuffmanNode(initString[0],1))
    let huffmanTree = new HuffmanNode('x'+ initString[0],1)
    huffmanTree.left = hashTableNodes[1]
    huffmanTree.right = hashTableNodes[0] // dugger


    for(let i = 1;i<initString.length;i++){
        let isNew = false 
        const letter = initString[i]

        // check in hash table if it exists or not
        for(let i =0;i<hashTableNodes.length;i++){
            // if same letter has already been it increments value 
           if(hashTableNodes[i].tag === letter){
               hashTableNodes[i].value=hashTableNodes[i].value+1
               break
            }
            // if it went throught all hash table tags and has't found the same letter
            if(i === hashTableNodes.length-1){ 

                hashTableNodes.push(new HuffmanNode(letter,1))

                if(huffmanTree){
                    // calculating dugger 
                    let encondingHuffman = lookTree(huffmanTree,'x')
                    //console.log(encondingHuffman + ' encondingHuffman')
                    isNew = true
                    // adding asci value to output as it is a new value with dugger
                    output = output+' ' + encondingHuffman +' '+ letter.charCodeAt(0).toString(2) 
                    // console.log(huffmanTree)
                    console.log(
                        treeify.asTree(huffmanTree
                    , true)
                     )
                    
                }
                break
            }
        }

        const sortable = []
        for (let symbol in hashTableNodes) {
            sortable.push(hashTableNodes[symbol])
        }

        while(sortable.length>1){
            sortable.sort((a, b)=>{
                if(a.value===b.value){
                    return a.tag.length > b.tag.length
                }
                return a.value > b.value 
            })

            const firstTwo = sortable.splice(0,2)

            let temp = new HuffmanNode(firstTwo[0].tag+firstTwo[1].tag,firstTwo[0].value+firstTwo[1].value)

            temp.left = firstTwo[1]
            temp.right = firstTwo[0]

            
            sortable.push(temp)
        //     console.log('WHILE')
        //     console.log(sortable)
        //     console.log(
        //        treeify.asTree(sortable
        //    , true)
        //     )

        }
        

            huffmanTree = sortable[0]

            if(!isNew){

            output = output+' '+lookTree(huffmanTree,letter)
            // console.log('LOOOKTREE'+letter)


            }
            ///HUFMAN TREEE
            //console.log('HUFMAN TREEE')
            //  console.log(huffmanTree)
            //  console.log(
            //     treeify.asTree(huffmanTree
            // , true)
            //  )
       
    }
    return output
    //return hashTable
}
const encodedString = encode('abcbb')

function decode(encodedString){

    const hashTableNodes = [new HuffmanNode('x',0)]
    const decoded = []
    // first letter will be always in asci
    let firstEight = encodedString.substring(0,9)
    encodedString = encodedString.substring(8)
    let output = String.fromCharCode(parseInt(firstEight, 2))

    // constructed initial tree with letter and dugger ax
    hashTableNodes.push(new HuffmanNode(output,1))
    let huffmanTree = new HuffmanNode('x'+ output,1)
    huffmanTree.left = hashTableNodes[1]
    huffmanTree.right = hashTableNodes[0] // dugger
    
    // let current = 
    for(let i =0;i<encodedString.length;i++){
        const deco = parseInt(encodedString[i])
        // check in tree
        if(0){
            // left
        }
        if(1){

        }
        // if it was not a current 
        // change current to the top
    }


    return encodedString

}
const decodedString = decode(encodedString)
console.log(encodedString+' '+'decodedString: ' + decodedString)

