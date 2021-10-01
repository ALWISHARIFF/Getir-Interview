const notFound = (req, res, next) => {
    const error = new Error(``)
    res.status(404).json({ 
      code:3,
      msg: `Not Found - ${req.originalUrl}`,
      records: [],
    })
    // next(error)
}
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({ 
      code:2,
      msg: err.message,
      records: [],
    })
  }
export { notFound, errorHandler }