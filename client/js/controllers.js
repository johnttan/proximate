angular.module('proximate')

.controller('MainController', function($scope, PubNub, pubNubKeys) {
  if (!PubNub.initialized()) {
    PubNub.init({
      // jscs: disable requireCamelCaseOrUpperCaseIdentifiers
      subscribe_key: pubNubKeys.sub,
      publish_key: pubNubKeys.pub
      // jscs: enable requireCamelCaseOrUpperCaseIdentifiers
    });
  }
});