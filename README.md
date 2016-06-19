# kniteor
A Meteor app to model a knitting shop's estimation through Mocked native api calls

## How to run
- Checkout this project
- If you've never done so, run `sh setup.sh`
- run `meteor`

## Flow
The app starts out on the order page. 
There is a form where a user can upload their spec files (drag/drop) and get realtime estimates prior to submitting the form.

When a file is dropped onto the designated area prior to form submission, it is immediately uploaded to the server where it is estimated.
As this is a mock estimator, it simply returns a random number which is then attached to the payload that is returned to the client for display.]

See 'Estimation Design Explanation' for how this would be solved if not a mock.

## Estimation Design Explanation
In a real world implementation, the preferred way of interfacing meteor/nodejs with C++ libraries is to use node-ff1.
Assuming the function in the C++ library is of the form:
`int getEstimate(String json)`

We would essentially be doing this on the Node/Meteor end:

```
//In bridge/libquote.js
var ffi = require('ffi')
var ref = require('ref')

var libQuote = ffi.Library('<PATH_TO_CPP_LIB>', {
  'getEstimate': [ 'int', [ 'String'] ]
})
```

And to call the estimator after a file upload:

```

fs.readFile('<PATH_TO_JSON_FILE>', 'utf8', function (err,json) {
  if (err) {
    return console.err(err);
  }
  
  libQuote.getEstimate.async(json, function(err, realEstimate){
    result.quote.value = realEstimate;
  }); 
});

```
