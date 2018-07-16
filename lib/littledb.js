const fs = require('fs')
const http = require('http')

module.exports = (path) => {
  path = path || './db.json'
  const db = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {}
  const js = (obj) => JSON.stringify(obj, null, 4)
  const ls = () => Object.keys(db)
  const get = (k) => db[k]

  const put = (k, v) => {
    if (v) {
      db[k] = v
    } else {
      delete db[k]
    }

    fs.writeFile(path, js(db, null, 4), null, () => {})
    return v
  }

  const serve = (port) => http.createServer(function (req, res) {
    req.on('data', b => {
      const s = b.toString()

      if (s === 'ls') {
        return res.end(js(ls()))
      }

      const kv = s.split(';')

      if (kv.length === 1) {
        return res.end(js(get(kv[0])))
      }

      res.end(js(put([kv.shift()], kv.length === 1 ? kv[0] || undefined : kv)))
    })
  }).listen(port || 80)

  return { get, put, ls, serve }
}
