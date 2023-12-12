/* eslint-disable */
export default function handleResponseFromAPI(promise) {
  promise = promise.then((response) => ({ status: 200, body: 'success' }));
  promise = promise.catch((error) => new Error());
  promise = promise.finally(() => {
    console.log('Got a response from the API');
  });
  return promise;
}
