/**
 * Helper to transform a json string to an json object.
 */
export class JsonTransformer {
  /**
   * A convenience method for implementers to use to turn JSON into a javascript object.
   * Use this to process a JSON response before returning it in an [[TwitarrResult]] object.
   */
  public transform(data: any) {
    if (typeof data === 'string') {
      if (data.length < 1) {
        return {};
      } else {
        try {
          return JSON.parse(data);
        } catch (err) {
          (err as any).data = data;
          throw err;
        }
      }
    } else {
      // assume it's already parsed
      return data;
    }
  }
}
