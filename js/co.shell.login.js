/*
 * co.shell.login.js
 * Sign in window
 *
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/



co.shell.login = (function () {

  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
  configMap = {
    main_html: String() +
    '<div id="loginWindow" class="co-shell-main-content-login">' +
    '</div>'
    
},
contentMap = {
    content_html: String() +      
    '<div class="content k-content">' +
        '<ul class="fieldlist">' +
            '<li>' +
                '<h4 for="email">Email:</h4>' +
                '<input type="text" id="email">' +
            '</li>' +
            '<li>' +
                '<h4 for="password">Password:</h4>' +
                '<input type="password" id="password">' +
            '</li>' +
            '<li>' +
                '<button type="button" id="login" class="k-button login-button">Login</button>' +
                '<button type="button" id="cancel" class="k-button cancel-button">Cancel</button>' +
            '</li>' +
            '<li>' +
            '<label class="anchor lost-password">Lost Password</label>' +
            '</li>' +
        '</ul>' +
        '<div id="co-login-loader" class="co-shell-loader"></div>' +
    '</div>'
   
    
},
    stateMap  = { $container : null },
    jqueryMap = {},
    setJqueryMap,
    configModule,
    initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = { 
        $container : $container,
        $loginWindow: $container.find('#loginWindow')};
  };
  // End DOM method /setJqueryMap/

// Begin DOM method /configureLoginWindow
function configureLoginWindow(){
    $(function(){
            jqueryMap.$loginWindow.kendoWindow({
            width: "500px",
            height: "300px",
            title: "CoOrdily - Sign in",
            visible: false,
            modal: true,
            actions: ["Close"],
            deactivate: function() {
                this.destroy();                                           
            }
            
        }).data("kendoWindow").center().open().content(contentMap.content_html);

        $("#email").kendoMaskedTextBox({mask: ""});
        $("#password").kendoMaskedTextBox({mask: ""});
       
    });
}

function showPage() {
    document.getElementById("co-login-loader").style.display = "block";
  }
// End DOM method /configureLoginWindow

  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  // example: onClickButton = ...
  //-------------------- END EVENT HANDLERS --------------------



  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /configModule/
  // Purpose    : Adjust configuration of allowed keys
  // Arguments  : A map of settable keys and values
  //   * color_name - color to use
  // Settings   :
  //   * configMap.settable_map declares allowed keys
  // Returns    : true
  // Throws     : none
  //
  // configModule = function ( input_map ) {
  //   spa.butil.setConfigMap({
  //     input_map    : input_map,
  //     settable_map : configMap.settable_map,
  //     config_map   : configMap
  //   });
  //   return true;
  // };
  // End public method /configModule/

  // Begin public method /initModule/
  // Purpose    : Initializes module
  // Arguments  :
  //  * $container the jquery element used by this feature
  // Returns    : true
  // Throws     : none
  //
  initModule = function ( $container ) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
    configureLoginWindow();

    $(document).ready(function(){

        $(".login-button").kendoButton({
            icon: "unlock"
        });

        $(".cancel-button").kendoButton({
            icon: "cancel"
        });

        $("#cancel").click(function(){
            $(this).closest("[data-role=window]").data("kendoWindow").close();
        });
  
        $("#login").click(function(){
            var email = document.getElementById('email');
            var password = document.getElementById('password');
            loginObject = {$email: email.value, $password: password.value};
            showPage();
            co.processlogin.getLogin(loginObject);
        });

        
        $(".lost-password").click(function() {
            // ppm.shell.lostpassword.initModule(jqueryMap.$loginWindow)
        });

        // $("#email").val("mikemckenna47@gmail.com");
        // $("#password").val("git2");
        $("#login").focus();
    });

    
    return true;
  };
  // End public method /initModule/

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
