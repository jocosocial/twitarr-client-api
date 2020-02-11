/**
 * Helper to transform a json string to an json object.
 */
export declare class JsonTransformer {
    /**
     * A convenience method for implementers to use to turn JSON into a javascript object.
     * Use this to process a JSON response before returning it in an [[TwitarrResult]] object.
     */
    transform(data: any): any;
}
