/*
 * module_template.js
 * Template for browser feature modules
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, esversion : 8,  strict: false
*/

/*global $, co */

co.shell.clientdetails = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html: String() +
        '<div id="co-top-content">' + //div1
        '<div id="co-top-content-d1">' +// co-top-content-d1

        '</div>' + //end co-top-content-d1
        '</div>' + //end div1
        '<div id="client-screen-pill-content">' +
        //pill content//
        '<div><button type="button" id="id-client-details-pill" class="co-client-details">Client Details</button></div>' +
        '<div><button type="button" id="id-project-details-pill" class="co-client-details">Projects</button></div>' +
        '<div><button type="button" class="co-client-details">Another</button></div>' +

        '</div>' +
        //end pill content//
        // div client-screen-main-container
        '<div id="id-client-screen-main-container" class="class-client-screen-main-container">' +
          // content template
        '</div>'
      // en div client-screen-main-container
    },
    stateMap = { $container: null },
    jqueryMap = {},

    setJqueryMap, onTapClientPill, onTapProjectPill, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = { 
      $container: $container,
      $clientScreenMainContainer: $container.find('#id-client-screen-main-container'),
      $clientPill: $container.find('#id-client-details-pill'),
      $projectPill: $container.find('#id-project-details-pill')
    };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  // example: onClickButton = ...
  // tap client details pill
  onTapClientPill = function (event) {
    alert("Client Taped");
    var _data = "Client got back";
    $.gevent.publish('co-client-client-pill-tap', _data);
  };
  // end tap client pill

  // tap project details pill
  onTapProjectPill = function (event) {
    alert("Project Tapped");
    var _data = "Project got back";
    $.gevent.publish('co-client-project-pill-tap', _data);
  };
  // end tap project pill
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
  //};
  // End public method /configModule/

  // Begin public method /initModule/
  // Purpose    : Initializes module
  // Arguments  :
  //  * $container the jquery element used by this feature
  // Returns    : true
  // Throws     : none
  //
  initModule = function ($container, _data) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    $(document).ready(function () {
      setJqueryMap();
      jqueryMap.$clientPill.bind('utap', onTapClientPill);
      jqueryMap.$projectPill.bind('utap', onTapProjectPill);
    });


    var clientLocalDataSource = new kendo.data.DataSource({
      data: _data,
      pageSize: 1,
      schemma: {

        model: {
          id: "uniqueId",
          fields: {
            uniqueId: { type: "string" },
            ownerEmail: { type: "string" },
            clientName: { type: "string" },
            add1: { type: "string" },
            add2: { type: "string" },
            add3: { type: "string" },
            town: { type: "string" },
            county: { type: "string" },
            postcode: { type: "string" },
            email: { type: "string" },
            website: { type: "string" },
            deskPhone: { type: "string" }
          }
        }
      }
    });


    var clientTemplateString = '<div class="content k-content client-address-item">' +
      '<span class="client-address-label">Name</span><span>#: clientName# </span> <br>' +
      '<span class="client-address-label">Address</span><span>' +
      '#:  add1 != null ?  add1 : "" # ' +
      '#:  add2 != null ?  add2 : "" # ' +
      '#:  add3 != null ?  add3 : "" # ' +
      '#:  town != null ?  town : "" # ' +
      '#:  county != null ?  county : "" # ' +
      '#:  postcode != null ?  postcode : "" # ' +
      '</span><br>' +
      '<span class="client-address-label">Email</span><span>#: email != null ? email: "" # </span><br>' +
      '<span class="client-address-label">Website</span><span>#: website != null ? website: "" # </span><br>' +
      '<span class="client-address-label">Desk Phone</span><span>#: deskPhone != null ? deskPhone: "" # </span>' +
      '</div>';

    var clientTemplate = kendo.template(clientTemplateString);

    $("#co-top-content-d1").kendoListView({
      dataSource: clientLocalDataSource,
      template: clientTemplate
    });

    return true;
  };
  // End public method /initModule/

  // return public methods
  return {

    initModule: initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
