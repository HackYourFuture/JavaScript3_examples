# createAndAppend()

Josja (@J05J4) explained `createAndAppend()` in a message on slack for class 17:

https://hackyourfuture.slack.com/archives/CC05UQ4SC/p1540498443000100?thread_ts=1540495664.000100&cid=CC05UQ4SC

In the solution of Jim, I really like the flexibility that you can set any attribute in the options:

```js
Object.keys(options).forEach(key => {
  const value = options[key];
  if (key === 'text') {
    elem.innerText = value;
  } else {
    elem.setAttribute(key, value);
  }
});
```

It looks complicated because of the `Object.keys(options)`; but what is going on is:
`options` is an Object like

```js
{
  firstKey: "first value",
  secondKey: "second value"
}
```

by using `Object.keys(options)`, you are requesting al the keys of the options object, so you get an Array

```js
['firstKey', 'secondKey'];
```

You loop over these keys with a `forEach()` loop, and for every `key` (since one item in a `keys` array is a `key`!) you can get the value from the options object using

```js
options[key];
```

You can set the attribute on your element with the same attribute name as the key (so if you name your key `href` you'll set the attribute `href`) using

```
elem.setAttribute(key, value);
```
