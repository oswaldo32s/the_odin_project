const path = require('node:path')
const fs = require('node:fs/promises')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.log('Error with the directory', folder)
    process.exit(1)
  }

  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath)
    } catch {
      console.log(`Error reading ${filePath}, make sure it is correct`)
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : '-'
    const fileSize = stats.size
    const fileLastModifiedAt = stats.mtime.toLocaleString()
    const fileCreatedAt = stats.birthtime.toLocaleString()

    return `${fileType} ${file.padEnd(20)} ${fileSize
      .toString()
      .padEnd(10)} ${fileCreatedAt.padEnd(30)} ${fileLastModifiedAt.padStart(
      10
    )}`
  })

  const filesInfo = await Promise.all(filePromises)

  filesInfo.forEach((file) => {
    console.log(file)
  })
}

ls(folder)
