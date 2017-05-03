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
function ignored(e){return!~ignore.indexOf(e)}function highlight(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\/\/(.*)/gm,'<span class="comment">//$1</span>').replace(/('.*?')/gm,'<span class="string">$1</span>').replace(/(\d+\.\d+)/gm,'<span class="number">$1</span>').replace(/(\d+)/gm,'<span class="number">$1</span>').replace(/\bnew[ \t]+(\w+)/gm,'<span class="keyword">new</span> <span class="init">$1</span>').replace(/\b(function|new|throw|return|var|if|else)\b/gm,'<span class="keyword">$1</span>')}var fs=require("fs"),path=require("path"),basename=path.basename,exists=fs.existsSync||path.existsSync,glob=require("glob"),join=path.join,debug=require("debug")("mocha:watch"),ignore=["node_modules",".git"];exports.escape=function(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},exports.forEach=function(e,t,i){for(var n=0,s=e.length;s>n;n++)t.call(i,e[n],n)},exports.map=function(e,t,i){for(var n=[],s=0,r=e.length;r>s;s++)n.push(t.call(i,e[s],s));return n},exports.indexOf=function(e,t,i){for(var n=i||0,s=e.length;s>n;n++)if(e[n]===t)return n;return-1},exports.reduce=function(e,t,i){for(var n=i,s=0,r=e.length;r>s;s++)n=t(n,e[s],s,e);return n},exports.filter=function(e,t){for(var i=[],n=0,s=e.length;s>n;n++){var r=e[n];t(r,n,e)&&i.push(r)}return i},exports.keys=Object.keys||function(e){var t=[],i=Object.prototype.hasOwnProperty;for(var n in e)i.call(e,n)&&t.push(n);return t},exports.watch=function(e,t){var i={interval:100};e.forEach(function(e){debug("file %s",e),fs.watchFile(e,i,function(i,n){n.mtime<i.mtime&&t(e)})})},exports.files=function(e,t,i){i=i||[],t=t||["js"];var n=new RegExp("\\.("+t.join("|")+")$");return fs.readdirSync(e).filter(ignored).forEach(function(s){s=join(e,s),fs.statSync(s).isDirectory()?exports.files(s,t,i):s.match(n)&&i.push(s)}),i},exports.slug=function(e){return e.toLowerCase().replace(/ +/g,"-").replace(/[^-\w]/g,"")},exports.clean=function(e){e=e.replace(/\r\n?|[\n\u2028\u2029]/g,"\n").replace(/^\uFEFF/,"").replace(/^function *\(.*\) *{|\(.*\) *=> *{?/,"").replace(/\s+\}$/,"");var t=e.match(/^\n?( *)/)[1].length,i=e.match(/^\n?(\t*)/)[1].length,n=new RegExp("^\n?"+(i?"	":" ")+"{"+(i?i:t)+"}","gm");return e=e.replace(n,""),exports.trim(e)},exports.trim=function(e){return e.replace(/^\s+|\s+$/g,"")},exports.parseQuery=function(e){return exports.reduce(e.replace("?","").split("&"),function(e,t){var i=t.indexOf("="),n=t.slice(0,i),s=t.slice(++i);return e[n]=decodeURIComponent(s),e},{})},exports.highlightTags=function(e){for(var t=document.getElementById("mocha").getElementsByTagName(e),i=0,n=t.length;n>i;++i)t[i].innerHTML=highlight(t[i].innerHTML)};var emptyRepresentation=function(e,t){switch(t=t||exports.type(e)){case"function":return"[Function]";case"object":return"{}";case"array":return"[]";default:return e.toString()}};exports.type=function(e){return"undefined"!=typeof Buffer&&Buffer.isBuffer(e)?"buffer":Object.prototype.toString.call(e).replace(/^\[.+\s(.+?)\]$/,"$1").toLowerCase()},exports.stringify=function(e){var t,i=exports.type(e);if("null"===i||"undefined"===i)return"["+i+"]";if("date"===i)return"[Date: "+e.toISOString()+"]";if(!~exports.indexOf(["object","array","function"],i))return e.toString();for(t in e)if(e.hasOwnProperty(t))return JSON.stringify(exports.canonicalize(e),null,2).replace(/,(\n|$)/g,"$1");return emptyRepresentation(e,i)},exports.isBuffer=function(e){return"undefined"!=typeof Buffer&&Buffer.isBuffer(e)},exports.canonicalize=function(e,t){var i,n,s=exports.type(e),r=function(e,i){t.push(e),i(),t.pop()};if(t=t||[],-1!==exports.indexOf(t,e))return"[Circular]";switch(s){case"undefined":i="[undefined]";break;case"buffer":case"null":i=e;break;case"array":r(e,function(){i=exports.map(e,function(e){return exports.canonicalize(e,t)})});break;case"date":i="[Date: "+e.toISOString()+"]";break;case"function":for(n in e){i={};break}if(!i){i=emptyRepresentation(e,s);break}case"object":i=i||{},r(e,function(){exports.forEach(exports.keys(e).sort(),function(n){i[n]=exports.canonicalize(e[n],t)})});break;case"number":case"boolean":i=e;break;default:i=e.toString()}return i},exports.lookupFiles=function e(t,i,n){var s=[],r=new RegExp("\\.("+i.join("|")+")$");if(!exists(t)){if(!exists(t+".js")){if(s=glob.sync(t),!s.length)throw new Error("cannot resolve path (or pattern) '"+t+"'");return s}t+=".js"}try{var a=fs.statSync(t);if(a.isFile())return t}catch(o){return}return fs.readdirSync(t).forEach(function(a){a=join(t,a);try{var o=fs.statSync(a);if(o.isDirectory())return void(n&&(s=s.concat(e(a,i,n))))}catch(l){return}o.isFile()&&r.test(a)&&"."!==basename(a)[0]&&s.push(a)}),s},exports.undefinedError=function(){return new Error("Caught undefined error, did you throw without specifying what?")},exports.getError=function(e){return e||exports.undefinedError()};