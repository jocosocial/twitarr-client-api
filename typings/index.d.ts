interface Window {
  DOMParser: any;
}

declare namespace NodeJS {
  interface Global {
    window: Window;
    DOMParser: any;
    TWITARR_JS_VERSION: string;
  }
}
