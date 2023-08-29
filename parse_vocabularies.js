const fs = require('fs')
const path = require('path')
const md5 = require('js-md5')

const vocabularyFolder = path.join(__dirname, 'public/locales')

const langHashes = []

function getFilesRecursive(directoryPath) {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name)

    if (entry.isDirectory()) {
      getFilesRecursive(fullPath)
    } else {
      const data = fs.readFileSync(fullPath)

      const layout = entry.name.match(/vocabulary_(\w+)\.json\.gz/)

      if (layout) {
        langHashes.push({ language: layout[1], hash: md5(data) })
      }
    }
  }

  return langHashes
}

const allFiles = getFilesRecursive(vocabularyFolder)

fs.writeFileSync('src/vocabularies.json', JSON.stringify(allFiles))
