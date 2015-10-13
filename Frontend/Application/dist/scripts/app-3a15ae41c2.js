!function(){"use strict";angular.module("easywebapp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","validation","validation.rule","ui.codemirror","ngFileUpload","angular-clipboard"])}(),function(){"use strict";angular.module("easywebapp").service("Preview",["$rootScope","$http","$config","$q","$log",function(e,o,t,r,n){this.getpreview=function(e){var n=r.defer();return o.post(t.api+"preview",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise}}])}(),function(){"use strict";angular.module("easywebapp").factory("Project",["$resource","$config",function(e,o){return e(o.api+"projects/:id",{id:"@id"},{update:{method:"PUT"},query:{method:"GET",isArray:!0},show:{method:"GET"}})}])}(),function(){"use strict";angular.module("easywebapp").factory("Preset",["$resource","$config",function(e,o){return e(o.api+"admin-presets/:id",{id:"@id"},{update:{method:"PUT"},query:{method:"GET",isArray:!0}})}])}(),function(){"use strict";angular.module("easywebapp").service("File",["$rootScope","$http","$config","$q","$log",function(e,o,t,r,n){this.index=function(e){var n=r.defer();return o.post(t.api+"files/index",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise},this.saveSnapShot=function(e){var n=r.defer();return o.post(t.api+"preview/save-snapshot",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise}}])}(),function(){"use strict";angular.module("easywebapp").controller("SocialIconCtrl",["$config","$state","Auth","$scope","$rootScope","toastr","$stateParams","$modalInstance",function(e,o,t,r,n,i,l,a){r.close=function(){a.close()},r.models={},r.models.facebook_link="http://facebbook.com/",r.models.twitter_link="http://twitter.com/",r.models.styleicon="plain",r.models.monochrome="monochrome",r.models.color="#fff",r.models.bgcolor="#999",r.models.font_size="22px",r.models.open_in_new_tab=!0,r.output={};var s=".social-links a{ float: left; text-align: center; margin-left:5px; color:#999; text-decoration: none; }\n.social-links a:hover{ text-decoration: none; }";r.output.preview=s,r.success=function(){console.log("success")},r.fail=function(e){console.log(e)},r.output.changeCode=function(){var e=$(".social-links").clone(),o=$("<div>"),t=$("<div>");o.html(e),o.find("a").each(function(){$(this).hasClass("ng-hide")||($(this).removeClass("ng-scope"),$(this).removeAttr("ng-attr-target ng-repeat ng-show"),$(this).find("i").removeAttr("ng-class"),t.append($(this)),t.append("\n"))}),r.output.preview=s+"\n"+t.html()},r.models.social_links=[{name:"facebook",placeholder:"Enter faceboook Url",background_color:"#3B5998",color:"#FFFFFF",title:"Follow us on Facebook",href:"http://facebook.com/notrie",plain:"flaticon-facebook31",rounded:"flaticon-facebook29",circle:"flaticon-facebok",square:"flaticon-facebook53"},{name:"twitter",placeholder:"Enter twitter Url",background_color:"#55ACEE",color:"#FFFFFF",title:"Follow us on Twitter",href:"http://twitter.com/notrie",plain:"flaticon-twitter1",rounded:"flaticon-twitter47",circle:"flaticon-logo22",square:"flaticon-twitter25"},{name:"pinterest",placeholder:"Enter Pinterest Url",background_color:"#C8232C",color:"#FFFFFF",title:"Follow us on Pinterest",href:"",plain:"flaticon-pinterest19",rounded:"flaticon-pinterest12",circle:"flaticon-socialnetwork159",square:"flaticon-pinterest24"},{name:"google",placeholder:"Enter Google+ Url",background_color:"#DD4B39",color:"#FFFFFF",title:"Follow us on Google+",href:"",plain:"flaticon-google116",rounded:"flaticon-google2",circle:"flaticon-google110",square:"flaticon-google111"},{name:"instagram",placeholder:"Enter Instagram Url",background_color:"#3F729B",color:"#FFFFFF",title:"Follow us on Instagram",href:"",plain:"flaticon-socialnetwork302",rounded:"flaticon-socialmedia11",circle:"flaticon-instagram13",square:"flaticon-socialnetwork301"},{name:"linkedin",placeholder:"Enter Linkedin Url",background_color:"#0E76A8",color:"#FFFFFF",title:"Follow us on Linkedin",href:"",plain:"flaticon-socialnetwork168",rounded:"flaticon-linkedin24",circle:"flaticon-linkedin21",square:"flaticon-linkedin18"},{name:"Flickr",placeholder:"Enter Flickr Url",background_color:"#0063DC",color:"#FFFFFF",title:"Follow us on Flickr",href:"",plain:"flaticon-flickr5",rounded:"flaticon-flickr19",circle:"flaticon-flickr7",square:"flaticon-socialnetwork287"},{name:"yelp",placeholder:"Enter Yelp Url",background_color:"#C41200",color:"#FFFFFF",title:"Look us up on Yelp",href:"",plain:"flaticon-yelp",rounded:"flaticon-yelp6",circle:"flaticon-yelp5",square:"flaticon-yelp7"},{name:"vimeo",placeholder:"Enter Vimeo Url",background_color:"#44BBFF",color:"#FFFFFF",title:"Follow us on Vimeo",href:"",plain:"flaticon-social140",rounded:"flaticon-vimeo1",circle:"flaticon-vimeo3",square:"flaticon-socialnetwork288"},{name:"youtube",placeholder:"Enter YouTube Url",background_color:"#C4302B",color:"#FFFFFF",title:"Follow us on Youtube",href:"",plain:"flaticon-youtube28",rounded:"flaticon-video193",circle:"flaticon-youtube31",square:"flaticon-youtube32"},{name:"tumblr",placeholder:"Enter Tumblr Url",background_color:"#34526F",color:"#FFFFFF",title:"Come visit our blog",href:"",plain:"flaticon-logotype1",rounded:"flaticon-tumblr22",circle:"flaticon-tumblr19",square:"flaticon-socialnetwork291"},{name:"wordpress",placeholder:"Enter Wordpress Blog Url",background_color:"#1E8CBE",color:"#FFFFFF",title:"Come visit our blog",href:"",plain:"flaticon-logotype48",rounded:"flaticon-wordpress4",circle:"flaticon-wordpress15",square:"flaticon-socialnetwork323"},{name:"blog",placeholder:"Enter Blog Feed Url",background_color:"#C8232C",color:"#FFFFFF",title:"Subscribe to our blog",href:"",plain:"flaticon-web-feed1",rounded:"flaticon-rss45",circle:"flaticon-rss23",square:"flaticon-rss51"},{name:"mail",placeholder:"mailto:your-email@domain.com",background_color:"#C8232C",color:"#FFFFFF",title:"Email us",href:"",plain:"flaticon-dark4",rounded:"flaticon-email131",circle:"flaticon-dark5",square:"flaticon-dark6"}]}])}(),function(){"use strict";angular.module("easywebapp").controller("addProjectCtrl",["$stateParams","$scope","$state","$rootScope","Preset","$config","Auth","Project","toastr","Upload",function(e,o,t,r,n,i,l,a,s,c){function d(){o.Project=new a,o.presets=[],o.preset_thumb_url=i.preset_thumb_url,o.token=l.getValue("token"),o.Project.preset_id=-1,o.Project.user_id=l.getValue("id"),o.Project.organization_id=l.getValue("organization_id"),o.zipFile=null,o.uploadFiles=function(e){if(e){if(console.log(e.name.split(".")[1]),"zip"!=e.name.split(".")[1]&&"ZIP"!=e.name.split(".")[1])return s.error("Only zip files allowed"),!1;o.zipFile=e}},n.query().$promise.then(function(e){o.presets=e},function(){}),o.setPreset=function(e){o.Project.preset_id=e},o.saveProject=function(){var e=!1;"zip"==o.Project.type?o.zipFile?e=!0:s.error("Zip file is required"):"template"==o.Project.type?(o.zipFile=null,o.Project.preset_id>0?e=!0:s.error("Select Preset")):"blank"==o.Project.type&&(o.zipFile=null,e=!0),e&&(o.zipFile?c.upload({url:i.api+"projects",method:"POST",async:!1,headers:{token:l.getValue("token")},fields:o.Project.toJSON(),file:o.zipFile,fileFormDataName:"zipFile"}).then(function(e){s.success("Project created successfully!","Success"),t.go("edit-project",{projectId:e.id})},function(e){}):o.Project.$save(function(e){s.success("Project created successfully!","Success"),t.go("edit-project",{projectId:e.id})},function(e){e.data&&e.data.error&&s.error(e.data.error)}))},o.goBack=function(){t.transitionTo("dashboard")}}r.User?d():r.$on("userInitialized",function(e,o){d()})}]),angular.module("easywebapp").controller("editProjectCtrl",["$stateParams","$scope","$state","$rootScope","$config","Auth","Project","toastr","File","$modal",function(e,o,t,r,n,i,l,a,s,c){function d(){function r(){var e=document.getElementById("preview");e=e.contentWindow?e.contentWindow:e.contentDocument.document?e.contentDocument.document:e.contentDocument,e.document.open(),e.document.write('<style class="text/css">'+o.editCss+"</style>"+o.editHtml+'<script type="text/javascript">'+o.editJs+"</script>"),e.document.close()}function c(e){s.index({mode:"editFile",path:e.location+"index.html"}).then(function(t){var i=$("<div>");i.html(t),i.find("*").each(function(){var o=$(this).attr("href"),t=$(this).attr("src");$(this).is("a")?"#"!=$(this).attr("href")&&"http"!=$(this).attr("href").substr(0,4)&&$(this).attr("href","#"):o&&"#"!=o&&"//"!=o.substr(0,2)&&"http"!=o.substr(0,4)?$(this).attr("href",n.clients_path+"/"+p+"/"+u+"/"+e.location+o):t&&"#"!=t&&"//"!=t.substr(0,2)&&"http"!=t.substr(0,4)&&$(this).attr("src",n.clients_path+"/"+p+"/"+u+"/"+e.location+t)}),o.editHtml=i.html(),r()},function(){})}o.saveFile=function(){'<style class="text/css">'+o.editCss+"</style>"+o.editHtml+'<script type="text/javascript">'+o.editJs+"</script>";s.index({mode:"saveFile",path:o.Project.location+"index.html",text:o.editHtml}).then(function(e){},function(){}),s.saveSnapShot({id:o.Project.id}).then(function(){a.success("Project saved successfully")},function(){a.error("Unable to save file")})},e.projectId||t.go("dashboard"),l.show({id:e.projectId}).$promise.then(function(e){o.Project=e,c(o.Project)},function(o){t.go("dashboard"),a.error("unable to load project"+e.projectId)}),o.token=i.getValue("token"),o.$watch("editHtml",function(e,o){r()}),o.$watch("editCss",function(e,o){r()}),o.$watch("editJs",function(e,o){r()}),o.goHome=function(){t.go("dashboard")}}var u=i.getValue("id"),p=i.getValue("organization_id");o.editHtml="",o.editCss="",o.editJs="",o.ShowHtml=!0,o.ShowCss=!0,o.ShowJs=!0,o.socialIcons=function(){c.open({templateUrl:n.module.general.view+"socialIcons.modal.html",controller:"SocialIconCtrl",size:"lg"})},o.editorOptions1={lineWrapping:!0,lineNumbers:!0,theme:"abcdef",mode:"htmlmixed",htmlMode:!0},o.editorOptions2={lineWrapping:!0,lineNumbers:!0,theme:"abcdef",mode:"css"},o.editorOptions3={lineWrapping:!0,lineNumbers:!0,theme:"abcdef",mode:"javascript"},o.toggleHtml=function(){o.ShowHtml=!o.ShowHtml},o.toggleCss=function(){o.ShowCss=!o.ShowCss},o.toggleJs=function(){o.ShowJs=!o.ShowJs},r.User?d():r.$on("userInitialized",function(e,o){d()})}])}(),function(){"use strict";angular.module("easywebapp").controller("dashboardCtrl",["$stateParams","Auth","$scope","$rootScope","$state","Project","$config",function(e,o,t,r,n,i,l){function a(){t.User=r.User,t.addProject=function(){n.go("add-project")},t.token=o.getValue("token"),i.query().$promise.then(function(e){t.projects=e},function(){}),t.project_thumb_url=l.project_thumb_url,t.editProject=function(e){n.go("edit-project",{projectId:e})}}r.User?a():r.$on("userInitialized",function(e,o){a()})}])}(),function(){"use strict";function e(){function e(){return o}var o=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"}];this.getTec=e}angular.module("easywebapp").service("webDevTec",e)}(),function(){"use strict";function e(){function e(e){var o=this;o.relativeDate=e(o.creationDate).fromNow()}var o={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["moment"],o}angular.module("easywebapp").directive("acmeNavbar",e)}(),function(){"use strict";function e(e){function o(o,t,r,n){var i,l=e(t[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});t.addClass("acme-malarkey"),angular.forEach(o.extraValues,function(e){l.type(e).pause()["delete"]()}),i=o.$watch("vm.contributors",function(){angular.forEach(n.contributors,function(e){l.type(e.login).pause()["delete"]()})}),o.$on("$destroy",function(){i()})}function t(e,o){function t(){return r().then(function(){e.info("Activated Contributors View")})}function r(){return o.getContributors(10).then(function(e){return n.contributors=e,n.contributors})}var n=this;n.contributors=[],t()}var r={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:o,controller:t,controllerAs:"vm"};return t.$inject=["$log","githubContributor"],r}angular.module("easywebapp").directive("acmeMalarkey",e),e.$inject=["malarkey"]}(),function(){"use strict";function e(e,o){function t(t){function n(e){return e.data}function i(o){e.error("XHR Failed for getContributors.\n"+angular.toJson(o.data,!0))}return t||(t=30),o.get(r+"/contributors?per_page="+t).then(n)["catch"](i)}var r="https://api.github.com/repos/Swiip/generator-gulp-angular",n={apiHost:r,getContributors:t};return n}angular.module("easywebapp").factory("githubContributor",e),e.$inject=["$log","$http"]}(),function(){"use strict";angular.module("easywebapp").service("Auth",["$rootScope","$cookies","$cookieStore","$http","$config","$q","$log",function(e,o,t,r,n,i,l){var a=function(o){t.put("user",JSON.stringify(o)),e.User=o,r.defaults.headers.common.Token=o.token},s=function(e){if(t.get("user")){var o=JSON.parse(t.get("user"));return o[e]}return!1};this.getValue=s,this.setUser=a,this.login=function(e){var o=i.defer();return r.post(n.api+"auth",e).success(function(e){o.resolve(e),a(e)}).error(function(e){o.reject(e)}),o.promise},this.getUpdatedUser=function(){var e=i.defer();s("token",function(o){r.get(n.api+"user/",o).success(function(o){e.resolve(o),a(o)}).error(function(o){e.reject(o)})})},this.isLoggedIn=function(){return s("id")&&s("token")?!0:!1},this.getToken=function(){return s("token")?o.token:!1},this.removeUser=function(){t.remove("user"),e.User=!1},this.setUserByParams=function(e){a(e)},this.checkSubdomain=function(e){var o=i.defer();return r.get(n.api+"valid-subdomain?subdomain="+e).success(function(e){o.resolve(e)}).error(function(e){o.reject(e)}),o.promise}}])}(),function(){"use strict";angular.module("easywebapp").controller("LoginCtrl",["$scope","Auth","$state","toastr","$location",function(e,o,t,r,n){var i=n.host(),l="";i.indexOf(".")>0&&(l=i.split(".")[0]),e.credentials={subdomain:l},e.signIn=function(){o.login(e.credentials).then(function(e){r.success("You are successfully login","Success"),t.go("dashboard")},function(e){e&&e.error&&r.error(e.error)})}}])}(),function(){"use strict";angular.module("easywebapp").factory("Subdomain",["$location",function(e){var o=e.host();return o.indexOf(".")<0?null:o.split(".")[0]}])}(),function(){"use strict";function e(e,o,t){function r(){i(),e(function(){l.classAnimation="rubberBand"},4e3)}function n(){t.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),l.classAnimation=""}function i(){l.awesomeThings=o.getTec(),angular.forEach(l.awesomeThings,function(e){e.rank=Math.random()})}var l=this;l.awesomeThings=[],l.classAnimation="",l.creationDate=1440412812560,l.showToastr=n,r()}angular.module("easywebapp").controller("MainController",e),e.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";angular.module("easywebapp").factory("httpRequestInterceptor",["$rootScope","$injector",function(e,o){return{request:function(e){var t=o.get("Auth");return t.isLoggedIn()&&(console.log("x"),e.headers.Token=t.getValue("token")),e}}}])}(),function(){"use strict";angular.module("easywebapp").run(["$rootScope","$config","Auth","toastr","$state","$cookies","$http","$location",function(e,o,t,r,n,i,l,a){e.$state=n,e.Auth=t,e.config=o;var s=a.host(),c="";s.indexOf(".")>0&&(c=s.split(".")[0]),t.checkSubdomain(c).then(function(e){},function(e){window.location="http://notrie.com"}),t.isLoggedIn()&&(n.go("dashboard"),l.defaults.headers.common.Token=t.getValue("token"),l.get(o.api+"user/"+t.getValue("token")).then(function(o){t.setUser(o.data),e.$broadcast("userInitialized",{message:"hello"})}));var d=window.location.href,u=d.split("?");if(u.length>1){var p=u[1].split("=");p.length>1&&"token"==p[0]&&l.get(o.api+"user/"+p[1]).then(function(e){t.setUser(e.data),window.location=u[0]})}e.$on("$stateChangeStart",function(e,o,r,i,l){var a=["login","forgotpass","reset-link"];t.isLoggedIn()||-1!=$.inArray(o.name,a)||(e.preventDefault(),n.transitionTo("login")),t.isLoggedIn()&&"login"==o.name&&(e.preventDefault(),n.transitionTo("dashboard"))}),e.getlogout=function(){t.removeUser(),n.go("login")}}])}(),function(){"use strict";function e(e,o,t){e.state("login",{url:"/",templateUrl:t.module.auth.view+"sign_in.html",controller:"LoginCtrl",controllerAs:"login"}).state("dashboard",{url:"/dashboard",templateUrl:t.module.general.view+"dashboard.html",controller:"dashboardCtrl",controllerAs:"dashboard"}).state("add-project",{url:"/project/add",templateUrl:t.module.general.view+"addProject.html",controller:"addProjectCtrl",controllerAs:"addproject"}).state("edit-project",{url:"/project/edit/:projectId",templateUrl:t.module.general.view+"editProject.html",controller:"editProjectCtrl",controllerAs:"editProject"}),o.otherwise("/")}angular.module("easywebapp").config(e),e.$inject=["$stateProvider","$urlRouterProvider","$config"]}(),function(){"use strict";angular.module("easywebapp").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment).constant("$config",{url:"http://localhost:3000/",api:"http://api.notrie.com/",preset_thumb_url:"http://api.notrie.com/preset-thumb",project_thumb_url:"http://api.notrie.com/preview/file",clients_path:"http://api1.notrie.com/clients",module:{auth:{controller:"app/auth/controllers/",view:"app/auth/views/"},general:{controller:"app/general/controller/",view:"app/general/views/"}}})}(),function(){"use strict";function e(e,o){e.debugEnabled(!0),o.options.timeOut=3e3,o.options.positionClass="toast-top-right",o.options.preventDuplicates=!0,o.options.progressBar=!0}angular.module("easywebapp").config(e),e.$inject=["$logProvider","toastr"]}(),angular.module("easywebapp").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container"><div><acme-navbar creationdate="main.creationDate"></acme-navbar></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class="main.classAnimation"><button type="button" class="btn btn-lg btn-success" ng-click="main.showToastr()">Splendid Toastr</button></p><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class="caption"><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href="{{awesomeThing.url}}">{{ awesomeThing.url }}</a></p></div></div></div></div></div>'),e.put("app/auth/views/sign_in.html",'<div class="" id="wrap"><div class="row"><div class="col-md-6 col-md-offset-3"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><legend>Sign In</legend><div class="row"><div class="col-xs-12 col-md-12"><input type="email" name="email" value="" class="form-control input-lg" placeholder="Email Address" ng-model="credentials.email" validator="email" email-error-message="email address required."> <input type="password" name="password" value="" class="form-control input-lg" placeholder="Password" ng-model="credentials.password" validator="required" required-error-message="password required."></div><div class="col-xs-12 col-md-12"><div class="col-sm-2 pull-right"><button class="btn btn-block btn-success" type="submit" validation-submit="form1" ng-click="signIn()">Sign In</button></div></div></div></form></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>'),e.put("app/general/views/addProject.html",'<div id="wrap"><div class="row"><div class="col-sm-6"><h3>Add Project</h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><br><div class="row"><div class="col-sm-2"></div><div class="col-sm-8"><form class="form-horizontal form" method="post" accept-charset="utf-8" name="formAddProject" id="formAddProject" role="form" novalidate=""><div class="form-group"><label class="col-md-4">Title<em>*</em></label><div class="col-md-8"><input type="text" name="name" ng-model="Project.name" class="form-control" validator="required" required-error-message="Project title required."></div></div><div class="form-group"><label class="col-md-4">Folder Name:</label><div class="col-md-8"><input type="text" ng-model="Project.folder_name" class="form-control"></div></div><div class="form-group"><label class="col-md-4">Template</label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-12"><input type="radio" name="type" value="zip" ng-model="Project.type" ng-click="setPreset(-1)" validator="required" required-error-message="Template selection required."> Upload Zip</div></div></div><div class="form-group" ng-if="Project.type == \'zip\'"><label class="col-md-4"></label><div class="col-md-8"><div class="col-md-3"><button type="file" ngf-select="uploadFiles($file)" ngf-max-height="1000" ngf-max-size="64MB" required="">Select File</button> {{zipFile.name}}</div></div></div><div class="form-group"><label class="col-md-4"></label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-12"><input type="radio" name="type" value="template" ng-model="Project.type" validator="required" required-error-message="Template selection required."> Select From Presets</div></div></div><div class="form-group" ng-if="Project.type == \'template\'"><label class="col-md-4"></label><div class="col-md-8"><div class="col-md-3" ng-repeat="preset in presets" style="position:relative;" ng-class="{ \'selected\' : Project.preset_id == preset.id }"><img src="{{ preset_thumb_url + \'?name=\' + preset.thumb + \'&token=\' + token }}" ng-click="setPreset(preset.id)" style="width:100%;cursor: pointer;"></div></div></div><div class="form-group"><label class="col-md-4"></label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-12"><input type="radio" name="type" value="blank" ng-model="Project.type" validator="required" required-error-message="Template selection required."> Blank Folder</div></div></div><div class="form-group"><div class="pull-right"><button class="btn btn-success btn-md" type="submit" validation-submit="formAddProject" ng-click="saveProject()">Save</button> <button class="btn btn-default btn-md" type="button" ng-click="goBack();">Cancel</button></div></div></form></div><div class="col-sm-2"></div></div></div>'),e.put("app/general/views/dashboard.html",'<div id="wrap"><div class="row"><div class="col-sm-6"><h3><button class="btn btn-md btn-primary" ng-click="addProject()">Add Project</button></h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><div class="row"><div class="col-md-12"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><div class="col-sm-3" data-ng-repeat="project in projects"><div class="col-sm-12">{{ project.name }}</div><div class="col-sm-12"><img src="{{ project_thumb_url }}?name={{ project.thumb }}&token={{ token }}" ng-click="editProject(project.id)" class="img-responsive" style="border:2px solid #999999;cursor:pointer;"></div></div></form></div></div></div>'),e.put("app/general/views/editProject.html",'<style>\r\n    .social-links a{\r\n        float: left;\r\n        text-align: center;\r\n        margin-left:5px;\r\n        color:#999;\r\n        text-decoration: none;\r\n    }\r\n    .social-links a:hover{\r\n        text-decoration: none;\r\n    }\r\n</style><div id="wrap"><div class="row"><div class="col-sm-6"><h3>{{ Project.name }}</h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><div class="row"><button class="btn btn-primary" ng-click="socialIcons()">Social Icons</button><div class="col-sm-4" style="padding-right: 0;" ng-show="ShowHtml || ShowCss || ShowJs"><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowHtml"><h4>HTML</h4><textarea ui-codemirror="" ui-codemirror-opts="editorOptions1" class="full-width" ng-model="editHtml"></textarea></div><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowCss"><h4>CSS</h4><textarea ui-codemirror="" ui-codemirror-opts="editorOptions2" class="full-width" ng-model="editCss"></textarea></div><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowJs"><h4>JS</h4><textarea ui-codemirror="" ui-codemirror-opts="editorOptions3" class="full-width" ng-model="editJs"></textarea></div></div><div ng-class="{ \'col-sm-8\' : ShowHtml || ShowCss || ShowJs , \'col-sm-12\' : !ShowHtml && !ShowCss && !ShowJs }"><div class="col-sm-12" style="padding-left: 0;"><h3>Preview</h3><iframe name="preview" id="preview" class="full-width" style="height: 600px;border:0;border:1px solid #cccccc;border-radius:20px;"></iframe></div><div class="col-sm-12" style="padding-top: 5px;"><div class="col-sm-12"><button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowHtml , \'btn-gray\' : !ShowHtml }" ng-click="toggleHtml()">Html</button> <button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowCss , \'btn-gray\' : !ShowCss }" ng-click="toggleCss()">Css</button> <button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowJs , \'btn-gray\' : !ShowJs }" ng-click="toggleJs()">Js</button> <button class="btn btn-md btn-success pull-right" ng-click="saveFile({{ Project }})">Save</button> <button class="btn btn-md btn-primary pull-right" ng-click="goHome()" style="margin-right: 5px;">Home</button></div></div></div></div><div class="row"></div></div>'),e.put("app/general/views/socialIcons.modal.html",'<div class="modal-header"><button type="button" class="close" ng-click="close()"><span aria-hidden="true">&times;</span></button><h3 class="modal-title">Social Icon generator</h3></div><div class="modal-body"><form class="form-horizontal"><div class="col-md-12"><div class="col-md-6"><tabset justified="true"><tab heading="Set your links"><br><div class="form-group" ng-repeat="link in models.social_links"><div class="col-md-12"><input type="text" class="form-control" ng-model="link.href" placeholder="{{ link.placeholder }}" ng-blur="output.changeCode()"></div></div></tab><tab heading="Customize the look"><div class="form-group" style="margin-top:10px;"><label class="col-md-12">Style of icon</label><div class="col-md-12"><select class="form-control" ng-model="models.styleicon" name="style" ng-blur="output.changeCode()"><option value="plain" selected="selected">Silhouette</option><option value="circle">Circle</option><option value="rounded">Rounded corners</option><option value="square">Square</option></select></div></div><div class="form-group"><div class="col-md-6"><input type="radio" name="type_of_color" ng-model="models.monochrome" value="monochrome" ng-blur="output.changeCode()"> Monochrome</div><div class="col-md-6"><input type="radio" name="type_of_color" ng-model="models.monochrome" value="brand" ng-blur="output.changeCode()"> Brand color for each icon</div></div><div class="form-group"><label class="col-md-12">Color if monochrome</label><div class="col-md-12"><input type="text" ng-disabled="models.monochrome!=\'monochrome\'" name="monochrome_bgcolor" ng-model="models.monochrome_bgcolor" value="" placeholder="#ccc" class="form-control" ng-blur="output.changeCode()"></div></div><div class="form-group"><label class="col-md-12">Font-size</label><div class="col-md-12"><select class="form-control" ng-model="models.font_size" ng-blur="output.changeCode()"><option value="15px">small</option><option value="22px">medium</option><option value="50px">large</option></select></div></div><div class="form-group"><div class="col-md-6"><input type="checkbox" name="open_in_new_tab" ng-model="models.open_in_new_tab" ng-click="output.changeCode()"> Open in new tab</div></div></tab></tabset></div><div class="col-md-6"><div class="form-group" style="margin-top:10px;"><div class="col-md-12"><h1>Preview</h1></div></div><div class="form-group" style="margin-top:10px;"><div class="col-md-12"><h4>Your buttons will appear just like this, wherever you place your code.</h4></div></div><div class="form-group"><div class="col-md-12 social-links"><a href="{{ link.href }}" class="glyph a-social" ng-repeat="link in models.social_links" ng-attr-target="{{ models.open_in_new_tab ? \'_blank\' : \'_self\' }}" ng-show="link.href" title="{{ link.title }}"><i class="glyph-icon" ng-class="{ \'{{link[\'plain\']}}\' : models.styleicon == \'plain\', \'{{link[\'circle\']}}\' : models.styleicon == \'circle\', \'{{link[\'rounded\']}}\' : models.styleicon == \'rounded\', \'{{link[\'square\']}}\' : models.styleicon == \'square\', }" style="{{ models.monochrome == \'monochrome\' ? ( models.styleicon == \'plain\' ? \'color:#999;\' : \'color:\' + ( models.monochrome_bgcolor ? models.monochrome_bgcolor : \'#999\' ) + \';\' ) : \'color:\' + link.background_color + \';\' }}font-size:{{models.font_size}}"></i></a></div></div><div class="form-group"><div class="col-sm-12"><button clipboard="" text="output.preview" on-copied="success()" on-error="fail(err)" class="btn btn-success btn-md">Copy to Clipboard</button></div></div><div class="form-group"><div class="col-sm-12"><pre>\r\n<a href="#">flaticon/flaticon.css</a>\r\n{{ output.preview }}</pre></div></div></div></div></form><div class="clearfix"></div></div><div class="modal-footer"><button class="btn btn-warning" type="button" ng-click="close()">Close</button></div>')}]);