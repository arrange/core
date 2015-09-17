!function(){"use strict";angular.module("easywebapp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","validation","validation.rule","ui.codemirror","ngFileUpload"])}(),function(){"use strict";angular.module("easywebapp").service("Preview",["$rootScope","$http","$config","$q","$log",function(e,t,o,r,n){this.getpreview=function(e){var n=r.defer();return t.post(o.api+"preview",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise}}])}(),function(){"use strict";angular.module("easywebapp").factory("Project",["$resource","$config",function(e,t){return e(t.api+"projects/:id",{id:"@id"},{update:{method:"PUT"},query:{method:"GET",isArray:!0},show:{method:"GET"}})}])}(),function(){"use strict";angular.module("easywebapp").factory("Preset",["$resource","$config",function(e,t){return e(t.api+"admin-presets/:id",{id:"@id"},{update:{method:"PUT"},query:{method:"GET",isArray:!0}})}])}(),function(){"use strict";angular.module("easywebapp").service("File",["$rootScope","$http","$config","$q","$log",function(e,t,o,r,n){this.index=function(e){var n=r.defer();return t.post(o.api+"files/index",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise},this.saveSnapShot=function(e){var n=r.defer();return t.post(o.api+"preview/save-snapshot",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise}}])}(),function(){"use strict";angular.module("easywebapp").controller("SocialIconCtrl",["$config","$state","Auth","$scope","$rootScope","toastr","$stateParams","$modalInstance",function(e,t,o,r,n,i,s,a){r.close=function(){a.close()},r.models={},r.models.facebook_link="http://facebbook.com/",r.models.twitter_link="http://twitter.com/",r.models.styleicon="plain",r.models.monochrome="monochrome",r.models.color="",r.models.font_size="22px",r.models.open_in_new_tab=!0,r.models.social_links=[{name:"facebook","class":"fa-facebook",placeholder:"Enter faceboook Url",background_color:"#3B5998",color:"#FFFFFF",title:"",href:""},{name:"twitter","class":"fa-twitter",placeholder:"Enter twitter Url",background_color:"#55ACEE",color:"#FFFFFF",title:"",href:""},{name:"pinterest","class":"fa-pinterest-p",placeholder:"Enter twitter Url",background_color:"#C8232C",color:"#FFFFFF",title:"",href:""}]}])}(),function(){"use strict";angular.module("easywebapp").controller("addProjectCtrl",["$stateParams","$scope","$state","$rootScope","Preset","$config","Auth","Project","toastr","Upload",function(e,t,o,r,n,i,s,a,l,c){function d(){t.Project=new a,t.presets=[],t.preset_thumb_url=i.preset_thumb_url,t.token=s.getValue("token"),t.Project.preset_id=-1,t.Project.user_id=s.getValue("id"),t.Project.organization_id=s.getValue("organization_id"),t.zipFile=null,t.uploadFiles=function(e){if(e){if(console.log(e.name.split(".")[1]),"zip"!=e.name.split(".")[1]&&"ZIP"!=e.name.split(".")[1])return l.error("Only zip files allowed"),!1;t.zipFile=e}},n.query().$promise.then(function(e){t.presets=e},function(){}),t.setPreset=function(e){t.Project.preset_id=e},t.saveProject=function(){var e=!1;"zip"==t.Project.type?t.zipFile?e=!0:l.error("Zip file is required"):"template"==t.Project.type?(t.zipFile=null,t.Project.preset_id>0?e=!0:l.error("Select Preset")):"blank"==t.Project.type&&(t.zipFile=null,e=!0),e&&(t.zipFile?c.upload({url:i.api+"projects",method:"POST",headers:{token:s.getValue("token")},fields:t.Project.toJSON(),file:t.zipFile,fileFormDataName:"zipFile"}).then(function(e){l.success("Project created successfully!","Success"),o.go("edit-project",{projectId:e.id})},function(e){}):t.Project.$save(function(e){l.success("Project created successfully!","Success"),o.go("edit-project",{projectId:e.id})},function(e){e.data&&e.data.error&&l.error(e.data.error)}))},t.goBack=function(){o.transitionTo("dashboard")}}r.User?d():r.$on("userInitialized",function(e,t){d()})}]),angular.module("easywebapp").controller("editProjectCtrl",["$stateParams","$scope","$state","$rootScope","$config","Auth","Project","toastr","File","$modal",function(e,t,o,r,n,i,s,a,l,c){function d(){function r(){var e=document.getElementById("preview");e=e.contentWindow?e.contentWindow:e.contentDocument.document?e.contentDocument.document:e.contentDocument,e.document.open(),e.document.write('<style class="text/css">'+t.editCss+"</style>"+t.editHtml+'<script type="text/javascript">'+t.editJs+"</script>"),e.document.close()}function c(e){l.index({mode:"editFile",path:e.location+"index.html"}).then(function(o){var i=$("<div>");i.html(o),i.find("*").each(function(){var t=$(this).attr("href"),o=$(this).attr("src");$(this).is("a")?"#"!=$(this).attr("href")&&"http"!=$(this).attr("href").substr(0,4)&&$(this).attr("href","#"):t&&"#"!=t&&"//"!=t.substr(0,2)&&"http"!=t.substr(0,4)?$(this).attr("href",n.clients_path+"/"+p+"/"+u+"/"+e.location+t):o&&"#"!=o&&"//"!=o.substr(0,2)&&"http"!=o.substr(0,4)&&$(this).attr("src",n.clients_path+"/"+p+"/"+u+"/"+e.location+o)}),t.editHtml=i.html(),r()},function(){}),l.index({mode:"editFile",path:e.location+"style.css"}).then(function(e){t.editCss=e,r()},function(){}),l.index({mode:"editFile",path:e.location+"main.js"}).then(function(e){t.editJs=e,r()},function(){})}t.saveFile=function(){'<style class="text/css">'+t.editCss+"</style>"+t.editHtml+'<script type="text/javascript">'+t.editJs+"</script>";l.index({mode:"saveFile",path:t.Project.location+"index.html",text:t.editHtml}).then(function(e){},function(){}),l.index({mode:"saveFile",path:t.Project.location+"style.css",text:t.editCss}).then(function(e){},function(){}),l.index({mode:"saveFile",path:t.Project.location+"main.js",text:t.editJs}).then(function(e){},function(){}),l.saveSnapShot({id:t.Project.id}).then(function(){a.success("Project saved successfully")},function(){a.error("Unable to save file")})},e.projectId||o.go("dashboard"),s.show({id:e.projectId}).$promise.then(function(e){t.Project=e,c(t.Project)},function(e){o.go("dashboard"),a.error()}),t.token=i.getValue("token"),t.$watch("editHtml",function(e,t){r()}),t.$watch("editCss",function(e,t){r()}),t.$watch("editJs",function(e,t){r()}),t.goHome=function(){o.go("dashboard")}}var u=i.getValue("id"),p=i.getValue("organization_id");t.editHtml="",t.editCss="",t.editJs="",t.ShowHtml=!0,t.ShowCss=!0,t.ShowJs=!0,t.socialIcons=function(){c.open({templateUrl:n.module.general.view+"socialIcons.modal.html",controller:"SocialIconCtrl",size:"lg"})},t.editorOptions1={lineWrapping:!0,lineNumbers:!0,theme:"abcdef",mode:"htmlmixed",htmlMode:!0},t.editorOptions2={lineWrapping:!0,lineNumbers:!0,theme:"abcdef",mode:"css"},t.editorOptions3={lineWrapping:!0,lineNumbers:!0,theme:"abcdef",mode:"javascript"},t.toggleHtml=function(){t.ShowHtml=!t.ShowHtml},t.toggleCss=function(){t.ShowCss=!t.ShowCss},t.toggleJs=function(){t.ShowJs=!t.ShowJs},r.User?d():r.$on("userInitialized",function(e,t){d()})}])}(),function(){"use strict";angular.module("easywebapp").controller("dashboardCtrl",["$stateParams","Auth","$scope","$rootScope","$state","Project","$config",function(e,t,o,r,n,i,s){function a(){o.User=r.User,o.addProject=function(){n.go("add-project")},o.token=t.getValue("token"),i.query().$promise.then(function(e){o.projects=e},function(){}),o.project_thumb_url=s.project_thumb_url,o.editProject=function(e){n.go("edit-project",{projectId:e})}}r.User?a():r.$on("userInitialized",function(e,t){a()})}])}(),function(){"use strict";function e(){function e(){return t}var t=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"}];this.getTec=e}angular.module("easywebapp").service("webDevTec",e)}(),function(){"use strict";function e(){function e(e){var t=this;t.relativeDate=e(t.creationDate).fromNow()}var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["moment"],t}angular.module("easywebapp").directive("acmeNavbar",e)}(),function(){"use strict";function e(e){function t(t,o,r,n){var i,s=e(o[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});o.addClass("acme-malarkey"),angular.forEach(t.extraValues,function(e){s.type(e).pause()["delete"]()}),i=t.$watch("vm.contributors",function(){angular.forEach(n.contributors,function(e){s.type(e.login).pause()["delete"]()})}),t.$on("$destroy",function(){i()})}function o(e,t){function o(){return r().then(function(){e.info("Activated Contributors View")})}function r(){return t.getContributors(10).then(function(e){return n.contributors=e,n.contributors})}var n=this;n.contributors=[],o()}var r={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:t,controller:o,controllerAs:"vm"};return o.$inject=["$log","githubContributor"],r}angular.module("easywebapp").directive("acmeMalarkey",e),e.$inject=["malarkey"]}(),function(){"use strict";function e(e,t){function o(o){function n(e){return e.data}function i(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))}return o||(o=30),t.get(r+"/contributors?per_page="+o).then(n)["catch"](i)}var r="https://api.github.com/repos/Swiip/generator-gulp-angular",n={apiHost:r,getContributors:o};return n}angular.module("easywebapp").factory("githubContributor",e),e.$inject=["$log","$http"]}(),function(){"use strict";angular.module("easywebapp").service("Auth",["$rootScope","$cookies","$cookieStore","$http","$config","$q","$log",function(e,t,o,r,n,i,s){var a=function(t){o.put("user",JSON.stringify(t)),e.User=t,r.defaults.headers.common.Token=t.token},l=function(e){if(o.get("user")){var t=JSON.parse(o.get("user"));return t[e]}return!1};this.getValue=l,this.setUser=a,this.login=function(e){var t=i.defer();return r.post(n.api+"auth",e).success(function(e){t.resolve(e),a(e)}).error(function(e){t.reject(e)}),t.promise},this.getUpdatedUser=function(){var e=i.defer();l("token",function(t){r.get(n.api+"user/",t).success(function(t){e.resolve(t),a(t)}).error(function(t){e.reject(t)})})},this.isLoggedIn=function(){return l("id")&&l("token")?!0:!1},this.getToken=function(){return l("token")?t.token:!1},this.removeUser=function(){o.remove("user"),e.User=!1},this.setUserByParams=function(e){a(e)},this.checkSubdomain=function(e){var t=i.defer();return r.get(n.api+"valid-subdomain?subdomain="+e).success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}}])}(),function(){"use strict";angular.module("easywebapp").factory("Subdomain",["$location",function(e){var t=e.host();return t.indexOf(".")<0?null:t.split(".")[0]}])}(),function(){"use strict";angular.module("easywebapp").controller("LoginCtrl",["$scope","Auth","$state","toastr","$location",function(e,t,o,r,n){var i=n.host(),s="";i.indexOf(".")>0&&(s=i.split(".")[0]),e.credentials={subdomain:s},e.signIn=function(){t.login(e.credentials).then(function(e){r.success("You are successfully login","Success"),o.go("dashboard")},function(e){e&&e.error&&r.error(e.error)})}}])}(),function(){"use strict";function e(e,t,o){function r(){i(),e(function(){s.classAnimation="rubberBand"},4e3)}function n(){o.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),s.classAnimation=""}function i(){s.awesomeThings=t.getTec(),angular.forEach(s.awesomeThings,function(e){e.rank=Math.random()})}var s=this;s.awesomeThings=[],s.classAnimation="",s.creationDate=1440412812560,s.showToastr=n,r()}angular.module("easywebapp").controller("MainController",e),e.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";angular.module("easywebapp").factory("httpRequestInterceptor",["$rootScope","$injector",function(e,t){return{request:function(e){var o=t.get("Auth");return o.isLoggedIn()&&(console.log("x"),e.headers.Token=o.getValue("token")),e}}}])}(),function(){"use strict";angular.module("easywebapp").run(["$rootScope","$config","Auth","toastr","$state","$cookies","$http","$location",function(e,t,o,r,n,i,s,a){e.$state=n,e.Auth=o,e.config=t;var l=a.host(),c="";l.indexOf(".")>0&&(c=l.split(".")[0]),o.checkSubdomain(c).then(function(e){},function(e){window.location="http://notrie.com"}),o.isLoggedIn()&&(n.go("dashboard"),s.defaults.headers.common.Token=o.getValue("token"),s.get(t.api+"user/"+o.getValue("token")).then(function(t){o.setUser(t.data),e.$broadcast("userInitialized",{message:"hello"})}));var d=window.location.href,u=d.split("?");if(u.length>1){var p=u[1].split("=");p.length>1&&"token"==p[0]&&s.get(t.api+"user/"+p[1]).then(function(e){o.setUser(e.data),window.location=u[0]})}e.$on("$stateChangeStart",function(e,t,r,i,s){var a=["login","forgotpass","reset-link"];o.isLoggedIn()||-1!=$.inArray(t.name,a)||(e.preventDefault(),n.transitionTo("login")),o.isLoggedIn()&&"login"==t.name&&(e.preventDefault(),n.transitionTo("dashboard"))}),e.getlogout=function(){o.removeUser(),n.go("login")}}])}(),function(){"use strict";function e(e,t,o){e.state("login",{url:"/",templateUrl:o.module.auth.view+"sign_in.html",controller:"LoginCtrl",controllerAs:"login"}).state("dashboard",{url:"/dashboard",templateUrl:o.module.general.view+"dashboard.html",controller:"dashboardCtrl",controllerAs:"dashboard"}).state("add-project",{url:"/project/add",templateUrl:o.module.general.view+"addProject.html",controller:"addProjectCtrl",controllerAs:"addproject"}).state("edit-project",{url:"/project/edit/:projectId",templateUrl:o.module.general.view+"editProject.html",controller:"editProjectCtrl",controllerAs:"editProject"}),t.otherwise("/")}angular.module("easywebapp").config(e),e.$inject=["$stateProvider","$urlRouterProvider","$config"]}(),function(){"use strict";angular.module("easywebapp").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment).constant("$config",{url:"http://localhost:3000/",api:"http://api.notrie.com/",preset_thumb_url:"http://api.notrie.com/preset-thumb",project_thumb_url:"http://api.notrie.com/preview/file",clients_path:"http://api1.notrie.com/clients",module:{auth:{controller:"app/auth/controllers/",view:"app/auth/views/"},general:{controller:"app/general/controller/",view:"app/general/views/"}}})}(),function(){"use strict";function e(e,t,o){e.debugEnabled(!0),t.options.timeOut=3e3,t.options.positionClass="toast-top-right",t.options.preventDuplicates=!0,t.options.progressBar=!0}angular.module("easywebapp").config(e),e.$inject=["$logProvider","toastr","$httpProvider"]}(),angular.module("easywebapp").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container"><div><acme-navbar creationdate="main.creationDate"></acme-navbar></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class="main.classAnimation"><button type="button" class="btn btn-lg btn-success" ng-click="main.showToastr()">Splendid Toastr</button></p><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class="caption"><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href="{{awesomeThing.url}}">{{ awesomeThing.url }}</a></p></div></div></div></div></div>'),e.put("app/auth/views/sign_in.html",'<div class="" id="wrap"><div class="row"><div class="col-md-6 col-md-offset-3"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><legend>Sign In</legend><div class="row"><div class="col-xs-12 col-md-12"><input type="email" name="email" value="" class="form-control input-lg" placeholder="Email Address" ng-model="credentials.email" validator="email" email-error-message="email address required."> <input type="password" name="password" value="" class="form-control input-lg" placeholder="Password" ng-model="credentials.password" validator="required" required-error-message="password required."></div><div class="col-xs-12 col-md-12"><div class="col-sm-2 pull-right"><button class="btn btn-block btn-success" type="submit" validation-submit="form1" ng-click="signIn()">Sign In</button></div></div></div></form></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>'),e.put("app/general/views/addProject.html",'<div id="wrap"><div class="row"><div class="col-sm-6"><h3>Add Project</h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><br><div class="row"><div class="col-sm-2"></div><div class="col-sm-8"><form class="form-horizontal form" method="post" accept-charset="utf-8" name="formAddProject" id="formAddProject" role="form" novalidate=""><div class="form-group"><label class="col-md-4">Title<em>*</em></label><div class="col-md-8"><input type="text" name="name" ng-model="Project.name" class="form-control" validator="required" required-error-message="Project title required."></div></div><div class="form-group"><label class="col-md-4">Folder Name:</label><div class="col-md-8"><input type="text" ng-model="Project.folder_name" class="form-control"></div></div><div class="form-group"><label class="col-md-4">Template</label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-12"><input type="radio" name="type" value="zip" ng-model="Project.type" ng-click="setPreset(-1)" validator="required" required-error-message="Template selection required."> Upload Zip</div></div></div><div class="form-group" ng-if="Project.type == \'zip\'"><label class="col-md-4"></label><div class="col-md-8"><div class="col-md-3"><button type="file" ngf-select="uploadFiles($file)" ngf-max-height="1000" ngf-max-size="64MB" required="">Select File</button> {{zipFile.name}}</div></div></div><div class="form-group"><label class="col-md-4"></label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-12"><input type="radio" name="type" value="template" ng-model="Project.type" validator="required" required-error-message="Template selection required."> Select From Presets</div></div></div><div class="form-group" ng-if="Project.type == \'template\'"><label class="col-md-4"></label><div class="col-md-8"><div class="col-md-3" ng-repeat="preset in presets" style="position:relative;" ng-class="{ \'selected\' : Project.preset_id == preset.id }"><img src="{{ preset_thumb_url + \'?name=\' + preset.thumb + \'&token=\' + token }}" ng-click="setPreset(preset.id)" style="width:100%;cursor: pointer;"></div></div></div><div class="form-group"><label class="col-md-4"></label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-12"><input type="radio" name="type" value="blank" ng-model="Project.type" validator="required" required-error-message="Template selection required."> Blank Folder</div></div></div><div class="form-group"><div class="pull-right"><button class="btn btn-success btn-md" type="submit" validation-submit="formAddProject" ng-click="saveProject()">Save</button> <button class="btn btn-default btn-md" type="button" ng-click="goBack();">Cancel</button></div></div></form></div><div class="col-sm-2"></div></div></div>'),e.put("app/general/views/dashboard.html",'<div id="wrap"><div class="row"><div class="col-sm-6"><h3><button class="btn btn-md btn-primary" ng-click="addProject()">Add Project</button></h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><div class="row"><div class="col-md-12"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><div class="col-sm-3" data-ng-repeat="project in projects"><div class="col-sm-12">{{ project.name }}</div><div class="col-sm-12"><img src="{{ project_thumb_url }}?name={{ project.thumb }}&token={{ token }}" ng-click="editProject(project.id)" class="img-responsive" style="border:2px solid #999999;cursor:pointer;"></div></div></form></div></div></div>'),e.put("app/general/views/editProject.html",'<style>\r\n    .a-monochrome{\r\n        color: #ffffff;\r\n    }\r\n    .a-monochrome-rounded-border{\r\n       background-color: #999;\r\n    }\r\n    .a-flat{\r\n        background-color: #ffffff;\r\n        color:#999;\r\n    }\r\n    .a-rounded-border0 {\r\n        border-radius : 0;\r\n    }\r\n    .a-rounded-border20 {\r\n        border-radius : 50%\r\n    }\r\n    .a-rounded-border5 {\r\n        border-radius : 10%;\r\n    }\r\n    .a-social{\r\n        padding:10px 15px;\r\n        float: left;\r\n        text-align: center;\r\n        margin-left:5px;\r\n    }\r\n    .a-plain{\r\n        background-color:#fff;\r\n    }\r\n    .facebook-official{\r\n        background-color: #000066;\r\n        color:#fff;\r\n    }\r\n    .twitter-official{\r\n        background-color: #000000;\r\n        color:#008855;\r\n    }\r\n</style><div id="wrap"><div class="row"><div class="col-sm-6"><h3>{{ Project.name }}</h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><div class="row"><button class="btn btn-primary" ng-click="socialIcons()">Social Icons</button><div class="col-sm-4" style="padding-right: 0;" ng-show="ShowHtml || ShowCss || ShowJs"><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowHtml"><h4>HTML</h4><textarea ui-codemirror="" ui-codemirror-opts="editorOptions1" class="full-width" ng-model="editHtml"></textarea></div><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowCss"><h4>CSS</h4><textarea ui-codemirror="" ui-codemirror-opts="editorOptions2" class="full-width" ng-model="editCss"></textarea></div><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowJs"><h4>JS</h4><textarea ui-codemirror="" ui-codemirror-opts="editorOptions3" class="full-width" ng-model="editJs"></textarea></div></div><div ng-class="{ \'col-sm-8\' : ShowHtml || ShowCss || ShowJs , \'col-sm-12\' : !ShowHtml && !ShowCss && !ShowJs }"><div class="col-sm-12" style="padding-left: 0;"><h3>Preview</h3><iframe name="preview" id="preview" class="full-width" style="height: 600px;border:0;border:1px solid #cccccc;border-radius:20px;"></iframe></div><div class="col-sm-12" style="padding-top: 5px;"><div class="col-sm-12"><button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowHtml , \'btn-gray\' : !ShowHtml }" ng-click="toggleHtml()">Html</button> <button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowCss , \'btn-gray\' : !ShowCss }" ng-click="toggleCss()">Css</button> <button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowJs , \'btn-gray\' : !ShowJs }" ng-click="toggleJs()">Js</button> <button class="btn btn-md btn-success pull-right" ng-click="saveFile({{ Project }})">Save</button> <button class="btn btn-md btn-primary pull-right" ng-click="goHome()" style="margin-right: 5px;">Home</button></div></div></div></div><div class="row"></div></div>'),e.put("app/general/views/socialIcons.modal.html",'<div class="modal-header"><h3 class="modal-title">Social Icon generator</h3></div><div class="modal-body"><form class="form-horizontal"><div class="col-md-12"><div class="col-md-6"><tabset justified="true"><tab heading="Set your links"><br><div class="form-group" ng-repeat="link in models.social_links"><div class="col-md-12"><input type="text" class="form-control" ng-model="link.href" placeholder="{{ link.placeholder }}"></div></div></tab><tab heading="Customize the look"><div class="form-group" style="margin-top:10px;"><label class="col-md-12">Style of icon</label><div class="col-md-12"><select class="form-control" ng-model="models.styleicon" name="style"><option value="plain" selected="selected">Silhouette</option><option value="circle">Circle</option><option value="rounded">Rounded corners</option><option value="square">Square</option></select></div></div><div class="form-group"><div class="col-md-6"><input type="radio" name="type_of_color" ng-model="models.monochrome" value="monochrome"> Monochrome</div><div class="col-md-6"><input type="radio" name="type_of_color" ng-model="models.monochrome" value="brand"> Brand color for each icon</div></div><div class="form-group"><label class="col-md-12">Color if monochrome</label><div class="col-md-12"><input type="text" ng-disabled="models.monochrome!=\'monochrome\'" name="monochrome_bgcolor" ng-model="models.monochrome_bgcolor" value="" placeholder="#ccc" class="form-control"></div></div><div class="form-group"><label class="col-md-12">Font-size</label><div class="col-md-12"><select class="form-control" ng-model="models.font_size"><option value="15px">small</option><option value="22px">medium</option><option value="50px">large</option></select></div></div><div class="form-group"><div class="col-md-6"><input type="checkbox" name="open_in_new_tab" ng-model="models.open_in_new_tab"> Open in new tab</div></div></tab></tabset></div><div class="col-md-6"><div class="form-group" style="margin-top:10px;"><div class="col-md-12"><h1>Preview</h1></div></div><div class="form-group" style="margin-top:10px;"><div class="col-md-12"><h4>Your buttons will appear just like this, wherever you place your code.</h4></div></div><div class="form-group"><div class="col-md-12"><a href="{{ link.href }}" class="a-social" ng-repeat="link in models.social_links" ng-class="{ \'a-monochrome\' : models.monochrome, \'a-flat\' : models.styleicon == \'plain\', \'a-rounded-border20\' : models.styleicon == \'circle\', \'a-rounded-border5\' : models.styleicon == \'rounded\', \'a-rounded-border0\' : models.styleicon == \'square\', \'a-monochrome-rounded-border\' : models.monochrome && ( models.styleicon == \'square\' || models.styleicon == \'circle\' || models.styleicon == \'rounded\' ), }" ng-target="{{ models.open_in_new_tab ? \'_blank\' : \'_self\' }}" ng-show="link.href" title="link.title" style="{{models.monochrome == \'monochrome\' ? \'background:\'+ models.monochrome_bgcolor : \'background:\'+link.background_color}}"><i class="fa {{ link.class }}" style="{{models.monochrome == \'monochrome\' ? \'\' : \'color:\'+link.color+\';\'}}font-size:{{models.font_size}}"></i></a></div></div></div></div></form><div class="clearfix"></div></div><div class="modal-footer"><button class="btn btn-warning" type="button" ng-click="close()">Close</button></div>')}]);