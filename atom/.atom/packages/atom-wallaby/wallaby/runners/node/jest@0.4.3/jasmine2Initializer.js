/*
 * Wallaby.js - v1.0.249
 * http://wallabyjs.com
 * Copyright (c) 2014-2016 Wallaby.js - All Rights Reserved.
 *
 * This source code file is a part of Wallaby.js and is a proprietary (closed source) software.

 * IMPORTANT:
 * Wallaby.js is a tool made by software developers for software developers with passion and love for what we do.
 * Pirating the tool is not only illegal and just morally wrong,
 * it is also unfair to other fellow programmers who are using it legally,
 * and very harmful for the tool and its future.
 */
var tracer=global.$_$tracer;jasmine.ExceptionFormatter=function(){this.message=function(e){return e?e.name&&e.message?e.name+": "+e.message:e.toString():"empty error"},this.stack=function(e){return e?e.stack:null}},jasmine.SpyStrategy=function(e){e=e||{};var t=e.name||"unknown",i=e.fn||function(){},n=e.getSpy||function(){},s=function(){};this.identity=function(){return t},this.exec=function(){return s.apply(this,arguments)},this.callThrough=function(){return s=i,n()},this.returnValue=function(e){return s=function(){return e},n()},this.returnValues=function(){var e=Array.prototype.slice.call(arguments);return s=function(){return e.shift()},n()},this.throwError=function(e){return s=function(){throw e instanceof Error?e:new Error(e)},n()},this.callFake=function(e){return s=e,n()},this.stub=function(e){return s=function(){},n()}};var jasmineEnv=jasmine.getEnv(),currentSuite=[],originalDescribe=jasmineEnv.describe;jasmineEnv.describe=function(){currentSuite.push(arguments[0]);var e=Function.prototype.apply.call(originalDescribe,this,arguments);return currentSuite.pop(),e};var originalFDescribe=jasmineEnv.fdescribe;jasmineEnv.fdescribe=function(){currentSuite.push(arguments[0]);var e=Function.prototype.apply.call(originalFDescribe,this,arguments);return currentSuite.pop(),e};var existingSpecFilter=jasmineEnv.specFilter.bind(jasmineEnv),originalIt=jasmineEnv.it;jasmineEnv.it=function(){var e=arguments[1];if("encountered a declaration exception"===arguments[0])return e();if(!e)return Function.prototype.apply.call(originalIt,this,arguments);e.length?arguments[1]=function(t){tracer.specSyncStart();try{var i=Function.prototype.apply.call(e,this,arguments)}finally{tracer.specSyncEnd()}return i}:arguments[1]=function(){tracer.specSyncStart();try{var t=Function.prototype.apply.call(e,this,arguments)}finally{tracer.specSyncEnd()}return t};var t=Function.prototype.apply.call(originalIt,this,arguments),i=currentSuite.slice();return i.push(t.description),t.disabled=tracer.hasSpecFilter()&&!tracer.specFilter(i)&&existingSpecFilter(t.description),t};var originalAfterEach=jasmineEnv.afterEach;jasmineEnv.afterEach=function(){if(tracer.needToNotifySingleTestRun()){var e=arguments[0];e.length?arguments[0]=function(t){tracer.notifySingleTestAfterEach(function(){e(t)})}:arguments[0]=function(t){tracer.notifySingleTestAfterEach(function(){try{e()}finally{t()}})}}return Function.prototype.apply.call(originalAfterEach,this,arguments)},jasmineEnv.addReporter(tracer._jasmineAdapter),jasmineEnv.specFilter=function(){return!0};