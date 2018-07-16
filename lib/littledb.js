const fs = require('fs')
const http = require('http')

module.exports = (path) => {
  path = path || './db.json'
  const db = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {}
  const js = (obj) => JSON.stringify(obj, null, 4)
  const save = () => fs.writeFile(path, js(db, null, 4), null, () => {}) || true
  const ls = () => Object.keys(db)
  const get = (k) => db[k]
  const put = (k, v) => (db[k] = v) ? save() && v : v
  const del = (k) => db[k] && (delete db[k]) && save()

  const serve = (port) => http.createServer(function (req, res) {
    req.on('data', b => {
      const s = b.toString()

      if (s === 'ls') {
        return res.end(js(ls()))
      }

      const kv = s.split(';')

      if (kv.length === 1 || kv[1] === '') {
        return s.trim().endsWith(';') ? res.end(js(del(kv[0]))) : res.end(js(db[kv[0]]))
      }

      res.end(js(put([kv.shift()], kv.length === 1 ? kv[0] : kv)))
    })
  }).listen(port || 80)

  return { get, put, del, ls, serve }
}
