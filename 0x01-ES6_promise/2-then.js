export default function handleResponseFromAPI(promise) {
  promise = promise.then((response) => {
    return {status: 200, body: "success"}
  });
  promise = promise.catch((error) => {
    return new Error();
  });
  promise = promise.finally(() => {
    console.log('Got a response from the API');
  })
  return promise;
}
