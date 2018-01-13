function add(a,b) {
    return a+b
}
function concatStrs(s1,s2) {
    return `${s1} ${s2}`
}
add = mock(add).matchWith(10,20).respondWith(50).startMocking()
concatStrs = mock(concatStrs).matchWith("hello","world").respondWith("hello super world").startMocking()
console.log(add(10,20))
console.log(add(30,40))
console.log(concatStrs("hello","world"))
