# Description
 Most client side ``google`` objects in apps script still use callbacks. This wrapper intercepts such calls to directly return promises. It makes common client side `google` object functions like `google.script.run` return a promise, instead of a callback function using javascript's internal `Proxy`/`Reflect` module.

# Installation:
Load the script file directly using your preferred CDN or Github:

    <script src="https://cdn.jsdelivr.net/gh/InvincibleRain/appsscriptasync/PromiseProxy.min.js"/>

    <script src="https://raw.githubusercontent.com/InvincibleRain/appsScriptAsync/main/PromiseProxy.min.js"/

This script should load after Google scripts are loaded. Once loaded, all calls to `google` objects are intercepted to only return promises for the following specified function calls:

```
google.script.run.*
google.script.url.getLocation
```
All other calls pass through proxy, but routed directly to the original `google` object.

# Example:
```
<script src="https://raw.githubusercontent.com/InvincibleRain/appsScriptAsync/main/PromiseProxy.min.js"/>
<script>
const doSomeAsyncStuff = async () => {
  const location = await google.script.url.getLocation();
  //getJSON is a server side script 
  //promise
  google.script.run.getJSON(rid).then(returnData => console.log(returnData));
  //async-await
  const returnData = await google.script.run.getJSON();
}
</script>
```
