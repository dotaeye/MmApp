export default function FakeRequest(data, delay) {
  return new Promise(resolve=> {
    setTimeout(()=> {
      resolve(data)
    }, delay)
  });
}