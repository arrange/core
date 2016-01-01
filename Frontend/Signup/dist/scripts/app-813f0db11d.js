!function(){"use strict";angular.module("easywebapp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","validation","validation.rule","googleplus"])}(),function(){"use strict";angular.module("easywebapp").service("Authservice",["$rootScope","$http","$config","$q",function(o,n,e,t){this.checkSubdomain=function(o){var a=t.defer();return n.get(e.api+"valid-subdomain?subdomain="+o.subdomain).success(function(o){a.resolve(o)}).error(function(o){a.reject(o)}),a.promise},this.isUserExist=function(o){var a=t.defer();return n.post(e.api+"users/is-exist",o).success(function(o){a.resolve(o)},function(o){a.reject(o)}),a.promise}}])}(),function(){"use strict";angular.module("easywebapp").factory("Organization",["$resource","$config",function(o,n){return o(n.api+"register/:id",{id:"@id"},{update:{method:"PUT"},query:{method:"GET"}})}])}(),function(){"use strict";angular.module("easywebapp").controller("AuthController",["$state","$scope","$config","GooglePlus","Authservice","$stateParams","$window",function(o,n,e,t,a,i,r){n.getLoginGoogle=function(n){t.login().then(function(e){console.log(e),t.getUser().then(function(e){if(console.log(e),n){var t=window.location.href.split("?")[1],i=t.split("=")[1],i=decodeURIComponent(i);window.opener.postMessage(JSON.stringify(e),i),window.close()}if(!e.email){var r={user_name:e.name,google_sign_up:!0};return o.go("Signup",r)}var s={email:e.email,google_sign_up:!0};a.isUserExist(s).then(function(n){if(n.user){var t=n.user.organization.subdomain,a=n.user.token;window.location="http://"+t+".notrie.com?token="+a}else{var i={user_name:e.name,email:e.email?e.email:"",google_sign_up:!0};o.go("Signup",i)}},function(){var n={user_name:e.name,email:e.email?e.email:"",google_sign_up:!0};o.go("Signup",n)})})},function(o){})},-1!=window.location.href.indexOf("google_sign_up")&&window.setTimeout(function(){n.getLoginGoogle(!0)},1e3)}]).controller("SigninController",["$scope","Authservice","toastr","$config",function(o,n,e,t){o.signinForm=function(){o.credentials={subdomain:o.subdomain},n.checkSubdomain(o.credentials).then(function(){window.location="http://"+o.subdomain+"."+t.domain,e.success("Valid Domain....","Success")},function(o){e.error(o.error)})}}]).controller("SignupController",["$scope","Organization","toastr","$state",function(o,n,e,t){o.organization=new n,o.showPwd=!0,t.params.user_name&&(o.organization.name=t.params.user_name),t.params.email&&(o.organization.email=t.params.email),t.params.google_sign_up&&(o.showPwd=!1,o.organization.google_sign_up=t.params.google_sign_up),o.signupForm=function(){var n=angular.copy(o.organization);n.$save(function(o){e.success("Organization created successfully!","Success"),window.location="http://"+o.subdomain+".notrie.com?token="+o.users[0].token},function(o){422==o.status&&angular.forEach(o.data,function(o){e.error(o)})})}}])}(),function(){"use strict";function o(){function o(){return n}var n=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"}];this.getTec=o}angular.module("easywebapp").service("webDevTec",o)}(),function(){"use strict";function o(){function o(o){var n=this;n.relativeDate=o(n.creationDate).fromNow()}var n={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:o,controllerAs:"vm",bindToController:!0};return o.$inject=["moment"],n}angular.module("easywebapp").directive("acmeNavbar",o)}(),function(){"use strict";function o(o){function n(n,e,t,a){var i,r=o(e[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});e.addClass("acme-malarkey"),angular.forEach(n.extraValues,function(o){r.type(o).pause()["delete"]()}),i=n.$watch("vm.contributors",function(){angular.forEach(a.contributors,function(o){r.type(o.login).pause()["delete"]()})}),n.$on("$destroy",function(){i()})}function e(o,n){function e(){return t().then(function(){o.info("Activated Contributors View")})}function t(){return n.getContributors(10).then(function(o){return a.contributors=o,a.contributors})}var a=this;a.contributors=[],e()}var t={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:n,controller:e,controllerAs:"vm"};return e.$inject=["$log","githubContributor"],t}angular.module("easywebapp").directive("acmeMalarkey",o),o.$inject=["malarkey"]}(),function(){"use strict";function o(o,n){function e(e){function a(o){return o.data}function i(n){o.error("XHR Failed for getContributors.\n"+angular.toJson(n.data,!0))}return e||(e=30),n.get(t+"/contributors?per_page="+e).then(a)["catch"](i)}var t="https://api.github.com/repos/Swiip/generator-gulp-angular",a={apiHost:t,getContributors:e};return a}angular.module("easywebapp").factory("githubContributor",o),o.$inject=["$log","$http"]}(),function(){"use strict";function o(o,n,e){function t(){i(),o(function(){r.classAnimation="rubberBand"},4e3)}function a(){e.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),r.classAnimation=""}function i(){r.awesomeThings=n.getTec(),angular.forEach(r.awesomeThings,function(o){o.rank=Math.random()})}var r=this;r.awesomeThings=[],r.classAnimation="",r.creationDate=1440412812560,r.showToastr=a,t()}angular.module("easywebapp").controller("MainController",o),o.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";function o(o){o.debug("runBlock end")}angular.module("easywebapp").run(o),o.$inject=["$log"]}(),function(){"use strict";function o(o,n){o.state("home",{url:"/start/:param1",templateUrl:"app/auth/views/option.html",controller:"AuthController",controllerAs:"auth",params:{param1:null}}).state("Signin",{url:"/signin",templateUrl:"app/auth/views/sign_in.html",controller:"SigninController",controllerAs:"signin"}).state("Signup",{url:"/signup",templateUrl:"app/auth/views/sign_up.html",controller:"SignupController",controllerAs:"signup",params:{user_name:null,email:null,google_sign_up:!1}}).state("Google",{url:"/google",templateUrl:"app/auth/views/google.html",controller:"SignupWithGoogle",controllerAs:"sgoogle"}),n.otherwise("/start")}angular.module("easywebapp").config(o),o.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("easywebapp").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment).constant("$config",{url:"http://localhost:3000/",api:"http://api.notrie.com/",domain:"notrie.com",module:{auth:{controller:"app/auth/controllers",view:"app/auth/views"}}})}(),function(){"use strict";function o(o,n,e){o.debugEnabled(!0),n.options.timeOut=3e3,n.options.positionClass="toast-top-right",n.options.preventDuplicates=!0,n.options.progressBar=!0,e.init({clientId:"936897214783-ish3fnhk0h57a0rb9ilpvu7crt05e1qg.apps.googleusercontent.com",apiKey:"0uV5UjdHUMOAObLXHLcjHqFN"}),e.setScopes("https://www.googleapis.com/auth/userinfo.email")}angular.module("easywebapp").config(o),o.$inject=["$logProvider","toastr","GooglePlusProvider"]}(),angular.module("easywebapp").run(["$templateCache",function(o){o.put("app/main/main.html",'<div class="container"><div><acme-navbar creationdate="main.creationDate"></acme-navbar></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class="main.classAnimation"><button type="button" class="btn btn-lg btn-success" ng-click="main.showToastr()">Splendid Toastr</button></p><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class="caption"><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href="{{awesomeThing.url}}">{{ awesomeThing.url }}</a></p></div></div></div></div></div>'),o.put("app/auth/views/option.html",'<div class="container"><div class="row"><form class="form-horizontal"><div class="form-group"><div class="col-sm-4"></div><div class="col-sm-4"><a ui-sref="Signup"><button class="btn btn-primary btn-lg">Sign Up(14 days Free Trial)</button></a></div><div class="col-sm-4"></div></div><div class="form-group"><div class="col-sm-4"></div><div class="col-sm-4"><a ui-sref="Signin"><button class="btn btn-primary btn-lg">Sign In</button></a></div><div class="col-sm-4"></div></div><div class="form-group"><div class="col-sm-4"></div><div class="col-sm-4"><button class="btn btn-primary btn-lg" ng-click="getLoginGoogle()">Sign In Google(14 days Free Trial)</button></div><div class="col-sm-4"></div></div></form></div></div>'),o.put("app/auth/views/sign_in.html",'<div class="container" id="wrap"><div class="row"><div class="col-md-6 col-md-offset-3"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><legend>Sign In</legend><h4>Enter Your domain Name</h4><div class="row"><div class="col-xs-12 col-md-12"><div class="input-group"><input type="text" class="form-control input-lg" id="subdomain" name="subdomain" placeholder="Pick a url for your account" ng-model="subdomain" validator="required"><div class="input-group-addon input-lg">.notrie.com</div></div></div></div><button class="btn btn-lg btn-primary btn-block signup-btn" type="submit" validation-submit="form1" ng-click="signinForm()">Continue</button></form></div></div></div>'),o.put("app/auth/views/sign_up.html",'<style type="text/css">\r\n\r\n</style><div class="container" id="wrap"><div class="row"><div class="col-md-6 col-md-offset-3"><form method="post" accept-charset="utf-8" class="form" role="form" name="form1" novalidate=""><legend>Sign Up</legend><h4>Start your free 14 day trial.</h4><div class="row"><div class="col-xs-12 col-md-12"><div class="input-group"><input type="text" class="form-control input-lg" id="domain_url" name="domain_url" placeholder="Pick a url for your account" ng-model="organization.subdomain" validator="required" required-error-message="Subdomain is required."><div class="input-group-addon input-lg">.notrie.com</div></div></div></div><input type="email" name="email" value="" class="form-control input-lg" ng-model="organization.email" ng-if="!showPwd" disabled=""> <input type="email" name="email" value="" class="form-control input-lg" placeholder="Email Address" ng-model="organization.email" validator="email" email-error-message="email address required." ng-if="showPwd"> <input type="password" name="password" ng-if="showPwd" value="" class="form-control input-lg" placeholder="Password (min 6 charector)" ng-model="organization.password" validator="required, minlength=6" required-error-message="Password is required." minlength-error-message="Minimum 6 charaters required"> <input type="password" name="confirm_password" ng-if="showPwd" value="" class="form-control input-lg" placeholder="Confirm Password" ng-model="organization.password_confirmation" validator="required, minlength=6" required-error-message="Confirm Password is required." minlength-error-message="Minimum 6 charaters required"> <input type="text" name="company_name" value="" class="form-control input-lg" placeholder="Your / Company name" ng-model="organization.name" validator="required" required-error-message="Your/Company name is required."> <input name="google_sign_up" type="hidden" model="Organization.google_sign_up"> <button class="btn btn-lg btn-primary btn-block signup-btn" type="submit" validation-submit="form1" ng-click="signupForm()">Create account</button></form></div></div></div>'),o.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>')}]);