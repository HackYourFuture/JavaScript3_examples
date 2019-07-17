# JavaScript 3 - Week 2

## Introduction

The examples in this repo use the same user interface:

- There is a button you can press to initiate an XMLHttpRequest to the [Nobel Prize API](https://nobelprize.readme.io/).
- There is an input field. It is not used by the JavaScript code but trying to type in it while a synchronous XMLHttpRequest is pending will fail.
- There is a `<pre>` tag in the `<body>` where the response JSON of the XMLHttpRequest will be displayed.

When running the examples it is best to set network throttling to **Slow 3G** in the network tab of the Chrome Developer Tools, as indicated by the red triangle in Figure 1 below.

![network-throttling](../../assets/network-throttling.png)

Figure 1. Set network throttling to Slow 3G

To cancel out the effects of the browser cache, select **Empty Cache and Hard Reload** as shown in Figure 2 each time before pressing the **GO** button.

![hard-reload](../../assets/hard-reload.png)

Figure 2: Empty Cache and Hard Reload

## Code Examples

### 1-baseline

This example represents the common code across all examples. It consists of an HTML page amd a JavaScript file. The HTML page contains a button, an input text field and a counter. In the JavaScript file, a listener is added to the button for the `click` event. The input field is not used in the JavaScript code.

When the example is loaded, the counter is increment every 200ms. When the button is clicked, the click handler fires and simply logs `button pressed` in the console.

### 2-async

This example fetches JSON data for all female Nobel Prize laureates, using an asynchronous XMLHttpRequest. Note that while the request is pending the counter continues incrementing and the input accepts text input.

### 3-event-loop

This example is identical to **2-async**, with the exception that console.log statements are added at the beginning and end of every function (named or anonymous). Figure 3 shows the console output when loading the application and subsequently pressing the **GO** button, and after a brief pause, pressing it again.

![3-event-loop](../../assets/3-event-loop.png)

Figure 3: Multiple (6) runs of the JavaScript event loop

#### Discussion

Each run of the JavaScript event loop is triggered by an event and ends when all associated code has been executed (this is called "_run to completion_").

1. This first run of the JavaScript event loop starts when the browser encounter the script tag and loads the JavaScript file.
2. When the web page is fully loaded, the `window.onload` event is fired and the event loop calls the corresponding event handler. The event handler calls function `main()`.
3. When the button is clicked, the event loop calls the `onclick` event handler, which then calls `fetchAndRender()`, which in its turn calls `fetchJSON()`. The `fetchJSON()` function fires off an `XMHHttpRequest` to fetch data from the Nobel Prize API.
4. About 2000ms later (on a simulated slow 3G network), the response from the API comes back and the event loop calls the `xhr.onload` event handler. This event handler calls the `fetchJSON` callback function, which takes the response data and renders it to the page.
5. After a while the **GO** button is pressed again and the same sequence as described in step 3 unfolds.
6. Note that this time the response is almost immediate (but still a separate run of the event loop), as the data is now returned from the browser cache.

### 4-sync

This example demonstrates the detrimental effect on the responsiveness of the browser when an synchronous `XMLHttpRequest` is used. While the network request is pending:

1. The counter momentarily stops counting.
2. The button remains in the pressed state.
3. The input field appears unresponsive.

When the network response is received:

1. The counter continues counting where it left off.
2. The button return to the unpressed state.
3. Any characters typed in the input field now appear.

Note that the following warning appears in the Chrome console when using a synchronous `XLMHttpRequest`:

> [Deprecation] Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.

### 5-promise

This example is identical to **2-async**, but now the callback is refactored into an ES promise.

### 6-promise-all

This example demonstrates the use of **Promise.all()**. First a network request is made to return data for all Nobel prizes that were awarded in the category 'literature' to exactly two laureates, sharing the prize. Then a series of network requests are made using **Promise.all()** to retrieve details for each of the laureates. Note that the Chrome browser can handle 6 concurrent networks request at a time, which is reflected in **Waterfall** column in Figure 4.

![promise-all](../../assets/promise-all.png)

Figure 4: Network response from **Promise.all()**.

### 7-serialized

This example is included only to show what happens if the network requests are done one after the other. The actual code used to achieve this is beyond the scope of this lecture.

![promise-serialized](../../assets/promise-serialized.png)

Figure 5: Network response from serialized promises.
