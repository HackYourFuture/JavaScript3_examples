/*
  A bare bones example using XMLHttpRequest.
*/

'use strict';

{
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `http://api.nobelprize.org/v1/laureate.json?bornCountryCode=TR`
  );
  xhr.onload = () => {
    console.log(xhr.response);
    console.log(typeof xhr.response);

    const result = JSON.parse(xhr.response);
    console.log(result);
    console.log(typeof result);
  };
  xhr.send();
}
