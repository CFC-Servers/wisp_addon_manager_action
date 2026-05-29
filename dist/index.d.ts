declare const nodeFetch: any;
declare global {
    var Headers: typeof nodeFetch.Headers;
}
export {};
