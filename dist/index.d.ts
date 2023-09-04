declare const fetch: any;
declare global {
    var Headers: typeof fetch.Headers;
}
export {};
