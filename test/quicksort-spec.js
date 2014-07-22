var testHelper = require("./test-helper");
var algorithm = require("../src/quicksort");

describe("quicksort", function () {
  testHelper.runIntegerTests(algorithm);
  testHelper.runStringTests(algorithm);
  testHelper.runCustomComparisonTests(algorithm);
});
