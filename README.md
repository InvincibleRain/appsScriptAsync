# Description
Make common client side `google` object functions like `google.script.run` return a promise using  javascript `Proxy`/`Reflect` module. Most client side ``google`` objects still use callbacks. This wrapper intercepts such calls to directly return promises

# Usage
```
<script src="https://raw.githubusercontent.com/InvincibleRain/appsScriptAsync/main/PromiseProxy.js"/>
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
