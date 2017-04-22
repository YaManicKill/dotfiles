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
var tracer=global.$_$tracer,tape,tapeInstalled=!1;try{tape=require("tape"),tapeInstalled=!0}catch(e){tracer.start(function(){tracer.reportGlobalError("tape node module is not found or the version is not supported, missing `npm install tape --save-dev`?")}),module.exports={init:function(){return{configure:function(){}}}}}if(tapeInstalled){var harness=tape.getHarness({exit:!1,objectMode:!0}),results=harness._results;tracer.start(function(){var e=tracer.initialSpecId(),t=global.$_$session,i=!1,n=function(){return t!==global.$_$session},s=function(){i||n()||(i=!0,tracer.complete())},r="undefined"!=typeof setImmediate?setImmediate:process.nextTick,a=function(e){if(!e._only)return e.tests.shift();do{var t=e.tests.shift();if(t&&e._only===t.name)return t}while(0!==e.tests.length)},o=function(t){if(!n()){var i=t._cb;t._cb=function(){tracer.specSyncStart();try{i(t)}catch(e){t.fail(e.message,{error:e})}finally{tracer.specSyncEnd()}},t.on("prerun",function(){n()||(tracer.specStart(t._id,t.name),t._id=++e,t._timeout=t._timeout||1e3,t._time=(new tracer._Date).getTime(),t._log=[])}),t.on("result",function(e){n()||t._log.push(e)}),t.on("test",function(e){n()||o(e)}),t.once("end",function(){if(!n()){var e=tracer.specEnd(),i={id:t._id,timeRange:e,name:t.name,suite:[],skipped:t._skip,time:(new tracer._Date).getTime()-t._time,log:[],hook:!1};if(!i.skipped)for(var s=0,r=t._log.length;r>s;s++){var a=t._log[s];if(i.success=i.success&&a.ok,!a.ok&&a.error){var o={message:a.error.message,stack:a.error.stack};a.showDiff="equal"===a.operator||"notEqual"===a.operator||"deepEqual"===a.operator||"deepLooseEqual"===a.operator||"notDeepEqual"===a.operator||"notDeepLooseEqual"===a.operator;var l=a.actual,u=a.expected;tracer.setAssertionData(a,o),"fail"!==a.operator&&(o.message="Actual: "+tracer._inspect(l,5)+"\nExpected: "+tracer._inspect(u,5)),i.log.push(o)}}i.log.length||delete i.log,tracer.result(i)}})}},l=function(){for(var e;(e=a(results))&&!n();)if(o(e),e.run(),!e.ended)return e.once("end",function(){!n()&&r(l)});results.emit("done")};tracer.started({total:"unknown number of"}),results.once("done",s),l()}),module.exports={init:function(e){return e.forEach(function(e){require(e)}),tape}}}