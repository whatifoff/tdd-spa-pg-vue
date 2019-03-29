module.exports = {

  err(errObj) {
    const error = new Error()
    error.status = errObj.status || 500
    error.message = errObj.message || 'Server error.'

    throw error
  }

}