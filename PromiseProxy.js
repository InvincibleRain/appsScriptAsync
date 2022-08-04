/**
 * Revives old client facing google api in apps script web applications
 * Directly returns promises for `google.scipt.run` and `google.script.url.getLocation`
 */
(function projectAdrenaline_google() {
  const lifeline = {
    funcList: [],
    excludeList: [
      'withSuccessHandler',
      'withFailureHandler',
      'withUserObject',
      'withLogger',
    ],
    get: function (target, prop, rec) {
      if (this.excludeList.includes(prop))
        //return (...rest) => new Proxy(Reflect.apply(target[prop], target, rest), trap);
        throw new TypeError(
          `${prop}: This method is deprecated in this custom api`
        );
      if (this.funcList.includes(prop))
        return (...rest) =>
          new Promise((res, rej) =>
            target
              .withSuccessHandler(res)
              .withFailureHandler(rej)
              [prop](...rest)
          );
      switch (prop) {
        case 'run':
          this.funcList = Object.keys(target.run);
          break;
        case 'getLocation':
          return () => new Promise((res) => target[prop](res));
      }
      return new Proxy(Reflect.get(target, prop, rec), lifeline);
    },
  };
  //const superGoogle = new Proxy(google, trap);
  //OR overwrite currently loaded google object:
  google = new Proxy(google, lifeline);
})();
