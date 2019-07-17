/*
  A bare bones example using XMLHTTPRequest.
*/

'use strict';

{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.nobelprize.org/v1/country.json');
  xhr.onload = () => {
    console.log(xhr.response);
  };
  xhr.send();
}
