var sys=require('sys');
var Oauth=require('oauth').OAuth;

oa = new OAuth("https://twitter.com/oauth/request_token",
                 "https://twitter.com/oauth/access_token",
                 consumer_key, consumer_secret,
                 "1.0A", "http://localhost:3000/oauth/callback", "HMAC-SHA1");

var access_token='52468378-6Zkk0OXuICQkuktPWBtXhwnkfwvWBvL2TlkUL5zq4';
var access_token_secret='yI8PjqY2M4DlZxIJ0R3DxbdTfA5n8KeZjzZrPtAOKU';

oa.get("http://api.twitter.com/1/statuses/retweeted_by_me.json", access_token, access_token_secret, function(error, data) {
  console.log(sys.inspect(data));
});

var request = oa.get("http://stream.twitter.com/1/statuses/sample.json", access_token, access_token_secret );
request.addListener('response', function (response) {
  response.setEncoding('utf8');
  response.addListener('data', function (chunk) {
    console.log(chunk);
  });
  response.addListener('end', function () {
    console.log('--- END ---');
  });
});
request.end();
