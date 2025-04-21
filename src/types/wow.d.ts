declare module 'wowjs' {
  interface WOWOptions {
    boxClass?: string;
    animateClass?: string;
    offset?: number;
    mobile?: boolean;
    live?: boolean;
    callback?: Function;
    scrollContainer?: string;
  }

  class WOW {
    constructor(options?: WOWOptions);
    init(): void;
  }

  export { WOW };
}
