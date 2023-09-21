declare const nodeFetch: any;
declare global {
    var Headers: typeof nodeFetch.Headers;
    var fetch: typeof nodeFetch.default;
}
export {};
