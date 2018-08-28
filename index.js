module.export = serializeJSON

function eleType(el, type) {
  return el.hasAttribute('type') && el.getAttribute('type').toLowerCase() == type;
}

function isType(obj, name) {
  return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase() == name;
}

function serializeJSON(form) {
  var json = {};
  [].forEach.call(form.querySelectorAll('input,select,textarea'), function (el) {
    var key = el.name,
      val = el.value;
    //var validElem = val && el.hasAttribute('name') && !el.disabled;
    var validElem = val != '' && val !== undefined && val !== null && el.hasAttribute('name') && !el.disabled;
    if (validElem) {
      if (eleType(el, 'checkbox')) {
        el.checked && (isType(json[key], 'array') ? json[key].push(val) : json[key] = [val]);
      } else if (eleType(el, 'radio')) {
        el.checked && (json[key] = val);
      } else if (el.nodeName.toLowerCase() == 'select' && el.multiple) {
        [].forEach.call(el.selectedOptions, function (ele) {
          (isType(json[key], 'array') ? json[key].push(ele.value) : json[key] = [ele.value]);
        })
      } else {
        json[key] = val;
      }
    }
  });
  return json;
};

const getFormDataJSON = formEl => {
  const formData = new FormData(formEl);
  return [...formData.entries()].reduce((origin, [k, v]) => {
    origin[k] = v;
    return origin;
  },{})
}
