/**
 * patch.js is used for adding methods to existing built-in objects to enhance convenience
 */
/**
 * Adds `removeAllChildren` to Node object.
 */
Node.prototype.removeAllChildren = function () {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
};

// add forEach to the NodeList and HTMLCollection objects
NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;
// mozilla bug that returns HTMLCollection instead of NodeList https://bugzilla.mozilla.org/show_bug.cgi?id=14869
