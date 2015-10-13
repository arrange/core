!function(){"use strict";angular.module("easywebapp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","validation","validation.rule","ui.codemirror","ngFileUpload","angular-clipboard","ui.bootstrap-slider"])}(),function(){"use strict";angular.module("easywebapp").service("Preview",["$rootScope","$http","$config","$q","$log",function(e,t,o,i,n){this.getpreview=function(e){var n=i.defer();return t.post(o.api+"preview",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise}}])}(),function(){"use strict";angular.module("easywebapp").factory("Project",["$resource","$config",function(e,t){return e(t.api+"projects/:id",{id:"@id"},{update:{method:"PUT"},query:{method:"GET",isArray:!0},show:{method:"GET"}})}])}(),function(){"use strict";angular.module("easywebapp").factory("Preset",["$resource","$config",function(e,t){return e(t.api+"admin-presets/:id",{id:"@id"},{update:{method:"PUT"},query:{method:"GET",isArray:!0}})}])}(),function(){"use strict";angular.module("easywebapp").service("File",["$rootScope","$http","$config","$q","$log",function(e,t,o,i,n){this.index=function(e){var n=i.defer();return t.post(o.api+"files/index",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise},this.saveSnapShot=function(e){var n=i.defer();return t.post(o.api+"preview/save-snapshot",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise},this.getFiles=function(e){var n=i.defer();return t.post(o.api+"files/files",e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise}}])}(),function(){"use strict";angular.module("easywebapp").controller("SocialIconCtrl",["$config","$state","Auth","$scope","$rootScope","toastr","$stateParams","$modalInstance",function(e,t,o,i,n,l,r,s){i.close=function(){s.close()},i.sliders={},i.sliders.sliderValue=50,i.testOptions={min:0,max:100,step:1},i.models={},i.models.facebook_link="http://facebbook.com/",i.models.twitter_link="http://twitter.com/",i.models.styleicon="plain",i.models.monochrome="monochrome",i.models.color="#fff",i.models.bgcolor="#999",i.models.open_in_new_tab=!0,i.output={};var a=".social-links a{ float: left; text-align: center; margin-left:5px; color:#999; text-decoration: none; }\n.social-links a:hover{ text-decoration: none; }";i.output.preview=a+'\n<a href="http://facebook.com/notrie" class="glyph a-social" title="Follow us on Facebook" target="_blank" style="">\n   <i class="glyph-icon  flaticon-facebook31" style="color:#999;font-size:50px;"></i>\n</a>\n<a href="http://twitter.com/notrie" class="glyph a-social" title="Follow us on Twitter" target="_blank" style="">\n   <i class="glyph-icon  flaticon-twitter1" style="color:#999;font-size:50px;"></i>\n</a>',i.success=function(){console.log("success")},i.fail=function(e){console.log(e)};var c=function(){var e=$(".social-links").clone(),t=$("<div>"),o=$("<div>");t.html(e),t.find("a").each(function(){$(this).hasClass("ng-hide")||($(this).removeClass("ng-scope"),$(this).removeAttr("ng-attr-target ng-repeat ng-show"),$(this).find("i").removeAttr("ng-class"),o.append($(this)),o.append("\n"))}),i.output.preview=a+"\n"+o.html()};i.output.changeCode=c,i.output.avail=!1,i.availFuncForTab2=function(){i.output.avail||(i.$watch(function(e,t){i.output.changeCode()}),i.output.avail=!0)},i.models.social_links=[{name:"facebook",placeholder:"Enter faceboook Url",background_color:"#3B5998",color:"#FFFFFF",title:"Follow us on Facebook",href:"http://facebook.com/notrie",plain:"flaticon-facebook31",rounded:"flaticon-facebook29",circle:"flaticon-facebok",square:"flaticon-facebook53"},{name:"twitter",placeholder:"Enter twitter Url",background_color:"#55ACEE",color:"#FFFFFF",title:"Follow us on Twitter",href:"http://twitter.com/notrie",plain:"flaticon-twitter1",rounded:"flaticon-twitter47",circle:"flaticon-logo22",square:"flaticon-twitter25"},{name:"pinterest",placeholder:"Enter Pinterest Url",background_color:"#C8232C",color:"#FFFFFF",title:"Follow us on Pinterest",href:"",plain:"flaticon-pinterest19",rounded:"flaticon-pinterest12",circle:"flaticon-socialnetwork159",square:"flaticon-pinterest24"},{name:"google",placeholder:"Enter Google+ Url",background_color:"#DD4B39",color:"#FFFFFF",title:"Follow us on Google+",href:"",plain:"flaticon-google116",rounded:"flaticon-google2",circle:"flaticon-google110",square:"flaticon-google111"},{name:"instagram",placeholder:"Enter Instagram Url",background_color:"#3F729B",color:"#FFFFFF",title:"Follow us on Instagram",href:"",plain:"flaticon-socialnetwork302",rounded:"flaticon-socialmedia11",circle:"flaticon-instagram13",square:"flaticon-socialnetwork301"},{name:"linkedin",placeholder:"Enter Linkedin Url",background_color:"#0E76A8",color:"#FFFFFF",title:"Follow us on Linkedin",href:"",plain:"flaticon-socialnetwork168",rounded:"flaticon-linkedin24",circle:"flaticon-linkedin21",square:"flaticon-linkedin18"},{name:"Flickr",placeholder:"Enter Flickr Url",background_color:"#0063DC",color:"#FFFFFF",title:"Follow us on Flickr",href:"",plain:"flaticon-flickr5",rounded:"flaticon-flickr19",circle:"flaticon-flickr7",square:"flaticon-socialnetwork287"},{name:"yelp",placeholder:"Enter Yelp Url",background_color:"#C41200",color:"#FFFFFF",title:"Look us up on Yelp",href:"",plain:"flaticon-yelp",rounded:"flaticon-yelp6",circle:"flaticon-yelp5",square:"flaticon-yelp7"},{name:"vimeo",placeholder:"Enter Vimeo Url",background_color:"#44BBFF",color:"#FFFFFF",title:"Follow us on Vimeo",href:"",plain:"flaticon-social140",rounded:"flaticon-vimeo1",circle:"flaticon-vimeo3",square:"flaticon-socialnetwork288"},{name:"youtube",placeholder:"Enter YouTube Url",background_color:"#C4302B",color:"#FFFFFF",title:"Follow us on Youtube",href:"",plain:"flaticon-youtube28",rounded:"flaticon-video193",circle:"flaticon-youtube31",square:"flaticon-youtube32"},{name:"tumblr",placeholder:"Enter Tumblr Url",background_color:"#34526F",color:"#FFFFFF",title:"Come visit our blog",href:"",plain:"flaticon-logotype1",rounded:"flaticon-tumblr22",circle:"flaticon-tumblr19",square:"flaticon-socialnetwork291"},{name:"wordpress",placeholder:"Enter Wordpress Blog Url",background_color:"#1E8CBE",color:"#FFFFFF",title:"Come visit our blog",href:"",plain:"flaticon-logotype48",rounded:"flaticon-wordpress4",circle:"flaticon-wordpress15",square:"flaticon-socialnetwork323"},{name:"blog",placeholder:"Enter Blog Feed Url",background_color:"#C8232C",color:"#FFFFFF",title:"Subscribe to our blog",href:"",plain:"flaticon-web-feed1",rounded:"flaticon-rss45",circle:"flaticon-rss23",square:"flaticon-rss51"},{name:"mail",placeholder:"mailto:your-email@domain.com",background_color:"#C8232C",color:"#FFFFFF",title:"Email us",href:"",plain:"flaticon-dark4",rounded:"flaticon-email131",circle:"flaticon-dark5",square:"flaticon-dark6"}]}])}(),function(){"use strict";angular.module("easywebapp").controller("addProjectCtrl",["$stateParams","$scope","$state","$rootScope","Preset","$config","Auth","Project","toastr","Upload",function(e,t,o,i,n,l,r,s,a,c){function d(){t.Project=new s,t.presets=[],t.preset_thumb_url=l.preset_thumb_url,t.token=r.getValue("token"),t.Project.preset_id=-1,t.Project.user_id=r.getValue("id"),t.Project.organization_id=r.getValue("organization_id"),t.zipFile=null,t.uploadFiles=function(e){if(e){if("zip"!=e.name.split(".")[1]&&"ZIP"!=e.name.split(".")[1])return a.error("Only zip files allowed"),!1;t.zipFile=e}},n.query().$promise.then(function(e){t.presets=e},function(){}),t.setPreset=function(e){t.Project.preset_id=e},t.saveProject=function(){var e=!1;"zip"==t.Project.type?t.zipFile?e=!0:a.error("Zip file is required"):"template"==t.Project.type?(t.zipFile=null,t.Project.preset_id>0?e=!0:a.error("Select Preset")):"blank"==t.Project.type&&(t.zipFile=null,e=!0),e&&(t.zipFile?c.upload({url:l.api+"projects",method:"POST",async:!1,headers:{token:r.getValue("token")},fields:t.Project.toJSON(),file:t.zipFile,fileFormDataName:"zipFile"}).then(function(e){a.success("Project created successfully!","Success"),o.go("edit-project",{projectId:e.id})},function(e){}):t.Project.$save(function(e){a.success("Project created successfully!","Success"),o.go("edit-project",{projectId:e.id})},function(e){e.data&&e.data.error&&a.error(e.data.error)}))},t.goBack=function(){o.transitionTo("dashboard")}}i.User?d():i.$on("userInitialized",function(e,t){d()})}]),angular.module("easywebapp").controller("editProjectCtrl",["$stateParams","$scope","$state","$rootScope","$config","Auth","Project","toastr","File","$modal",function(e,t,o,i,n,l,r,s,a,c){function d(){var e=document.getElementById("preview");e=e.contentWindow?e.contentWindow:e.contentDocument.document?e.contentDocument.document:e.contentDocument,e.document.open(),e.document.write(t.editHtml),e.document.close()}function u(){function i(e){a.index({mode:"editFile",path:e.location+"index.html"}).then(function(o){var i=$("<div>");i.html(o),i.find("*").each(function(){var t=$(this).attr("href"),o=$(this).attr("src");$(this).is("a")?"#"!=$(this).attr("href")&&"http"!=$(this).attr("href").substr(0,4)&&$(this).attr("href","#"):t&&"#"!=t&&"//"!=t.substr(0,2)&&"http"!=t.substr(0,4)?$(this).attr("href",n.clients_path+"/"+m+"/"+p+"/"+e.location+t):o&&"#"!=o&&"//"!=o.substr(0,2)&&"http"!=o.substr(0,4)&&$(this).attr("src",n.clients_path+"/"+m+"/"+p+"/"+e.location+o)}),t.editHtml=i.html(),d()},function(){})}function c(e){t.css_list="",a.getFiles({filter:"css",location:e.location}).then(function(e){t.css_list=e,t.css_file=e[0],t.cssChange()},function(e){})}function u(e){t.js_list="",a.getFiles({filter:"js",location:e.location}).then(function(e){t.js_list=e,t.js_file=e[0],t.jsChange()},function(e){})}t.saveFile=function(){a.index({mode:"saveFile",path:t.Project.location+"index.html",text:t.editHtml}).then(function(e){a.saveSnapShot({id:t.Project.id}).then(function(){s.success("Project saved successfully")},function(){s.error("Unable to save file")})},function(){})},e.projectId||o.go("dashboard"),r.show({id:e.projectId}).$promise.then(function(e){t.Project=e,i(t.Project),c(t.Project),u(t.Project)},function(t){o.go("dashboard"),s.error("unable to load project"+e.projectId)}),t.token=l.getValue("token"),t.renderPreview=d,t.goHome=function(){o.go("dashboard")}}var p=l.getValue("id"),m=l.getValue("organization_id");t.editHtml="",t.editCss="",t.editJs="",t.ShowHtml=!0,t.ShowCss=!0,t.ShowJs=!0;var g;t.codemirrorLoaded=function(e){e.setSize("100%",200),g=e},t.socialIcons=function(){c.open({templateUrl:n.module.general.view+"socialIcons.modal.html",controller:"SocialIconCtrl",size:"lg"})},t.editorOptions1={lineWrapping:!0,lineNumbers:!0,theme:"abcdef",mode:"htmlmixed",htmlMode:!0},t.editorOptions2={lineWrapping:!0,lineNumbers:!0,theme:"abcdef",mode:"css"},t.editorOptions3={lineWrapping:!0,lineNumbers:!0,theme:"abcdef",mode:"javascript"},t.css_file="",t.js_file="",t.css_list="",t.js_list="",t.toggleHtml=function(){t.ShowHtml=!t.ShowHtml},t.toggleCss=function(){t.ShowCss=!t.ShowCss},t.toggleJs=function(){t.ShowJs=!t.ShowJs},t.cssChange=function(){t.css_file?a.index({mode:"editFile",path:t.css_file}).then(function(e){t.editCss=e},function(){}):t.editCss=""},t.jsChange=function(){t.js_file?a.index({mode:"editFile",path:t.js_file}).then(function(e){t.editJs=e},function(){}):t.editJs=""},t.saveCss=function(){t.css_file&&a.index({mode:"saveFile",path:t.css_file,text:t.editCss}).then(function(e){a.saveSnapShot({id:t.Project.id}).then(function(){s.success("css saved successfully"),d()},function(){s.error("Unable to save file")})},function(){})},t.saveJs=function(){t.js_file&&a.index({mode:"saveFile",path:t.js_file,text:t.editjs}).then(function(e){a.saveSnapShot({id:t.Project.id}).then(function(){s.success("js saved successfully")},function(){s.error("Unable to save file")})},function(){})},i.User?u():i.$on("userInitialized",function(e,t){u()})}])}(),function(){"use strict";angular.module("easywebapp").controller("dashboardCtrl",["$stateParams","Auth","$scope","$rootScope","$state","Project","$config",function(e,t,o,i,n,l,r){function s(){o.User=i.User,o.addProject=function(){n.go("add-project")},o.token=t.getValue("token"),l.query().$promise.then(function(e){o.projects=e},function(){}),o.project_thumb_url=r.project_thumb_url,o.editProject=function(e){n.go("edit-project",{projectId:e})}}i.User?s():i.$on("userInitialized",function(e,t){s()})}])}(),function(){"use strict";function e(){function e(){return t}var t=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"}];this.getTec=e}angular.module("easywebapp").service("webDevTec",e)}(),function(){"use strict";function e(){function e(e){var t=this;t.relativeDate=e(t.creationDate).fromNow()}var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["moment"],t}angular.module("easywebapp").directive("acmeNavbar",e)}(),function(){"use strict";function e(e){function t(t,o,i,n){var l,r=e(o[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});o.addClass("acme-malarkey"),angular.forEach(t.extraValues,function(e){r.type(e).pause()["delete"]()}),l=t.$watch("vm.contributors",function(){angular.forEach(n.contributors,function(e){r.type(e.login).pause()["delete"]()})}),t.$on("$destroy",function(){l()})}function o(e,t){function o(){return i().then(function(){e.info("Activated Contributors View")})}function i(){return t.getContributors(10).then(function(e){return n.contributors=e,n.contributors})}var n=this;n.contributors=[],o()}var i={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:t,controller:o,controllerAs:"vm"};return o.$inject=["$log","githubContributor"],i}angular.module("easywebapp").directive("acmeMalarkey",e),e.$inject=["malarkey"]}(),function(){"use strict";function e(e,t){function o(o){function n(e){return e.data}function l(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))}return o||(o=30),t.get(i+"/contributors?per_page="+o).then(n)["catch"](l)}var i="https://api.github.com/repos/Swiip/generator-gulp-angular",n={apiHost:i,getContributors:o};return n}angular.module("easywebapp").factory("githubContributor",e),e.$inject=["$log","$http"]}(),function(){"use strict";angular.module("easywebapp").service("Auth",["$rootScope","$cookies","$cookieStore","$http","$config","$q","$log",function(e,t,o,i,n,l,r){var s=function(t){o.put("user",JSON.stringify(t)),e.User=t,i.defaults.headers.common.Token=t.token},a=function(e){if(o.get("user")){var t=JSON.parse(o.get("user"));return t[e]}return!1};this.getValue=a,this.setUser=s,this.login=function(e){var t=l.defer();return i.post(n.api+"auth",e).success(function(e){t.resolve(e),s(e)}).error(function(e){t.reject(e)}),t.promise},this.getUpdatedUser=function(){var e=l.defer();a("token",function(t){i.get(n.api+"user/",t).success(function(t){e.resolve(t),s(t)}).error(function(t){e.reject(t)})})},this.isLoggedIn=function(){return a("id")&&a("token")?!0:!1},this.getToken=function(){return a("token")?t.token:!1},this.removeUser=function(){o.remove("user"),e.User=!1},this.setUserByParams=function(e){s(e)},this.checkSubdomain=function(e){var t=l.defer();return i.get(n.api+"valid-subdomain?subdomain="+e).success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise}}])}(),function(){"use strict";angular.module("easywebapp").factory("Subdomain",["$location",function(e){var t=e.host();return t.indexOf(".")<0?null:t.split(".")[0]}])}(),function(){"use strict";angular.module("easywebapp").controller("LoginCtrl",["$scope","Auth","$state","toastr","$location",function(e,t,o,i,n){var l=n.host(),r="";l.indexOf(".")>0&&(r=l.split(".")[0]),e.credentials={subdomain:r},e.signIn=function(){t.login(e.credentials).then(function(e){i.success("You are successfully login","Success"),o.go("dashboard")},function(e){e&&e.error&&i.error(e.error)})}}])}(),function(){"use strict";function e(e,t,o){function i(){l(),e(function(){r.classAnimation="rubberBand"},4e3)}function n(){o.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),r.classAnimation=""}function l(){r.awesomeThings=t.getTec(),angular.forEach(r.awesomeThings,function(e){e.rank=Math.random()})}var r=this;r.awesomeThings=[],r.classAnimation="",r.creationDate=1440412812560,r.showToastr=n,i()}angular.module("easywebapp").controller("MainController",e),e.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";angular.module("easywebapp").factory("httpRequestInterceptor",["$rootScope","$injector",function(e,t){return{request:function(e){var o=t.get("Auth");return o.isLoggedIn()&&(console.log("x"),e.headers.Token=o.getValue("token")),e}}}])}(),angular.module("ui.bootstrap-slider",[]).directive("slider",["$parse","$timeout",function(e,t){return{restrict:"AE",replace:!0,template:'<input type="text" />',require:"ngModel",link:function(e,o,i,n){$.fn.slider.constructor.prototype.disable=function(){this.picker.off()},$.fn.slider.constructor.prototype.enable=function(){this.picker.on()},i.ngChange&&n.$viewChangeListeners.push(function(){e.$apply(i.ngChange)});var l={};i.sliderid&&(l.id=i.sliderid),i.min&&(l.min=parseFloat(i.min)),i.max&&(l.max=parseFloat(i.max)),i.step&&(l.step=parseFloat(i.step)),i.precision&&(l.precision=parseFloat(i.precision)),i.orientation&&(l.orientation=i.orientation),i.value&&(angular.isNumber(i.value)||angular.isArray(i.value)?l.value=i.value:angular.isString(i.value)&&(l.value=0===i.value.indexOf("[")?angular.fromJson(i.value):parseFloat(i.value))),i.range&&(l.range="true"===i.range),i.selection&&(l.selection=i.selection),i.tooltip&&(l.tooltip=i.tooltip),i.tooltipseparator&&(l.tooltip_separator=i.tooltipseparator),i.tooltipsplit&&(l.tooltip_split="true"===i.tooltipsplit),i.handle&&(l.handle=i.handle),i.reversed&&(l.reversed="true"===i.reversed),i.enabled&&(l.enabled="true"===i.enabled),i.naturalarrowkeys&&(l.natural_arrow_keys="true"===i.naturalarrowkeys),i.formater&&(l.formater=e.$eval(i.formater)),l.range&&!l.value&&(l.value=[0,0]);var r=$(o[0]).slider(l),s=i.updateevent||"slide";r.on(s,function(o){n.$setViewValue(o.value),t(function(){e.$apply()})});var a={slideStart:"onStartSlide",slide:"onSlide",slideStop:"onStopSlide"};angular.forEach(a,function(o,n){r.on(n,function(n){i[o]&&(e.$eval(i[o]),t(function(){e.$apply()}))})}),e.$watch(i.ngModel,function(e){(e||0===e)&&r.slider("setValue",e,!1)}),angular.isDefined(i.ngDisabled)&&e.$watch(i.ngDisabled,function(e){r.slider(e?"disable":"enable")})}}}]),function(){"use strict";angular.module("easywebapp").run(["$rootScope","$config","Auth","toastr","$state","$cookies","$http","$location",function(e,t,o,i,n,l,r,s){e.$state=n,e.Auth=o,e.config=t;var a=s.host(),c="";a.indexOf(".")>0&&(c=a.split(".")[0]),o.checkSubdomain(c).then(function(e){},function(e){window.location="http://notrie.com"}),o.isLoggedIn()&&(n.go("dashboard"),r.defaults.headers.common.Token=o.getValue("token"),r.get(t.api+"user/"+o.getValue("token")).then(function(t){o.setUser(t.data),e.$broadcast("userInitialized",{message:"hello"})}));var d=window.location.href,u=d.split("?");if(u.length>1){var p=u[1].split("=");p.length>1&&"token"==p[0]&&r.get(t.api+"user/"+p[1]).then(function(e){o.setUser(e.data),window.location=u[0]})}e.$on("$stateChangeStart",function(e,t,i,l,r){var s=["login","forgotpass","reset-link"];o.isLoggedIn()||-1!=$.inArray(t.name,s)||(e.preventDefault(),n.transitionTo("login")),o.isLoggedIn()&&"login"==t.name&&(e.preventDefault(),n.transitionTo("dashboard"))}),e.getlogout=function(){o.removeUser(),n.go("login")}}])}(),function(){"use strict";function e(e,t,o){e.state("login",{url:"/",templateUrl:o.module.auth.view+"sign_in.html",controller:"LoginCtrl",controllerAs:"login"}).state("dashboard",{url:"/dashboard",templateUrl:o.module.general.view+"dashboard.html",controller:"dashboardCtrl",controllerAs:"dashboard"}).state("add-project",{url:"/project/add",templateUrl:o.module.general.view+"addProject.html",controller:"addProjectCtrl",controllerAs:"addproject"}).state("edit-project",{url:"/project/edit/:projectId",templateUrl:o.module.general.view+"editProject.html",controller:"editProjectCtrl",controllerAs:"editProject"}),t.otherwise("/")}angular.module("easywebapp").config(e),e.$inject=["$stateProvider","$urlRouterProvider","$config"]}(),function(){"use strict";angular.module("easywebapp").constant("malarkey",malarkey).value("froalaConfig",{inlineMode:!0,placeholder:"Enter Text Here"}).constant("toastr",toastr).constant("moment",moment).constant("$config",{url:"http://localhost:3000/",api:"http://api.notrie.com/",preset_thumb_url:"http://api.notrie.com/preset-thumb",project_thumb_url:"http://api.notrie.com/preview/file",clients_path:"http://api1.notrie.com/clients",module:{auth:{controller:"app/auth/controllers/",view:"app/auth/views/"},general:{controller:"app/general/controller/",view:"app/general/views/"}}})}(),function(){"use strict";function e(e,t){e.debugEnabled(!0),t.options.timeOut=3e3,t.options.positionClass="toast-top-right",t.options.preventDuplicates=!0,t.options.progressBar=!0}angular.module("easywebapp").config(e),e.$inject=["$logProvider","toastr"]}(),angular.module("easywebapp").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container"><div><acme-navbar creationdate="main.creationDate"></acme-navbar></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class="main.classAnimation"><button type="button" class="btn btn-lg btn-success" ng-click="main.showToastr()">Splendid Toastr</button></p><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class="caption"><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href="{{awesomeThing.url}}">{{ awesomeThing.url }}</a></p></div></div></div></div></div>'),e.put("app/auth/views/sign_in.html",'<div class="" id="wrap"><div class="row"><div class="col-md-6 col-md-offset-3"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><legend>Sign In</legend><div class="row"><div class="col-xs-12 col-md-12"><input type="email" name="email" value="" class="form-control input-lg" placeholder="Email Address" ng-model="credentials.email" validator="email" email-error-message="email address required."> <input type="password" name="password" value="" class="form-control input-lg" placeholder="Password" ng-model="credentials.password" validator="required" required-error-message="password required."></div><div class="col-xs-12 col-md-12"><div class="col-sm-2 pull-right"><button class="btn btn-block btn-success" type="submit" validation-submit="form1" ng-click="signIn()">Sign In</button></div></div></div></form></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>'),e.put("app/general/views/addProject.html",'<div id="wrap"><div class="row"><div class="col-sm-6"><h3>Add Project</h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><br><div class="row"><div class="col-sm-2"></div><div class="col-sm-8"><form class="form-horizontal form" method="post" accept-charset="utf-8" name="formAddProject" id="formAddProject" role="form" novalidate=""><div class="form-group"><label class="col-md-4">Title<em>*</em></label><div class="col-md-8"><input type="text" name="name" ng-model="Project.name" class="form-control" validator="required" required-error-message="Project title required."></div></div><div class="form-group"><label class="col-md-4">Folder Name:</label><div class="col-md-8"><input type="text" ng-model="Project.folder_name" class="form-control"></div></div><div class="form-group"><label class="col-md-4">Template</label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-12"><input type="radio" name="type" value="zip" ng-model="Project.type" ng-click="setPreset(-1)" validator="required" required-error-message="Template selection required."> Upload Zip</div></div></div><div class="form-group" ng-if="Project.type == \'zip\'"><label class="col-md-4"></label><div class="col-md-8"><div class="col-md-3"><button type="file" ngf-select="uploadFiles($file)" ngf-max-height="1000" ngf-max-size="64MB" required="">Select File</button> {{zipFile.name}}</div></div></div><div class="form-group"><label class="col-md-4"></label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-12"><input type="radio" name="type" value="template" ng-model="Project.type" validator="required" required-error-message="Template selection required."> Select From Presets</div></div></div><div class="form-group" ng-if="Project.type == \'template\'"><label class="col-md-4"></label><div class="col-md-8"><div class="col-md-3" ng-repeat="preset in presets" style="position:relative;" ng-class="{ \'selected\' : Project.preset_id == preset.id }"><img src="{{ preset_thumb_url + \'?name=\' + preset.thumb + \'&token=\' + token }}" ng-click="setPreset(preset.id)" style="width:100%;cursor: pointer;"></div></div></div><div class="form-group"><label class="col-md-4"></label><div class="col-md-8" style="padding-left: 0;"><div class="col-md-12"><input type="radio" name="type" value="blank" ng-model="Project.type" validator="required" required-error-message="Template selection required."> Blank Folder</div></div></div><div class="form-group"><div class="pull-right"><button class="btn btn-success btn-md" type="submit" validation-submit="formAddProject" ng-click="saveProject()">Save</button> <button class="btn btn-default btn-md" type="button" ng-click="goBack();">Cancel</button></div></div></form></div><div class="col-sm-2"></div></div></div>'),e.put("app/general/views/dashboard.html",'<div id="wrap"><div class="row"><div class="col-sm-6"><h3><button class="btn btn-md btn-primary" ng-click="addProject()">Add Project</button></h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><div class="row"><div class="col-md-12"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><div class="col-sm-3" data-ng-repeat="project in projects"><div class="col-sm-12">{{ project.name }}</div><div class="col-sm-12"><img src="{{ project_thumb_url }}?name={{ project.thumb }}&token={{ token }}" ng-click="editProject(project.id)" class="img-responsive" style="border:2px solid #999999;cursor:pointer;"></div></div></form></div></div></div>'),e.put("app/general/views/editProject.html",'<style>\r\n    .social-links a{\r\n        float: left;\r\n        text-align: center;\r\n        margin-left:5px;\r\n        color:#999;\r\n        text-decoration: none;\r\n    }\r\n    .social-links a:hover{\r\n        text-decoration: none;\r\n    }\r\n</style><div id="wrap"><div class="row"><div class="col-sm-6"><h3>{{ Project.name }}</h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><div class="row"><div class="col-sm-4" style="padding-right: 0;" ng-show="ShowHtml || ShowCss || ShowJs"><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowHtml"><h4>HTML</h4><textarea ui-codemirror="{onLoad: codemirrorLoaded}" ui-codemirror-opts="editorOptions1" class="full-width" ng-model="editHtml" ng-change="renderPreview()"></textarea></div><div class="col-sm-12" style="padding-top:5px;padding-right: 0;" ng-show="ShowCss"><label class="col-sm-4 pull-left">CSS</label><div class="col-sm-6" style="padding-bottom:5px;"><select class="form-control" ng-model="css_file" ng-change="cssChange()"><option value="">Select Css</option><option ng-repeat="item in css_list" ng-selected="css_file==item" value="{{item}}">{{item}}</option></select></div><button class="btn btn-sm col-sm-2" ng-click="saveCss()">Update</button> <textarea ui-codemirror="{onLoad: codemirrorLoaded}" ui-codemirror-opts="editorOptions2" class="full-width" ng-model="editCss" ng-change="renderPreview()"></textarea></div><div class="col-sm-12" style="padding-top:5px;padding-right: 0;" ng-show="ShowJs"><label class="col-sm-4 pull-left">Js</label><div class="col-sm-6" style="padding-bottom:5px;"><select class="form-control" ng-model="js_file" ng-change="jsChange()"><option value="">Select Js</option><option ng-repeat="item in js_list" ng-selected="js_file==item" value="{{item}}">{{item}}</option></select></div><button class="btn btn-sm col-sm-2" ng-click="saveJs()">Update</button> <textarea ui-codemirror="{onLoad: codemirrorLoaded}" ui-codemirror-opts="editorOptions3" class="full-width" ng-model="editJs" ng-change="renderPreview()"></textarea></div></div><div ng-class="{ \'col-sm-8\' : ShowHtml || ShowCss || ShowJs , \'col-sm-12\' : !ShowHtml && !ShowCss && !ShowJs }"><div class="col-sm-12" style="padding-top: 5px;padding-left:0;"><button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowHtml , \'btn-gray\' : !ShowHtml }" ng-click="toggleHtml()">Html</button> <button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowCss , \'btn-gray\' : !ShowCss }" ng-click="toggleCss()">Css</button> <button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowJs , \'btn-gray\' : !ShowJs }" ng-click="toggleJs()">Js</button> <button class="btn btn-md btn-success pull-right" ng-click="saveFile({{ Project }})">Save</button> <button class="btn btn-md btn-primary pull-right" ng-click="goHome()" style="margin-right: 5px;">Home</button> <button class="btn btn-primary pull-right" ng-click="socialIcons()" style="margin-right: 5px;">Social Icons</button></div><div class="col-sm-12" style="padding-left: 0;"><h3>Preview</h3><iframe name="preview" id="preview" class="full-width" style="height: 600px;border:0;border:1px solid #cccccc;border-radius:20px;"></iframe></div></div></div></div>'),
e.put("app/general/views/editProjectBackup.html",'<style>\r\n    .social-links a{\r\n        float: left;\r\n        text-align: center;\r\n        margin-left:5px;\r\n        color:#999;\r\n        text-decoration: none;\r\n    }\r\n    .social-links a:hover{\r\n        text-decoration: none;\r\n    }\r\n</style><div id="wrap"><div class="row"><div class="col-sm-6"><h3>{{ Project.name }}</h3></div><div class="col-sm-5"><h3 class="pull-right">Welcome {{ User.firstname }}</h3></div><div class="col-sm-1"><h3><button class="btn btn-md btn-danger pull-right" ng-click="getlogout()">Sign Out</button></h3></div></div><div class="row"><div class="col-sm-4" style="padding-right: 0;" ng-show="ShowHtml || ShowCss || ShowJs"><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowHtml"><h4>HTML</h4><textarea ui-codemirror="" ui-codemirror-opts="editorOptions1" class="full-width" ng-model="editHtml"></textarea></div><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowCss"><h4>CSS</h4><textarea ui-codemirror="" ui-codemirror-opts="editorOptions2" class="full-width" ng-model="editCss"></textarea></div><div class="col-sm-12" style="padding-right: 0;" ng-show="ShowJs"><h4>JS</h4><textarea ui-codemirror="" ui-codemirror-opts="editorOptions3" class="full-width" ng-model="editJs"></textarea></div></div><div ng-class="{ \'col-sm-8\' : ShowHtml || ShowCss || ShowJs , \'col-sm-12\' : !ShowHtml && !ShowCss && !ShowJs }"><div class="col-sm-12" style="padding-left: 0;"><h3>Preview</h3><iframe name="preview" id="preview" class="full-width" style="height: 600px;border:0;border:1px solid #cccccc;border-radius:20px;"></iframe></div><div class="col-sm-12" style="padding-top: 5px;"><div class="col-sm-12"><button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowHtml , \'btn-gray\' : !ShowHtml }" ng-click="toggleHtml()">Html</button> <button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowCss , \'btn-gray\' : !ShowCss }" ng-click="toggleCss()">Css</button> <button class="btn btn-sm" ng-class="{ \'btn-primary\' : ShowJs , \'btn-gray\' : !ShowJs }" ng-click="toggleJs()">Js</button> <button class="btn btn-md btn-success pull-right" ng-click="saveFile({{ Project }})">Save</button> <button class="btn btn-md btn-primary pull-right" ng-click="goHome()" style="margin-right: 5px;">Home</button> <button class="btn btn-primary pull-right" ng-click="socialIcons()" style="margin-right: 5px;">Social Icons</button></div></div></div></div><div class="row"></div></div>'),e.put("app/general/views/socialIcons.modal.html",'<div class="modal-header"><button type="button" class="close" ng-click="close()"><span aria-hidden="true">&times;</span></button><h3 class="modal-title">Social Icon generator</h3></div><div class="modal-body"><form class="form-horizontal"><div class="col-md-12"><div class="col-md-6"><tabset justified="true"><tab heading="Set your links"><br><div class="form-group" ng-repeat="link in models.social_links"><div class="col-md-12"><input type="text" class="form-control" ng-model="link.href" placeholder="{{ link.placeholder }}" ng-blur="output.changeCode()"></div></div></tab><tab heading="Customize the look" ng-click="availFuncForTab2()"><div class="form-group" style="margin-top:10px;"><label class="col-md-12">Style of icon</label><div class="col-md-12"><select class="form-control" ng-model="models.styleicon" name="style" ng-change="output.changeCode()"><option value="plain" selected="selected">Silhouette</option><option value="circle">Circle</option><option value="rounded">Rounded corners</option><option value="square">Square</option></select></div></div><div class="form-group"><div class="col-md-6"><input type="radio" name="type_of_color" ng-model="models.monochrome" value="monochrome" ng-click="output.changeCode()"> Monochrome</div><div class="col-md-6"><input type="radio" name="type_of_color" ng-model="models.monochrome" value="brand" ng-click="output.changeCode()"> Brand color for each icon</div></div><div class="form-group"><label class="col-md-12">Color if monochrome</label><div class="col-md-12"><input type="text" ng-disabled="models.monochrome!=\'monochrome\'" name="monochrome_bgcolor" ng-model="models.monochrome_bgcolor" value="" placeholder="#ccc" class="form-control" ng-blur="output.changeCode()"></div></div><div class="form-group"><label class="col-md-12">Size</label><div class="col-md-12"><slider slidestop="executeMe()" ng-model="sliders.sliderValue" min="{{testOptions.min}}" step="{{testOptions.step}}" max="{{testOptions.max}}"></slider></div><div class="col-sm-12">{{ sliders.sliderValue }}px</div></div><div class="form-group"><div class="col-md-6"><input type="checkbox" name="open_in_new_tab" ng-model="models.open_in_new_tab" ng-click="output.changeCode()"> Open in new tab</div></div></tab></tabset></div><div class="col-md-6"><div class="form-group" style="margin-top:10px;"><div class="col-md-12"><h1>Preview</h1></div></div><div class="form-group" style="margin-top:10px;"><div class="col-md-12"><h4>Your buttons will appear just like this, wherever you place your code.</h4></div></div><div class="form-group"><div class="col-md-12 social-links"><a href="{{ link.href }}" class="glyph a-social" ng-repeat="link in models.social_links" ng-attr-target="{{ models.open_in_new_tab ? \'_blank\' : \'_self\' }}" ng-show="link.href" title="{{ link.title }}"><i class="glyph-icon" ng-class="{ \'{{link[\'plain\']}}\' : models.styleicon == \'plain\', \'{{link[\'circle\']}}\' : models.styleicon == \'circle\', \'{{link[\'rounded\']}}\' : models.styleicon == \'rounded\', \'{{link[\'square\']}}\' : models.styleicon == \'square\', }" style="{{ models.monochrome == \'monochrome\' ? ( models.styleicon == \'plain\' ? \'color:#999;\' : \'color:\' + ( models.monochrome_bgcolor ? models.monochrome_bgcolor : \'#999\' ) + \';\' ) : \'color:\' + link.background_color + \';\' }}font-size:{{ sliders.sliderValue }}px;"></i></a></div></div><div class="form-group"><div class="col-sm-12"><button clipboard="" text="output.preview" on-copied="success()" on-error="fail(err)" class="btn btn-success btn-md">Copy to Clipboard</button></div></div><div class="form-group"><div class="col-sm-12"><pre>\r\n<a href="#">flaticon/flaticon.css</a>\r\n{{ output.preview }}</pre></div></div></div></div></form><div class="clearfix"></div></div><div class="modal-footer"><button class="btn btn-warning" type="button" ng-click="close()">Close</button></div>')}]);