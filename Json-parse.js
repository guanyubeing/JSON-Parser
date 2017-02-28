parseJson: function(values) {
    var i = 0;

    function pr() {
      while (i < values.length) {
        if (values[i] === ' ' || values[i] === ',' || values[i] === ':' || values[i] === '\n' || values[i] === '\t') {
          i++;
          continue;
        }
        if (values[i] === '{') {
          return prObj();
        }
        if (values[i] === '"') {
          return prString();
        }
        if (isNum(values[i])) {
          return prNumber();
        }
        if (values[i] === '[') {
          return prArray();
        }
        if (values[i] === 'f') {
          return prFalse();
        }
        if (values[i] === 't') {
          return prTrue();
        }
        if (values[i] === 'n') {
          return prNull();
        }
        break;
      }
    }

    function prString() {
      var start = i;
      var end = values.indexOf('"', start + 1);
      var result = values.slice(start + 1, end);
      i = end + 1;
      return result;
    }

    function prObj() {
      i++;
      var rasult = {};
      while (i < values.length) {
        if (values[i] === ' ' || values[i] === ',' || values[i] === ':' || values[i] === '\n' || values[i] === '\t') {
          i++;
          continue;
        }
        if (values[i] === '}') {
          break;
        }
        var key = pr();
        var value = pr();
        rasult[key] = value;
      }
      i++;
      return rasult;
    }

    function isNum(x) {
      var char0 = '0'.charCodeAt(0);
      var char9 = '9'.charCodeAt(0);
      if (x.charCodeAt(0) >= char0 && x.charCodeAt(0) <= char9) {
        return true;
      } else {
        return false;
      }
    }

    function prNumber() {
      var start = i;
      for (var j = i; j < values.length; j++) {
        if (!isNum(values[j])) {
          var end = j;
          break;
        }
      }
      var result = values.slice(start, end);
      i = j;
      return parseInt(result);
    }

    function prArray() {
      i++;
      var result = [];
      while (i < values.length) {
        if (values[i] === ' ' || values[i] === ',' || values[i] === ':' || values[i] === '\n' || values[i] === '\t') {
          i++;
          continue;
        }
        if (values[i] === ']') {
          break;
        }
        result.push(pr());
      }
      i++;
      return result;
    }

    function prFalse() {
      i += 5;
      return false;
    }

    function prTrue() {
      i += 4;
      return true;
    }

    function prNull() {
      i += 4;
      return null;
    }
    return pr();
  }