const treeify = require('treeify') // https://www.npmjs.com/package/treeify

function printSteps(stepNumber,huffmanTree,currentInput,output,nodes,tempOutput){
    console.log(`Step ${stepNumber}`)
    console.log(`Current read input is ${currentInput}`)
    console.log(`Current output: ${tempOutput}`)
    console.log(`Overall output: ${output}`)
    console.log('Unsorted array of values:')
    console.log(nodes)
    console.log('Tree:')
    console.log(' ')
    console.log(treeify.asTree(huffmanTree, true))
    console.log('----------------------------------------------------------------------------------------------')
}
function printInitile(nodes){
    console.log(`Step 0`)
    console.log('Unsorted array of values:')
    console.log(...nodes)
    console.log('Tree:')
    console.log(' ')
    console.log(treeify.asTree(nodes, true))
    console.log('----------------------------------------------------------------------------------------------')
}

module.exports.printSteps = printSteps
module.exports.printInitile = printInitile