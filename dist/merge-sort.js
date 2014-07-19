(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.mergeSort = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.mergeSort = factory();
  }
}(this, function () {
  'use strict';

  function sort(array, compareFunc) {
    if (array.length <= 1) {
      return array;
    }

    var i;
    var middle = Math.floor(array.length / 2);
    var left = new Array(middle);
    var right = new Array(array.length - middle);

    for (i = 0; i < left.length; i++) {
      left[i] = array[i];
    }
    for (i = 0; i < right.length; i++) {
      right[i] = array[i + left.length];
    }

    return merge(sort(left, compareFunc),
                 sort(right, compareFunc), compareFunc);
  }

  function merge(left, right, compareFunc) {
    var result = new Array(left.length + right.length);
    var leftIndex = 0;
    var rightIndex = 0;
    var resultIndex = 0;

    while (leftIndex < left.length || rightIndex < right.length) {
      if (leftIndex < left.length && rightIndex < right.length) {
        if (compare(left[leftIndex], right[rightIndex], compareFunc) <= 0) {
          result[resultIndex++] = left[leftIndex++];
        } else {
          result[resultIndex++] = right[rightIndex++];
        }
      } else if (leftIndex < left.length) {
        result[resultIndex++] = left[leftIndex++];
      } else if (rightIndex < right.length) {
        result[resultIndex++] = right[rightIndex++];
      }
    }
    return result;
  }

  function compare(a, b, compareFunc) {
    if (compareFunc) {
      return compareFunc(a, b);
    }
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }

  return { sort: sort };
}));
