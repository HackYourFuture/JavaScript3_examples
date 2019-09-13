/*
  A bare bones example using XMLHttpRequest.
*/

'use strict';

{
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `http://api.nobelprize.org/v1/laureate.json?bornCountryCode=TR`,
  );
  xhr.onload = () => {
    console.log(xhr.response);
  };
  xhr.send();
}
