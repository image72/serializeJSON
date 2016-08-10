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
