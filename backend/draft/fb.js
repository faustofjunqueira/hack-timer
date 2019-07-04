const FB = require('fb');

FB.options({
  'appId': '387620128766053',
  'appSecret': 'e508c67fe74994287ddad9cc9c09b99d',
  'redirectUri': 'http://localhost:10000',
  "version": '3.3',
  "scope": 'basic'
});

const url = FB.getLoginUrl({
  scope: 'email,user_likes',
  redirect_uri: 'http://example.com/'
});

console.log(url);


/////////////////////
/*

### Login
https://www.facebook.com/v3.3/dialog/oauth?client_id=206687353552314&redirect_uri=http://localhost:10000/echo&auth_type=rerequest&scope=instagram_basic,instagram_manage_comments,instagram_manage_insights,pages_show_list,user_photos,user_posts

https://graph.facebook.com/v3.3/oauth/access_token?client_id=206687353552314&redirect_uri=http://localhost:10000/echo&client_secret=ad335564a9369e3a277c6bbc007a886a&code=AQDn4xrM32vkKV0acIapPToUXV2Fb4Rc6D_Udv9b122zCn1stHxm3KVW3hg8IYCpDSzbJksg4kyJmMDmVjiMhTz0-U0gC13RVMO-rqJvFQC-r8ZFK_kg9VlN_N0_Bpcvye3MX638XqLOObrAGV5vbf0198VPbZvD9aNyw-FfXtNjfp8t_jpp_aP_Fb4XkuOaVg4NMTmIVE99wwszZ17DkuzxK-HcbRCCuF8DTJYf_D0u9sRf9dZd2ux9bNQvRhiUmoP9eax67PllMLB0xUCM2v_Lsuv8XeJz5ehK6OkckaO_s35HITjKi8e4YXhhiRkJjdkd_YSGXX5mNoGqbryzjzFyAMwVGNI5yA_VZ7yhvNmkhXjcv60_yeoyxE2Wf4Z3IFk

### Instagram








manage_pages
client_id=387620128766053
redirect_uri=http://localhost:10000/echo
state=junda
scope=
response_type=token
&auth_type=rerequest&scope=instagram_basic,instagram_manage_comments,instagram_manage_insights,pages_show_list,user_photos,user_posts,
*/

