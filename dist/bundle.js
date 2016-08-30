(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.export = serializeJSON

  function serializeJSON(form) {
    var json = {};
    [].forEach.call(form.querySelectorAll('input,select,textarea'), function(el) {
      var key = el.name,
        val = el.value;
      //var validElem = val && el.hasAttribute('name') && !el.disabled;
      var validElem = val != '' && val !== undefined && val !== null && el.hasAttribute('name') && !el.disabled;
      if (validElem) {
        if (el.hasAttribute('type') && el.getAttribute('type').toLowerCase() == 'checkbox') {
          el.checked && ( (Object.prototype.toString.call(json[key]) == '[object Array]' ) ? json[key].push(val) : json[key] = [val]);
        } else if (el.hasAttribute('type') && el.getAttribute('type').toLowerCase() == 'radio') {
          el.checked && (json[key] = val);
        } else if (el.nodeName.toLowerCase() == 'select' && el.multiple) {
          [].forEach.call(el.selectedOptions, function(ele) {
            ( (Object.prototype.toString.call(json[key]) == '[object Array]' ) ? json[key].push(ele.value) : json[key] = [ele.value]);
          })
        } else {
          json[key] = val;
        }
      }
    });
    return json;
  };

},{}]},{},[1]);
