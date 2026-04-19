import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import { brands, codes } from '../src/data/codes.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, '../public/data.json')

const data = { brands, codes }

writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n')
console.log(`Written to ${outPath}`)
