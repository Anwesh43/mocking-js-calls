class MockedFunction  {
    constructor(cb) {
        this.cb = cb
        this.args = []
    }
    matchWith() {
        this.args = arguments
        return this
    }
    respondWith(output) {
        this.output = output
        return this
    }
    startMocking() {
        this.cb = function(){
            if(!this.filterMatchArguments(arguments)) {
                return
            }
            if(this.output) {
                return this.output
            }
            if(this.promiseFn) {
                return this.promiseFn()
            }
            console.log(`${this.cb.name} is mocked`)
        }
        return this.cb.bind(this)
    }
    sendJsonResponse(jsonObj) {
        this.promiseFn = () => new Promise((resolve,reject)=>{
            resolve({
                json() {
                    return new Promise((resolve,reject)=>{
                        resolve(jsonObj)
                    })
                }
            })
        })
        return this
    }
    filterMatchArguments(args) {
        for(var i = 0;i<args.length;i++) {
            if(args[i] != this.args[i]) {
                return false
            }
        }
        return true
    }
    sendTextResponse(textStr) {
        this.promiseFn = () => new Promise((resolve,reject)=>{
          resolve({
              text() {
                  return new Promise((resolve,reject)=>{
                      resolve(textStr)
                  })
              }
          })
        })
        return this
    }
    sendErrorResponse(errObj) {
        this.promiseFn = () => new Promise((resolve,reject)=>{
            resolve({
              json() {
                  return new Promise((resolve,reject)=>{
                    resolve(errObj)
                  })
              }
          })
        })
        return this
    }
}
const mock = (cb) => {
    return new MockedFunction(cb)
}
