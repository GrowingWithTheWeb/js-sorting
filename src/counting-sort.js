(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.countingSort = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.countingSort = factory();
  }
}(this, function () {
  'use strict';

  var algorithm = {

    // Routes function calls to the correct internal method, call like:
    // sort(array, maxValue)
    // sort(array, minValue, maxValue)
    sort: function () {
      if (arguments.length === 2) {
        return sortWithMax.apply(null, arguments);
      }
      if (arguments.length === 3) {
        return sortWithMinAndMax.apply(null, arguments);
      }
      throw 'Cannot sort with counting sort with ' + arguments.length +
        ' arguments';
    }

  };

  function sortWithMax(array, maxValue) {
    var buckets = new Array(maxValue + 1);
    var sortedIndex = 0;
    var i;

    for (i = 0; i < array.length; i++) {
      if (!buckets[array[i]]) {
        buckets[array[i]] = 0;
      }
      buckets[array[i]]++;
    }

    for (i = 0; i < buckets.length; i++) {
      while (buckets[i] > 0) {
        array[sortedIndex++] = i;
        buckets[i]--;
      }
    }

    return array;
  }

  function sortWithMinAndMax(array, minValue, maxValue) {
    if (array.length === 0) {
      return array;
    }

    var rangeSize = maxValue - minValue;
    var buckets = new Array(rangeSize);
    var sortedIndex = 0;
    var i;

    for (i = 0; i < array.length; i++) {
      // Change the value to a zero-based index
      var bucketIndex = array[i] - minValue;
      if (!buckets[bucketIndex]) {
        buckets[bucketIndex] = 0;
      }
      buckets[bucketIndex]++;
    }

    for (i = 0; i < buckets.length; i++) {
      while (buckets[i] > 0) {
        // Change the index to the correct value
        array[sortedIndex++] = i + minValue;
        buckets[i]--;
      }
    }

    return array;
  }

  return algorithm;
}));
