!function(){"use strict";angular.module("easywebapp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","validation","validation.rule"])}(),function(){"use strict";angular.module("easywebapp").service("Preview",["$rootScope","$http","$config","$q","$log",function(t,e,o,n,r){this.getpreview=function(t){var r=n.defer();return e.post(o.api+"preview",t).success(function(t){r.resolve(t)}).error(function(t){r.reject(t)}),r.promise}}])}(),function(){"use strict";angular.module("easywebapp").factory("Project",["$resource","$config",function(t,e){return t(e.api+"projects/:id",{id:"@id"},{update:{method:"PUT"},query:{method:"GET",isArray:!0},show:{method:"GET"}})}])}(),function(){"use strict";angular.module("easywebapp").factory("Preset",["$resource","$config",function(t,e){return t(e.api+"admin-presets/:id",{id:"@id"},{update:{method:"PUT"},query:{method:"GET",isArray:!0}})}])}(),function(){"use strict";angular.module("easywebapp").service("File",["$rootScope","$http","$config","$q","$log",function(t,e,o,n,r){this.index=function(t){var r=n.defer();return e.post(o.api+"files/index",t).success(function(t){r.resolve(t)}).error(function(t){r.reject(t)}),r.promise},this.saveSnapShot=function(t){var r=n.defer();return e.post(o.api+"preview/save-snapshot",t).success(function(t){r.resolve(t)}).error(function(t){r.reject(t)}),r.promise}}])}(),function(){"use strict";angular.module("easywebapp").controller("addProjectCtrl",["$stateParams","$scope","$state","$rootScope","Preset","$config","Auth","Project","toastr",function(t,e,o,n,r,i,a,s,c){function l(){e.Project=new s,e.presets=[],e.preset_thumb_url=i.preset_thumb_url,e.token=a.getValue("token"),e.Project.preset_id=0,e.Project.user_id=a.getValue("id"),e.Project.organization_id=a.getValue("organization_id"),r.query().$promise.then(function(t){e.presets=t},function(){}),e.setPreset=function(t){e.Project.preset_id=t},e.saveProject=function(){e.Project.$save(function(t){c.success("Project created successfully!","Success"),o.go("edit-project",{projectId:t.id})},function(t){c.error(t)})},e.goBack=function(){o.transitionTo("dashboard")}}n.User?l():n.$on("userInitialized",function(t,e){l()})}]),angular.module("easywebapp").controller("editProjectCtrl",["$stateParams","$scope","$state","$rootScope","$config","Auth","Project","toastr","File",function(t,e,o,n,r,i,a,s,c){function l(){function n(){var t=document.getElementById("preview");t=t.contentWindow?t.contentWindow:t.contentDocument.document?t.contentDocument.document:t.contentDocument,t.document.open(),t.document.write('<style class="text/css">'+e.editCss+"</style>"+e.editHtml+'<script type="text/javascript">'+e.editJs+"</script>"),t.document.close()}function r(t){c.index({mode:"editFile",path:t.location+"index.html"}).then(function(t){e.editHtml=t,n()},function(){}),c.index({mode:"editFile",path:t.location+"style.css"}).then(function(t){e.editCss=t,n()},function(){}),c.index({mode:"editFile",path:t.location+"main.js"}).then(function(t){e.editJs=t,n()},function(){})}e.saveFile=function(){var t='<style class="text/css">'+e.editCss+"</style>"+e.editHtml+'<script type="text/javascript">'+e.editJs+"</script>";c.index({mode:"saveFile",path:e.Project.location+"index.html",text:e.editHtml}).then(function(t){},function(){}),c.index({mode:"saveFile",path:e.Project.location+"style.css",text:e.editCss}).then(function(t){},function(){}),c.index({mode:"saveFile",path:e.Project.location+"main.js",text:e.editJs}).then(function(t){},function(){}),c.index({mode:"saveFile",path:e.Project.location+"index1.html",text:t}).then(function(t){},function(){}),c.saveSnapShot({id:e.Project.id}).then(function(){s.success("Project saved successfully")},function(){s.error("Unable to save file")})},t.projectId||o.go("dashboard"),a.show({id:t.projectId}).$promise.then(function(t){e.Project=t,r(e.Project)},function(t){o.go("dashboard"),s.error()}),e.token=i.getValue("token"),e.$watch("editHtml",function(t,e){n()}),e.$watch("editCss",function(t,e){n()}),e.$watch("editJs",function(t,e){n()})}e.editHtml="",e.editCss="",e.editJs="",n.User?l():n.$on("userInitialized",function(t,e){l()})}])}(),function(){"use strict";angular.module("easywebapp").controller("dashboardCtrl",["$stateParams","Auth","$scope","$rootScope","$state","Project","$config",function(t,e,o,n,r,i,a){function s(){o.User=n.User,o.addProject=function(){r.go("add-project")},o.token=e.getValue("token"),i.query().$promise.then(function(t){o.projects=t},function(){}),o.project_thumb_url=a.project_thumb_url,o.editProject=function(t){r.go("edit-project",{projectId:t})}}n.User?s():n.$on("userInitialized",function(t,e){s()})}])}(),function(){"use strict";function t(){function t(){return e}var e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"}];this.getTec=t}angular.module("easywebapp").service("webDevTec",t)}(),function(){"use strict";function t(t){function e(e,o,n,r){var i,a=t(o[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});o.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){a.type(t).pause()["delete"]()}),i=e.$watch("vm.contributors",function(){angular.forEach(r.contributors,function(t){a.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){i()})}function o(t,e){function o(){return n().then(function(){t.info("Activated Contributors View")})}function n(){return e.getContributors(10).then(function(t){return r.contributors=t,r.contributors})}var r=this;r.contributors=[],o()}var n={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:o,controllerAs:"vm"};return o.$inject=["$log","githubContributor"],n}angular.module("easywebapp").directive("acmeMalarkey",t),t.$inject=["malarkey"]}(),function(){"use strict";function t(){function t(t){var e=this;e.relativeDate=t(e.creationDate).fromNow()}var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],e}angular.module("easywebapp").directive("acmeNavbar",t)}(),function(){"use strict";function t(t,e){function o(o){function r(t){return t.data}function i(e){t.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))}return o||(o=30),e.get(n+"/contributors?per_page="+o).then(r)["catch"](i)}var n="https://api.github.com/repos/Swiip/generator-gulp-angular",r={apiHost:n,getContributors:o};return r}angular.module("easywebapp").factory("githubContributor",t),t.$inject=["$log","$http"]}(),function(){"use strict";angular.module("easywebapp").service("Auth",["$rootScope","$cookies","$cookieStore","$http","$config","$q","$log",function(t,e,o,n,r,i,a){var s=function(e){o.put("user",JSON.stringify(e)),t.User=e,n.defaults.headers.common.Token=e.token},c=function(t){if(o.get("user")){var e=JSON.parse(o.get("user"));return e[t]}return!1};this.getValue=c,this.setUser=s,this.login=function(t){var e=i.defer();return n.post(r.api+"auth",t).success(function(t){e.resolve(t),s(t)}).error(function(t){e.reject(t)}),e.promise},this.getUpdatedUser=function(){var t=i.defer();c("token",function(e){n.get(r.api+"user/",e).success(function(e){t.resolve(e),s(e)}).error(function(e){t.reject(e)})})},this.isLoggedIn=function(){return c("id")&&c("token")?!0:!1},this.getToken=function(){return c("token")?e.token:!1},this.removeUser=function(){o.remove("user"),t.User=!1},this.setUserByParams=function(t){s(t)},this.checkSubdomain=function(t){var e=i.defer();return n.get(r.api+"valid-subdomain?subdomain="+t).success(function(t){e.resolve(t)}).error(function(t){e.reject(t)}),e.promise}}])}(),function(){"use strict";angular.module("easywebapp").factory("Subdomain",["$location",function(t){var e=t.host();return e.indexOf(".")<0?null:e.split(".")[0]}])}(),function(){"use strict";angular.module("easywebapp").controller("LoginCtrl",["$scope","Auth","$state","toastr","$location",function(t,e,o,n,r){var i=r.host(),a="";i.indexOf(".")>0&&(a=i.split(".")[0]),t.credentials={subdomain:a},t.signIn=function(){e.login(t.credentials).then(function(t){n.success("You are successfully login","Success"),o.go("dashboard")},function(t){t&&t.error&&n.error(t.error)})}}])}(),function(){"use strict";function t(t,e,o){function n(){i(),t(function(){a.classAnimation="rubberBand"},4e3)}function r(){o.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),a.classAnimation=""}function i(){a.awesomeThings=e.getTec(),angular.forEach(a.awesomeThings,function(t){t.rank=Math.random()})}var a=this;a.awesomeThings=[],a.classAnimation="",a.creationDate=1440412812560,a.showToastr=r,n()}angular.module("easywebapp").controller("MainController",t),t.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";angular.module("easywebapp").factory("httpRequestInterceptor",["$rootScope","$injector",function(t,e){return{request:function(t){var o=e.get("Auth");return o.isLoggedIn()&&(console.log("x"),t.headers.Token=o.getValue("token")),t}}}])}(),function(){"use strict";angular.module("easywebapp").run(["$rootScope","$config","Auth","toastr","$state","$cookies","$http","$location",function(t,e,o,n,r,i,a,s){t.$state=r,t.Auth=o,t.config=e;var c=s.host(),l="";c.indexOf(".")>0&&(l=c.split(".")[0]),o.checkSubdomain(l).then(function(t){},function(t){window.location="http://notrie.com"}),o.isLoggedIn()&&(r.go("dashboard"),a.defaults.headers.common.Token=o.getValue("token"),a.get(e.api+"user/"+o.getValue("token")).then(function(e){o.setUser(e.data),t.$broadcast("userInitialized",{message:"hello"})})),t.$on("$stateChangeStart",function(t,e,n,i,a){var s=["login","forgotpass","reset-link"];o.isLoggedIn()||-1!=$.inArray(e.name,s)||(t.preventDefault(),r.transitionTo("login")),o.isLoggedIn()&&"login"==e.name&&(t.preventDefault(),r.transitionTo("dashboard"))}),t.getlogout=function(){o.removeUser(),r.go("login")}}])}(),function(){"use strict";function t(t,e,o){t.state("login",{url:"/",templateUrl:o.module.auth.view+"sign_in.html",controller:"LoginCtrl",controllerAs:"login"}).state("dashboard",{url:"/dashboard",templateUrl:o.module.general.view+"dashboard.html",controller:"dashboardCtrl",controllerAs:"dashboard"}).state("add-project",{url:"/project/add",templateUrl:o.module.general.view+"addProject.html",controller:"addProjectCtrl",controllerAs:"addproject"}).state("edit-project",{url:"/project/edit/:projectId",templateUrl:o.module.general.view+"editProject.html",controller:"editProjectCtrl",controllerAs:"editProject"}),e.otherwise("/")}angular.module("easywebapp").config(t),t.$inject=["$stateProvider","$urlRouterProvider","$config"]}(),function(){"use strict";angular.module("easywebapp").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment).constant("$config",{url:"http://localhost:3000/",api:"http://api.notrie.com/",preset_thumb_url:"http://api.notrie.com/preset-thumb",project_thumb_url:"http://api.notrie.com/preview/file",module:{auth:{controller:"app/auth/controllers/",view:"app/auth/views/"},general:{controller:"app/general/controller/",view:"app/general/views/"}}})}(),function(){"use strict";function t(t,e,o){t.debugEnabled(!0),e.options.timeOut=3e3,e.options.positionClass="toast-top-right",e.options.preventDuplicates=!0,e.options.progressBar=!0}angular.module("easywebapp").config(t),t.$inject=["$logProvider","toastr","$httpProvider"]}(),angular.module("easywebapp").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class="container"><div><acme-navbar creationdate="main.creationDate"></acme-navbar></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class="main.classAnimation"><button type="button" class="btn btn-lg btn-success" ng-click="main.showToastr()">Splendid Toastr</button></p><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class="caption"><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href="{{awesomeThing.url}}">{{ awesomeThing.url }}</a></p></div></div></div></div></div>'),t.put("app/auth/views/sign_in.html",'<style type="text/css">\r\n  .ng-invalid.ng-dirty{\r\n    .has-error .form-control;\r\n}\r\n\r\nlabel.has-error.control-label {\r\n    .has-error .control-label;\r\n}\r\n</style><div class="container" id="wrap"><div class="row"><div class="col-md-6 col-md-offset-3"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><legend>Sign In</legend><div class="row"><div class="col-xs-12 col-md-12"><input type="email" name="email" value="" class="form-control input-lg" placeholder="Email Address" ng-model="credentials.email" validator="email" email-error-message="email address required."> <input type="password" name="password" value="" class="form-control input-lg" placeholder="Password" ng-model="credentials.password" validator="required" required-error-message="password required."></div><button class="btn btn-block btn-success" type="submit" validation-submit="form1" ng-click="signIn()">Sign In</button></div></form></div></div></div>'),t.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>'),t.put("app/general/views/addProject.html",'<style type="text/css">\r\n    .ng-invalid.ng-dirty{\r\n    .has-error .form-control;\r\n    }\r\n\r\n    label.has-error.control-label {\r\n    .has-error .control-label;\r\n    }\r\n</style><div class="container" id="wrap"><div class="row"><button class="btn btn-md btn-success pull-right" ng-click="getlogout()">Sign Out</button></div><div class="row"><div class="col-sm-2"></div><div class="col-sm-8"><h1 style="text-align:center;">Add Project</h1><form class="form-horizontal form" method="post" accept-charset="utf-8" name="formAddProject" id="formAddProject" role="form" novalidate=""><div class="form-group"><label class="col-md-4">Title<em>*</em></label><div class="col-md-8"><input type="text" name="name" ng-model="Project.name" class="form-control" validator="required" required-error-message="Project title required."></div></div><div class="form-group"><label class="col-md-4">Folder Name:</label><div class="col-md-8"><input type="text" ng-model="Project.folder_name" class="form-control"></div></div><div class="form-group"><label class="col-md-4">Template</label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-3" ng-repeat="preset in presets" style="position:relative;"><img src="{{ preset_thumb_url + \'?name=\' + preset.thumb + \'&token=\' + token }}" ng-click="setPreset(preset.id)" style="width:100%;cursor: pointer;"></div></div></div><div class="form-group"><div class="pull-right"><button class="btn btn-success btn-md" type="submit" validation-submit="formAddProject" ng-click="saveProject()">Save</button> <button class="btn btn-default btn-md" type="button" ng-click="goBack();">Cancel</button></div></div></form></div><div class="col-sm-2"></div></div></div>'),t.put("app/general/views/dashboard.html",'<div class="container" id="wrap"><div class="row"><div class="col-md-6 col-md-offset-3"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><h4>Welcome {{ User.firstname }}</h4><div class="row"><div class="col-sm-3"></div><div class="col-sm-4"><button class="btn btn-md btn-primary" ng-click="addProject()">Add Project</button></div><div class="col-sm-2"><button class="btn btn-md btn-success" ng-click="getlogout()">Sign Out</button></div><div class="col-sm-3"></div></div><div class="row"><div class="col-sm-3" data-ng-repeat="project in projects"><div class="col-sm-12">{{ project.name }}</div><div class="col-sm-12"><img src="{{ project_thumb_url }}?name={{ project.thumb }}&token={{ token }}" ng-click="editProject(project.id)" height="100" width="100" style="border:2px solid #999999;cursor:pointer;"></div></div></div></form></div></div></div>'),t.put("app/general/views/editProject.html",'<style>\r\n    .full-width{\r\n        width:100%;\r\n    }\r\n    .fifty-per-height{\r\n        height: 100%;\r\n    }\r\n    #wrap{\r\n        margin:1%;\r\n    }\r\n</style><div class="" id="wrap"><div class="row"><div class="col-sm-6"><h3>{{ Project.name }}</h3></div><div class="col-sm-5"><h3 class="pull-right"><button class="btn btn-md btn-success" ng-click="saveFile({{ Project }})">Save</button> Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-success pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><div class="row"><div class="col-sm-12"></div></div><div class="row"><div class="col-sm-4"><h3>HTML</h3><textarea class="full-width" ng-model="editHtml" rows="15"></textarea></div><div class="col-sm-4"><h3>CSS</h3><textarea class="full-width" ng-model="editCss" rows="15"></textarea></div><div class="col-sm-4"><h3>JS</h3><textarea class="full-width" ng-model="editJs" rows="15"></textarea></div></div><div class="row"><div class="col-sm-12"><h3>Preview</h3><iframe name="preview" id="preview" class="full-width" height="500px;"></iframe></div></div></div>')}]);