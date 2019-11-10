// let treeify = require('treeify');

// function HuffmanNode(tag,value){
//     this.value = value
//     this.tag = tag
//     this.right = null
//     this.left = null
// }

// const node = new HuffmanNode(2,'d')

// function lookTree(current,letter){
//     let output = ''

//     while(true){
//         if(!current){
//             break
//         }
        
//         if(current.right&&current.right.tag.indexOf(letter)!==-1){
//             console.log(current.right.tag.indexOf(letter))
//             output=output+'1'
//             current=current.right
//         }else if(current.left&&current.left.tag.indexOf(letter)!==-1){
            
//             output=output+'0'
//             current=current.left    
//         }else{break}

//     }

//     return output
// }

// function calls(initString){
//     const hashTableNodes = [new HuffmanNode('x',0)]
//     const enconding = []
//     // first letter will be always in asci
//     let output = initString[0].charCodeAt(0).toString(2) 
    
//     // constructed initial tree with letter and dugger ax
//     hashTableNodes.push(new HuffmanNode(initString[0],1))
//     let huffmanTree = new HuffmanNode('x'+ initString[0],1)
//     huffmanTree.left = hashTableNodes[1]
//     huffmanTree.right = hashTableNodes[0] // dugger


//     for(let i = 1;i<initString.length;i++){
//         let isNew = false 
//         const letter = initString[i]

//         // check in hash table if it exists or not
//         for(let i =0;i<hashTableNodes.length;i++){
//             // if same letter has already been it increments value 
//            if(hashTableNodes[i].tag === letter){
//                hashTableNodes[i].value=hashTableNodes[i].value+1
//                break
//             }
//             // if it went throught all hash table tags and has't found the same letter
//             if(i === hashTableNodes.length-1){ 

//                 hashTableNodes.push(new HuffmanNode(letter,1))
//                 //console.log(huffmanTree)

//                 if(huffmanTree){
//                     // calculating dugger 
//                     let encondingHuffman = lookTree(huffmanTree,'x')
//                     //console.log(encondingHuffman + ' encondingHuffman')
//                     isNew = true
//                     // adding asci value to output as it is a new value with dugger
//                     output = output + encondingHuffman + letter.charCodeAt(0).toString(2) 
//                     console.log(output + ' OUTPUT')
//                     // console.log(huffmanTree)
//                     console.log(
//                         treeify.asTree(huffmanTree
//                     , true)
//                      )
                    
//                 }
//                 break
//             }
//         }

//         const sortable = []
//         for (let symbol in hashTableNodes) {
//             sortable.push(hashTableNodes[symbol])
//         }


//         while(sortable.length>1){
//             sortable.sort((a, b)=>a.value > b.value && a.tag.length < b.tag.length)
//             const firstTwo = sortable.splice(0,2)

//             let temp = new HuffmanNode(firstTwo[0].tag+firstTwo[1].tag,firstTwo[0].value+firstTwo[1].value)

//             temp.left = firstTwo[1]
//             temp.right = firstTwo[0]

            
//             sortable.push(temp)

//         }
        

//             huffmanTree = sortable[0]

//             if(!isNew){

//             output = output+lookTree(huffmanTree,letter)
//             //console.log(lookTree(huffmanTree,letter))
//             }
//             ///HUFMAN TREEE
//             //console.log('HUFMAN TREEE')
//             //  console.log(huffmanTree)
//             //  console.log(
//             //     treeify.asTree(huffmanTree
//             // , true)
//             //  )
       
//     }
//     return output
//     //return hashTable
// }
// const ans = calls('abcbbdaaddd')
// console.log(ans)

var request = require("request");

var options = { method: 'POST',
  url: 'https://service.eu.apiconnect.ibmcloud.com/gws/apigateway/api/6df8519d87e13208c0ba16203d2d16ed26f21cba58a81d4846cf96bc6fc260be/NKhiAi/update',
  headers: 
   { accept: 'application/json',
     'content-type': 'application/json',
     'x-ibm-client-id': 'aabe0637-f201-42b1-93e9-d16a11912b8a' },
  body: 
   { name: 'Winifred Hale',
     issue: 64.52583121,
     description: 'Gaw rees zodo vodci rasakwif an jecat kunemnuv baw cibila lidarama ganpad lapsuv sugzuca irca bol wolpugju.',
     ID: '1259192438489088' },
  json: true };

request(options, function (error, response, body) {
  if (error) return console.error('Failed: %s', error.message);

  console.log('Success: ', body);
});