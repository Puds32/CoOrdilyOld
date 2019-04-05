/*
 * module_template.js
 * Template for browser feature modules
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, co */

co.shell.getclients = (function () {
'use strict'
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
        main_html : String()
        +'<div class="k-content wide">'
        +'My Clients'
        +'<div id="listView"></div>'
    +'</div>'
    + '</div>'
    + '<div id="loader"></div>'
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    setJqueryMap, configModule, templateString, template, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = { $container : $container };
  };
  // End DOM method /setJqueryMap/
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
  configModule = function ( input_map ) {
    co.butil.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  // End public method /configModule/

  // Begin public method /initModule/
  // Purpose    : Initializes module
  // Arguments  :
  //  * $container the jquery element used by this feature
  // Returns    : true
  // Throws     : none
  //
  initModule = function ( $work, clientData ) {
    stateMap.$container = $work;
    stateMap.$container.html(configMap.main_html);
    setJqueryMap();
    //$(navToggle).data-toggle("collapse")
    //$('.navbar-collapse.in').collapse('hide');

    $(document).ready(function () {
        // var client = [{
        //     UniqueId: 1,
        //     ClientName: 'Google',
        //     add1: 'Add1',
        //     add2: 'Add2'
        // },
        // {
        //     UniqueId: 2,
        //     ClientName: 'IBM',
        //     add1: 'Add1',
        //     add2: 'Add2'
        // }
        // ];


    // var newClient = {
    //     UniqueId: '0',
    //     ClientName: 'Add New Client',
    //     add1: 'Click here to add new client'
    // }


    


    //var clientList[] = clientData

    
    var newClient = {
        uniqueId: '0',
        clientName: 'Add New Client',
        add1: 'Click here to add new client'
    }

    clientData.unshift(newClient)

    var dataSource = new kendo.data.DataSource({
        data: clientData
    })
    //dataSource.fetch()
   
 


    //templateString = '<div class="product"><h3 class="client-list-item">#: ClientName# </h3></div>';

    templateString = '<div class="k-block panels"><div class="k-header k-shadow"><h5 class="client-list-item">#: clientName# </h5></div>#: add1# </div>'

    template = kendo.template(templateString);

    $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: "single",
        // dataBound: onDataBound,
        // change: onChange,
        template: template
    });
    //$("button.navbar-toggle").click();
    });

    return true;
  };
  // End public method /initModule/

  // return public methods
  return {
    
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
