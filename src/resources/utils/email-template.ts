import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

export function emailTemplate(fileName: string, data: Record<string, string | number | object>) {
  const filePath = path.join(__dirname, '..', 'templates', fileName)
  const source = fs.readFileSync(filePath, 'utf8')
  const template = handlebars.compile(source)

  return template(data)
}
