

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
            console.log(current.right.tag.indexOf(letter))
            output=output+'1'
            current=current.right
        }else if(current.left&&current.left.tag.indexOf(letter)!==-1){
            
            output=output+'0'
            current=current.left    
        }else{break}

    }

    return output
}

function calls(initString){
    const arraySymbols = [new HuffmanNode('x',0)]
    const enconding = []
    let output = initString[0].charCodeAt(0).toString(2) 
    
    arraySymbols.push(new HuffmanNode(initString[0],1))
    let huffmanTree = new HuffmanNode('x'+ initString[0],1)
    huffmanTree.left = arraySymbols[1]
    huffmanTree.right = arraySymbols[0]
    for(let i = 1;i<initString.length;i++){
        let isNew = false 
        const letter = initString[i]

        for(let i =0;i<arraySymbols.length;i++){
           if(arraySymbols[i].tag === letter){
               arraySymbols[i].value=arraySymbols[i].value+1
               break
            }

            if(i === arraySymbols.length-1){ 

                arraySymbols.push(new HuffmanNode(letter,1))
                //console.log(huffmanTree)
                if(huffmanTree){

                    
                    let encondingHuffman = lookTree(huffmanTree,'x')
                    console.log(encondingHuffman + ' encondingHuffman')
                    isNew = true
                    output = output + encondingHuffman + letter.charCodeAt(0).toString(2) 
                    console.log(output + ' OUTPUT')
                    console.log(huffmanTree)
                    
                }
                break
            }
        }

        const sortable = []
        for (let symbol in arraySymbols) {
            sortable.push(arraySymbols[symbol])
        }




        while(sortable.length>1){
        sortable.sort((a, b)=>a.value > b.value && a.tag.length < b.tag.length)
        const firstTwo = sortable.splice(0,2)

        let temp = new HuffmanNode(firstTwo[0].tag+firstTwo[1].tag,firstTwo[0].value+firstTwo[1].value)

        temp.left = firstTwo[1]
        temp.right = firstTwo[0]

        
        sortable.push(temp)

        }
        

            huffmanTree = sortable[0]
            // takes a charecter 

            if(!isNew){

            output = output+lookTree(huffmanTree,letter)
            console.log(lookTree(huffmanTree,letter))
            }
            // console.log(huffmanTree)
       
    }
    return output
    //return hashTable
}
const ans = calls('abcbbdaaddd')
console.log(ans)

