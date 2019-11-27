const readline = require('readline')
const {encode} = require('./encode')
const {decode} = require('./decode')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please write 1 for encode, 2 for decode or 3 for test (from encode to decode):', (answer1) => {
    rl.question('Please write input value:', (answer2) => {
        if(answer1==='1'){
            // abcbbdaaddd
            const encodedString = encode(answer2)
            console.log(`The encode for sequence ${answer2} is ${encodedString}`)

        }else if(answer1==='2'){
            // 1100001111000100111000110111011100100010010111000
            const decodedString = decode(answer2)
            console.log(`The decode for sequence ${answer2} is ${decodedString}`)

        }else if(answer1==='3'){
            // abcbbdaaddd
            const encodedString = encode(answer2)
            const decodedString = decode(encodedString)
            console.log(`The encode for sequence ${answer2} is ${encodedString}`)
            console.log(`The decode for sequence ${encodedString} is ${decodedString}`)
            if(answer2===decodedString){
                console.log('Test is passed. Decoding and encoding work correctly')
            }
        }else{
            console.log('Please run program again and provide the right value')
        }
        rl.close()
    })
})