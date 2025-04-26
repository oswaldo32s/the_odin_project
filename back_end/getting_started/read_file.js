const fs = require('node:fs')
const { promisify } = require('node:util') // you can use 'node:fs/promise instead but using promisify to use same file

const stats = fs.statSync('./file.txt')

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)

// SYNC

const text = fs.readFileSync('./file.txt', 'utf-8')

console.log(text)

console.log('\nThis is sync first text 1 and then text 2 \n')

const text_2 = fs.readFileSync('./file2.txt', 'utf-8')

console.log(text_2)

// ASYNC

console.log('\nThis is Asyc with callback functions\n')

console.log('Reading first file...')
fs.readFile('./file.txt', 'utf-8', (err, text) => {
  console.log('first file:', text)
})
console.log('Console log something while reading first file')
console.log('Reading second file...')
fs.readFile('./file2.txt', 'utf-8', (err, text) => {
  console.log('second file:', text)
})

// PROMISE

console.log('\n')

const readFilePromise = promisify(fs.readFile);

(async () => {
  console.log('Reading first File...')
  const text = await readFilePromise('./file.txt', 'utf-8')
  console.log('first text:', text)
  console.log('\nDoing something white node reads first file...\n')
  console.log('Reading second file...')
  const secondText = await readFilePromise('./file2.txt', 'utf-8')
  console.log('Second file', secondText)
})()
