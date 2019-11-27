const {printSteps} = require('./printing')
const {printInitile} = require('./printing')
const {HuffmanNode} = require('./huffman')
const {updateTree} = require('./updateTree')


const dugger = String.fromCharCode(-1)

function decode(encodedString){
    // initialising
    const hashTableNodes = [new HuffmanNode(dugger,0)]
    printInitile(hashTableNodes)

    const decoded = []
    // first letter will be always in ascii
    let firstEight = encodedString.substring(0,7)
    encodedString = encodedString.substring(7)
    let output = String.fromCharCode(parseInt(firstEight, 2))

    // constructed initial tree with letter and dugger
    hashTableNodes.push(new HuffmanNode(output,1))
    let huffmanTree = new HuffmanNode(dugger+ output,1)
    huffmanTree.left = hashTableNodes[1] // letter
    huffmanTree.right = hashTableNodes[0] // dugger

    // Step one
    printSteps(1,huffmanTree,firstEight,output,hashTableNodes, output)
    
    let current = huffmanTree
    let step = 1
    let tempOutput = 'not a leaf yet'
    for(let i =0;i<encodedString.length;i++){
        const decodedNumber = parseInt(encodedString[i])
        step++
        let findLetter = ''
            // check in tree
            if(decodedNumber === 0){
                // left
                current = current.left
            }else if(decodedNumber === 1){   
                // right
                current = current.right
            }
            // when it is a leaf of tree
            if(!current.left || !current.right){
                // if it is dugger read again 8 charecters 
                if(current.tag === dugger){
                        let nextEight = encodedString.substring(i+1,i + 8)
                        encodedString = encodedString.substring(i+8)
                        i = -1
                        const character = String.fromCharCode(parseInt(nextEight, 2))
                        output = output+character
                        hashTableNodes.push(new HuffmanNode(character,1))
                        tempOutput = `Reached dugger in tree.${nextEight} ASCII is ${character}`
                }else{
                    // get the tag. print the tag
                    output = output+current.tag
                    encodedString = encodedString.substring(i+1)
                    tempOutput = current.tag
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
            }else{
                tempOutput = 'not a leaf yet'
            }       
            printSteps(step,huffmanTree,decodedNumber,output,hashTableNodes,tempOutput)
        }


    return output

}

module.exports.decode = decode