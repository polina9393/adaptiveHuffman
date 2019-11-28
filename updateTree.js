const {HuffmanNode} = require('./huffman')

function updateTree(nodes){
    const sortable = []
    // creating array from hashTable to sort it later
    for (let symbol in nodes) {
        sortable.push(nodes[symbol])
    }

    while(sortable.length>1){
        // sort array
        sortable.sort((a, b)=>{
            if(a.value===b.value){
                // if values are equal
                // first element should be with more tags
                return a.tag.length > b.tag.length
            }
            return a.value > b.value 
        })

        const firstTwo = sortable.splice(0,2)
        // each time we sort array and then recostruct the tree
        let temp = new HuffmanNode(firstTwo[0].tag+firstTwo[1].tag,firstTwo[0].value+firstTwo[1].value)

        temp.left = firstTwo[1]
        temp.right = firstTwo[0]

        
        sortable.push(temp)

    }
    return sortable[0]
}

module.exports.updateTree = updateTree