// 导入path模块
const path = require('path')
// 导入文件模块
const fs = require('fs')
// 导入模板引擎模块
const template = require('art-template')
// 导入prettier
const prettier = require('prettier')

// 设置模板引擎根路径
template.defaults.root = path.join(__dirname, '../tpl/xxManange')
// 设置模块引擎扩展名
template.defaults.extname = '.art'
// 导入变量
// 获取查询项
template.defaults.imports.getFormField = (list) => {
  return list.filter((v) => v.index).sort((a, b) => a.index - b.index)
}
// 获取新增表单项
template.defaults.imports.getAddFormField = (list) => {
  return list.filter((v) => v.addIndex).sort((a, b) => a.index - b.index)
}
// 获取列表项
template.defaults.imports.getColumns = (list) => {
  return list.filter((v) => !v.tableHide)
}

template.defaults.imports.stringify = (obj) => {
  return JSON.stringify(obj)
}

function getFiles(jsonPath) {
  let filesList = []
  let directoryList = []
  function findFile(www) {
    let files = fs.readdirSync(www)
    files.forEach(function (item, index) {
      let fPath = path.join(www, item)
      let stat = fs.statSync(fPath)
      if (stat.isDirectory() === true) {
        console.log(item)
        directoryList.push(item)
        findFile(fPath)
      }
      if (stat.isFile() === true) {
        filesList.push(fPath)
      }
    })
  }
  findFile(jsonPath)
  console.log(filesList)
  console.log(directoryList)
  return {
    filesList,
    directoryList,
  }
}

const dirCache = {}

function writeFileByUser(filePath, content = '') {
  if (fs.existsSync(filePath)) {
    console.log('该路径已存在:', filePath)
    fs.writeFileSync(filePath, content)
  } else {
    console.log('该路径不存在')
    mkdir(filePath, content)
  }
}

function mkdir(filePath, content = '') {
  console.log(filePath, content)
  const arr = filePath.split('/')
  let dir = arr[0]
  console.log(arr)
  for (let i = 1; i < arr.length; i++) {
    console.log(i, dir)
    if (dir && !dirCache[dir] && !fs.existsSync(dir)) {
      dirCache[dir] = true
      fs.mkdirSync(dir)
    }
    dir = dir + '/' + arr[i]
  }
  fs.writeFileSync(filePath, content)
}

function generate({
  formConfigImportPath,
  formConfigOutputPath,
  columnsConfigImportPath,
  columnsConfigOutputPath,
}) {
  // 入口文件
  var { config: formData } = require(formConfigImportPath)
  // 表格列表1
  var { config: columnsData } = require(columnsConfigImportPath)

  var html = template('index', { ...columnsData, ...formData })
  // console.log(html)

  writeFileByUser(
    formConfigOutputPath,
    prettier.format(html, {
      semi: false,
      parser: 'vue',
      singleQuote: true,
      bracketSameLine: true,
    })
  )
  // fs.writeFileSync(path.join(__dirname, formConfigOutputPath), html)

  var columns = template('data', columnsData)
  // console.log(columns)
  writeFileByUser(
    columnsConfigOutputPath,
    prettier.format(columns, {
      semi: false,
      parser: 'babel-ts',
      singleQuote: true,
      bracketSameLine: true,
    })
  )
  // fs.writeFileSync(path.join(__dirname, columnsConfigOutputPath), columns)
}

function main(configPath, outputPath) {
  let configDir = configPath || path.join(__dirname, '../config')
  let outputDir = outputPath || path.join(__dirname, `../dist/`)
  const { directoryList } = getFiles(configDir)
  directoryList.forEach((page, i) => {
    const formConfigImportPath = path.join(configDir, `/${page}/index.js`)
    const formConfigOutputPath = path.join(outputDir, `/${page}/index.vue`)
    const columnsConfigImportPath = path.join(configDir, `/${page}/data.js`)
    const columnsConfigOutputPath = path.join(outputDir, `/${page}/xx.data.ts`)
    generate({
      formConfigImportPath,
      formConfigOutputPath,
      columnsConfigImportPath,
      columnsConfigOutputPath,
    })
    // console.log(
    //   `${page} done:\n${formConfigImportPath} => ${formConfigOutputPath}\n${columnsConfigImportPath} => ${columnsConfigOutputPath}`
    // )
  })
}

let configPath = path.join(__dirname, '../config')
let outputPath = path.join(
  __dirname,
  '../../hestia/src/views'
)

main(configPath, outputPath)
// main()
