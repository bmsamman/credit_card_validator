import StorageObject from 'ember-local-storage/local/object';
// or use sessionStorage
// `import StorageObject from 'ember-local-storage/session/object';`

export default StorageObject.extend({
  storageKey: 'my-app-settings',
  initialContent: {
    welcomeMessageSeen: false
  }
});