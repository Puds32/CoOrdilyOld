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

co.shell.clientmenu = (function () {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            main_html: String() +
                '<span>' +
                '<button id="co-add-client">Add Client</button>' +
                '</span>' +
                '<div class="co-client-list">' +
                //Template goes here
                '</div>'
                
        },
        stateMap = { $container: null },
        jqueryMap = {},

        setJqueryMap, clientTemplateString, clientTemplate, initModule;
    //----------------- END MODULE SCOPE VARIABLES ---------------

    //------------------- BEGIN UTILITY METHODS ------------------
    // example : getTrimmedString

    //-------------------- END UTILITY METHODS -------------------

    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;

        jqueryMap = { $container: $container };
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

            var clientList = JSON.parse(_data);
            var clientDataSource = new kendo.data.DataSource({
                data: clientList.Items
                
            });

            clientTemplateString = '<div class="client-list-item"><span>#: ClientName# </span></div>';
            clientTemplate = kendo.template(clientTemplateString);

            $(".co-client-list").kendoListView({
                dataSource: clientDataSource,
                selectable: "single",
                template: clientTemplate,
                change: function (e) {
                    var data = clientDataSource.view();
                    var selected = $.map(this.select(), function (item) {
                        return data[$(item).index()].UniqueId;
                    });
                    var ownerEmail = $("#acct").text();
                    var _data = {ownerEmail: ownerEmail, uniqueId: selected};
                    $.gevent.publish('co-client-menu-tap', _data);
                }
            });

            // $("#pager").kendoPager({
            //     dataSource: clientDataSource
            // });
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
