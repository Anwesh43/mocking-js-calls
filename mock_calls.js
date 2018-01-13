class MockedFunction  {
    constructor(cb) {
        this.cb = cb
        this.args = []
    }
    matchWith() {
        this.args = arguments
    }
    respondWith(ouput) {
        this.output = output
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
    }
    filterMatchArguments(args) {
        for(var i = 0;i<args.length;i++) {
            return this.args[i] != args[i]
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
    }
}
