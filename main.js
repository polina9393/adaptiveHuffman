const treeify = require('treeify')
const readline = require('readline');
const dugger = String.fromCharCode(-1)


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Please write 1 for encode or 2 for decode:', (answer1) => {
//     rl.question('Please write input value:', (answer2) => {
//         if(answer1==='1'){
//             // abcbbdaaddd
//             const encodedString = encode(answer2)
//             const decodedString = decode(encodedString)
//             console.log(`The encode for sequence ${answer2} is ${encodedString}`)
//             console.log(`The decode for sequence ${encodedString} is ${decodedString}`)
//             if(answer2===decodedString){
//                 console.log('Test is passed. Decoding and encoding work correctly')
//             }

//         }else if(answer1==='2'){
//             const decodedString = decode(answer2)
//             const encodedString = encode(decodedString)
//             console.log(`The decode for sequence ${answer2} is ${decodedString}`)
//             console.log(`The encode for sequence ${decodedString} is ${encodedString}`)
//             if(answer2===encodedString){
//                 console.log('Test is passed. Decoding and encoding work correctly')
//             }

//         }else{
//             console.log('Please run program again and provide the right value')
//         }
//         rl.close()
//     });
// });

function HuffmanNode(tag,value){
    this.value = value
    this.tag = tag
    this.right = null
    this.left = null
}

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

function updateTree(hashTableNodes){
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

    }
    return sortable[0]
}
function printSteps(stepNumber,huffmanTree,currentInput,output,hashTableNodes){
console.log('------------------------------------------------')
console.log(`Step ${stepNumber}`)
console.log(`Current read input is ${currentInput}`)
console.log(`Output is ${output}`)
console.log('A:')
console.log(...hashTableNodes)
console.log('Tree:')
console.log(' ')
console.log(treeify.asTree(huffmanTree, true))
console.log('------------------------------------------------')
}

function encode(initString){
    // initialising 
    const hashTableNodes = [new HuffmanNode(dugger,0)]
    console.log(`Step 0`)
    console.log(...hashTableNodes)
    console.log('Tree:')
    console.log(' ')
    console.log(treeify.asTree(hashTableNodes, true))

    const enconding = []

    // first letter will be always in asci
    let output = initString[0].charCodeAt(0).toString(2) 
    
    // constructed initial tree with letter and dugger ax
    hashTableNodes.push(new HuffmanNode(initString[0],1))
    let huffmanTree = new HuffmanNode(dugger+ initString[0],1)
    huffmanTree.left = hashTableNodes[1]
    huffmanTree.right = hashTableNodes[0] // dugger

    // Step one
    printSteps(1,huffmanTree,initString[0],output,hashTableNodes)


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
                    let encondingHuffman = lookTree(huffmanTree, dugger)
                    isNew = true
                    // adding asci value to output as it is a new value with dugger
                    output = output+ encondingHuffman+ letter.charCodeAt(0).toString(2) 
                    // console.log(huffmanTree)
                    // console.log(
                    //     treeify.asTree(huffmanTree
                    // , true)
                    //  )
                    
                }
                break
            }
        }
        if(!isNew){
            output = output+lookTree(huffmanTree,letter)
            }
 
            const updatedTree = updateTree(hashTableNodes)
            huffmanTree = updatedTree
       
    }
    return output
}
const encodedString = encode('abcbbdaaddd')

function decode(encodedString){
    const hashTableNodes = [new HuffmanNode(dugger,0)]
    const decoded = []
    // first letter will be always in ascii
    let firstEight = encodedString.substring(0,7)
    encodedString = encodedString.substring(7)
    let output = String.fromCharCode(parseInt(firstEight, 2))

    // constructed initial tree with letter and dugger a&dugger
    hashTableNodes.push(new HuffmanNode(output,1))
    let huffmanTree = new HuffmanNode(dugger+ output,1)
    huffmanTree.left = hashTableNodes[1]
    huffmanTree.right = hashTableNodes[0] // dugger
    
    let current = huffmanTree

    for(let i =0;i<encodedString.length;i++){
        const decodedNumber = parseInt(encodedString[i]) // 1

        let findLetter = ''
        // check in tree
            if(decodedNumber === 0){
                // left
                    current = current.left
            }else if(decodedNumber === 1){   
                    current = current.right
            }

            if(!current.left || !current.right){
                // if it is dugger read again 8 charecters 
                if(current.tag === dugger){
                        let nextEight = encodedString.substring(i+1,i + 8)
                        encodedString = encodedString.substring(i+8)
                        i = -1
                        const character = String.fromCharCode(parseInt(nextEight, 2))
                        output = output+character
                        hashTableNodes.push(new HuffmanNode(character,1))
                        
                }else{
                    // get the tag. print the tag
                    output= output+current.tag
                    encodedString = encodedString.substring(i+1)
                    i=-1
                    for(let j = 0;j<hashTableNodes.length;j++){
                        if(hashTableNodes[j].tag===current.tag){
                            hashTableNodes[j].value++
                            break

                        }
                    }
                }
                const updatedTree = updateTree(hashTableNodes)
                // update huffman tree
                huffmanTree = updatedTree
                // reset the node
                current = huffmanTree

            }
            
        }


    return output

}
const decodedString = decode(encodedString)
console.log(encodedString+' '+'decodedString: ' + decodedString)