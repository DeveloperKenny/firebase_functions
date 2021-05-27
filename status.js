// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        setupUI(user);
      });
      db.collection('guides').onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
      }, err => console.log(err.message));
    } else {
      setupUI();
      setupGuides([]);
    }
  });