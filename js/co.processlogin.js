/*
* co.processlogin.js
* processlogin module
*/

co.processlogin = (function () {
    var getLogin;
    
    AWS.config.region='us-west-2';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'us-west-2:7f428de1-156c-410d-a485-b85f6e5c5d83'});
    
    var lambda = new AWS.Lambda();
    AWS.config.credentials.clearCachedId();
    
    
    getLogin = function (_data) {

  //    stateMap = {$container: null},
  //    contentMap = {
  //      content_html: String() +
  //      '<div class="form-group">' +
  //      '<label for="email">Email:</label>' +
  //      '<input type="text" class="form-control" id="email">' +
  //      '</div>' +
  //      '<div class="form-group">' +
  //      '<label for="password">Password:</label>' +
  //      '<input type="password" class="form-control" id="password">' +
  //      '</div>' +
  //      '<button type="button" id="login" class="k-button close-button">Close</button>' +
  //      '<button type="button" id="forgot" class="k-button open-button">Forgot Password</button>' +
  //      '<div id="result"></div>'
  //  };
        var input = {
         email: _data.$email,
         password: _data.$password
       };
       
       
       lambda.invoke({
         FunctionName: 'login',
         Payload: JSON.stringify(input)
       }, function(err, data) {
         if (err) console.log(err, err.stack);
         else {
           var output = JSON.parse(data.Payload);
           //alert(data.Payload);
           if (!output.login) {
             console.log('Not logged in');
           } else {
             //console.log('Logged in with IdentityId: ' + output.identityId);
             
             var creds = AWS.config.credentials;
             creds.params.IdentityId = output.identityId;
             creds.params.Logins = {
               'cognito-identity.amazonaws.com': output.token
               
             };
             creds.expired = true;
             
             $.gevent.publish('co-login', output.email);
            
             $(document.getElementById('email')).closest("[data-role=window]").data("kendoWindow").close();
             
             // Do something with the authenticated role
            
             
            
            //myWindow.data("kendoWindow").content(contentMap.content_html);
            //myWindow.data("kendoWindow").refresh();
            //myWindow.data("kendoWindow").center();
            //console.log(myWindow.data("kendoWindow").content());
   
           }
         }
       });
      
     
    };
    return{getLogin: getLogin};
 }());
 
 