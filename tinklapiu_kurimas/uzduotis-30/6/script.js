function callNTimes(times, fn) {
  for (let i = 0; i < times; i++) {
    fn();
  }
}
function hello() {
  console.log("Hello, world!");
}
callNTimes(5, hello);
