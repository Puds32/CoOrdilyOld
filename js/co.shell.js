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

co.shell = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html: String() +
        '<div class="co-shell-head">' +
        '<div class="co-shell-head-hamburger" id="hamburger" ><span id="slide-in-handle"><i class="fas fa-bars fa-2x"></i></span></i></div>' +
        '<div class="co-shell-head-logo"><span id="logo">CoOrdily</span></div>' +
        '<div class="co-shell-head-acct"><span id="acct"></span><span id="sign-in">Sign in</span></div>' +
        '</div>' +

        '<div class="co-shell-main">' +// 1

        '<div id="slide-in-share" class="co-shell-main-nav">' +// 2


        '<div class="co-menu-container">' +// 3

        '<div class="co-sidenav-container">' +// 4
        '<ul class="sidenav">' +
        '<li class="menu-list-item"><span>#: menuItem# </span></li>' +
        '</ul>' +
        '</div>' +// 4

        '<div class="co-sub-menu-container">' +// 5
        '<div id="co-back-button"><span id="co-back-button-span">&lt</span>' +
        '</div>' +

        '<div id="co-sub-menu-list">' +

        '</div>' + //co-sub-menu-list
        '</div>' +// 5 co-sub-menu-container

        '</div>' +// 3

        '</div>' +// 2

        '<div class="co-shell-main-content"></div>' +
        '</div>' +// 1

        '<div id="co-main-loader" class="co-shell-loader"></div>' +
        '<div id="co-shell-modal"></div>'

    },
    stateMap = { $container: null },
    jqueryMap = {},
    onTapAcct,
    onLogin,
    onLogout,
    onTapMainMenu,
    onTapClientMenu,
    onGotClientListData,
    onGotClientDetailData,
    getData,
    menuTemplateString,
    menuTemplate,
    menuDataSource,
    setJqueryMap, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  // Get data
  getData = function () {
    menuTemplateString = '<li class="menu-list-item"><span>#: menuItem# </span></li>';
    menuTemplate = kendo.template(menuTemplateString);
    var menu = [
      { uniqueId: "1", menuItem: "Home" },
      { uniqueId: "2", menuItem: "Clients" },
      { uniqueId: "3", menuItem: "Projects" }
    ];
    menuDataSource = new kendo.data.DataSource({ data: menu });

    // clientTemplateString = '<li class="client-list-item"><span>#: ClientName# </span></li>';
    // clientTemplate = kendo.template(clientTemplateString);
    // var client = [{
    //   UniqueId: 1,
    //   ClientName: 'Google',
    //   add1: 'Add1',
    //   add2: 'Add2'
    // },
    // {
    //   UniqueId: 2,
    //   ClientName: 'IBM',
    //   add1: 'Add1',
    //   add2: 'Add2'
    // }
    // ];
    // clientDataSource = new kendo.data.DataSource({ data: client });
  };
  // End get data
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $mainContent: $container.find('.co-shell-main-content'),
      $menuDataSource: undefined,
      $slideInShare: $container.find('#slide-in-share'),
      $hamburger: $container.find('#hamburger'),
      $acct: $container.find('#acct'),
      $signIn: $container.find('#sign-in'),
      $backButton: $container.find('#co-back-button-span'),
      $signInWindow: $container.find('#co-shell-modal'),
      $subMenuContainer: $container.find('#co-sub-menu-list')
    };
  };

  function hideLoader() {
    document.getElementById("co-main-loader").style.display = "none";
  }

  function showLoader() {
    document.getElementById("co-main-loader").style.display = "block";
  }
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  // example: onClickButton = ...
  onTapAcct = function (event) {
    co.shell.login.initModule(jqueryMap.$signInWindow);
  };

  // react to main menu selection
  onTapMainMenu = function (event, _data) {
    switch (_data) {
      case '1':
        alert(_data);
        break;
      case '2':
        var ownerEmail = jqueryMap.$acct.text();
        showLoader();
        co.getdata.getClients(ownerEmail);
        break;
      case '3':
        alert(_data);
        break;
      default:
        alert("Error");
    }
  };
  // 

  // react to client menu selection
  onTapClientMenu = function (event, _data) {
    showLoader();
    co.getdata.getClient(_data);
  };
  // 

  //  got my clients data
  onGotClientListData = function (event, _data) {
    hideLoader();
    co.shell.clientmenu.initModule(jqueryMap.$subMenuContainer, _data);
    // load up client list menu
  };
  // end got my clients data

  // got client detail
  onGotClientDetailData = function (event, _data) {
    hideLoader();

    var output = JSON.parse(_data);
    // alert(_data)
    // alert(Object.keys(output).length);
    var clientData = [];
    for (var i = 0; i < Object.keys(output).length; i++){
        var client = {
            uniqueId: output.Item.UniqueId,
            ownerEmail: output.Item.OwnerEmail,
            clientName: output.Item.ClientName,
            add1: output.Item.Add1,
            add2: output.Item.Add2,
            add3: output.Item.Add3,
            town: output.Item.Town,
            county: output.Item.County,
            postcode: output.Item.Postcode,
            email: output.Item.Email,
            website: output.Item.Website,
            deskPhone: output.Item.DeskPhone
        };
        clientData.push(client);
    }
    co.shell.clientdetails.initModule(jqueryMap.$mainContent, clientData);
  };
  // end got client detail


  onLogin = function (event, _data) {
    jqueryMap.$acct.text(_data);
    jqueryMap.$signIn.text("Sign out");
    hideLoader();
    jqueryMap.$hamburger.css("display", "block");
    jqueryMap.$slideInShare.css("display", "block");
    //co.shell.menu.initModule(jqueryMap.$container, _data);
  };

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
  initModule = function ($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
    $(document).ready(function () {
      jqueryMap.$signIn.bind('utap', onTapAcct);
      //jqueryMap.$backButton.bind('utap', onTapBack);
      $.gevent.subscribe($container, 'co-login', onLogin);
      $.gevent.subscribe($container, 'co-main-menu-tap', onTapMainMenu);
      $.gevent.subscribe($container, 'co-client-menu-tap', onTapClientMenu);
      $.gevent.subscribe($container, 'co-got-client-data', onGotClientListData);
      $.gevent.subscribe($container, 'co-got-client-detail-data', onGotClientDetailData);

      var slide = kendo.fx($("#slide-in-share")).slideIn("right"),
        visible = true;

      getData();

      $(".sidenav").kendoListView({
        dataSource: menuDataSource,
        selectable: "single",
        template: menuTemplate,
        change: function (e) {
          var data = menuDataSource.view();
          var selected = $.map(this.select(), function (item) {
            return data[$(item).index()].uniqueId;
          });
          $.gevent.publish('co-main-menu-tap', selected);
        }
      });



      $("#slide-in-handle").click(function (e) {
        if (visible) {
          slide.reverse();
        } else {
          slide.play();
        }
        visible = !visible;
        e.preventDefault();
      });

      $("#co-back-button-span").click(function (e) {
        if (visible) {
          slide.reverse();
        } else {
          slide.play();
        }
        visible = !visible;
        e.preventDefault();
      });

    });
  };

  // End public method /initModule/

  // return public methods
  return {
    initModule: initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
