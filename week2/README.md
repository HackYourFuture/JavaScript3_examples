# XMLHttpRequests: Sync vs Async & Promises

There are three examples in this repo. They all feature the same user interface:

- There is a button you can press to initiate an XMLHttpRequest to the [Nobel Prize API](https://nobelprize.readme.io/).
- There is an input field. It is not used by the JavaScript code but trying to type in it while a synchronous XMLHttpRequest is pending will fail.
- There is a `<pre>` tag in the `<body>` where the response JSON of the XMLHttpRequest will be displayed.

To exacerbate the response time of the requests, open the Chrome Developer Tools, select the Network tab and change the [Network Throttling](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#throttling) menu to 'Slow 3G'.

## 00-base

This folder shows the unchanging part of the code by way of introduction. Pressing the button just produces a console.log.

## 01-xhr-sync

This folder demonstrates how a synchronous XMLHttpRequest makes the UI unresponsive while the XMLHttpRequest is pending.

- The timer is temporarily stopped.
- The GO button remains highlighted.
- The input field cannot be focussed, let alone typed in.

## 02-xhr-async

The asynchronous version remains responsive during the request.

### 03-xhr-callback

This version makes two requests to the Nobel Prize API using callbacks. The second request depends on data from the first request.

### 04-xhr-promise

The code from the previous example is now refactored to use promises.
