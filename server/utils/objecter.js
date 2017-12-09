export default function setByPath(obj, path, value) {
  var parts = path.split('.');
  var o = obj;
  if (parts.length > 1) {
    for (var i = 0; i < parts.length - 1; i++) {
      if (!o[parts[i]]) o[parts[i]] = {};
      o = o[parts[i]];
    }
  }

  o[parts[parts.length - 1]] = value;
}
