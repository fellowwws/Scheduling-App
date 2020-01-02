const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
const generator = require('generate-password');
const { format } = require('date-fns');

admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

// Globals improve cold start time;
const auth = admin.auth();
const firestore = admin.firestore();

function checkCredentials(context) {
  if (!context.auth) {
    // Throw an HttpsError if the user is not authenticated;
    throw new functions.https.HttpsError(
      'failed-precondition', 'The function must be called while authenticated'
    );
  }
  if (!context.auth.token.admin) {
    // Throw an HttpsError if the user is not an admin
    throw new functions.https.HttpsError(
      'permission-denied', 'The caller does not have permission to execute the specified operation'
    );
  }
}

function sendWelcomeEmail(user) {
  const message = {
    to: user.email,
    from: 'noreply@rota-app-65e11.firebaseapp.com',
    templateId: 'd-40e2bb2753114d949ac74ace024cd939',
    dynamic_template_data: {
      name: user.name,
      password: user.password
    }
  }
  return sgMail.send(message)
    .then(() => console.log('Message sent!'))
    .catch(error => console.log('Error sending message', error))
}

function sendRotaPublishedEmail(rota) {
  return auth.listUsers(1000)
    .then(listUsersResult => {
      listUsersResult.users.forEach(({email, displayName}) => {
        const message = {
          to: email,
          from: 'noreply@rota-app-65e11.firebaseapp.com',
          templateId: 'd-8864eefae9304497a8080251a2c6f630',
          dynamic_template_data: {
            name: displayName ? displayName.split(" ")[0] : 'User',
            date: format(rota.date.toDate(), 'd MMMM yyyy')
          }
        };

        return sgMail.send(message)
          .then(() => console.log('Message sent to:', email))
          .catch(error => console.log('Error sending message', error))
      });
    })
    .catch(error => console.log('Error listing users:', error));
}

function sendRotaUpdatedEmail(rota) {
  return auth.listUsers(1000)
    .then(listUsersResult => {
      listUsersResult.users.forEach(({email, displayName}) => {
        const message = {
          to: email,
          from: 'noreply@rota-app-65e11.firebaseapp.com',
          templateId: 'd-00674b99a887424c9ee93623451da9ab',
          dynamic_template_data: {
            name: displayName ? displayName.split(" ")[0] : 'User',
            date: format(rota.date.toDate(), 'd MMMM yyyy')
          }
        };

        return sgMail.send(message)
          .then(() => console.log('Message sent to:', email))
          .catch(error => console.log('Error sending message', error))
      });
    })
    .catch(error => console.log('Error listing users:', error));
}

exports.sendPasswordChangedEmail = functions
  .region('europe-west2')
  .https.onCall((data, context) => {
  
  checkCredentials(context);
  
  const message = {
    to: data.email,
    from: 'noreply@rota-app-65e11.firebaseapp.com',
    templateId: 'd-d3633f6c8f9c4da1b06ed60587df3e6d',
    dynamic_template_data: {
      name: data.displayName ? data.displayName.split(" ")[0] : 'User'
    }
  }

  return sgMail.send(message)
    .then(() => console.log('Message sent!'))
    .catch(error => console.log('Error sending message', error))
});

// exports.createInitialUser = functions.https.onRequest((req, res) => {
//   auth.createUser({
//     email: req.query.email,
//     password: 'password',
//     displayName: req.query.displayName,
//   })
//   .then(userRecord => {
//     console.log('Successfully created new user:', userRecord.uid);
//     res.status(200).send();
//   })
//   .catch(error => {
//     console.log('Error creating new user:', error);
//     res.status(500).send();
//   });
// });

// exports.grantAdminPrivilege = functions.https.onRequest((req, res) => {
//   auth.getUserByEmail(req.query.email)
//     .then(user => {
//       auth.setCustomUserClaims(user.uid, {
//         admin: true
//       });
//       res.status(200).send();
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).send();
//     });
// });

exports.createUser = functions.
  region('europe-west2')
  .https.onCall((data, context) => {

  checkCredentials(context);

  var password = generator.generate({
    length: 10,
    numbers: true
  });

  return auth.createUser({
    displayName: `${data.name.first} ${data.name.last}`,
    email: data.email, 
    password
  })
  .then(user => {
    console.log('Successfully created new user:', user.uid)
    sendWelcomeEmail({
      name: data.name.first,
      email: data.email,
      password
    });
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
    throw new functions.https.HttpsError(
      'already-exists', 'The provided email is already in use by an existing user. Each user must have a unique email.'
    );
  });
});

exports.createUserRecord = functions.
  region('europe-west2')
  .auth.user()
  .onCreate(user => {

  return firestore
    .collection('users')
    .doc(user.uid)
    .set({
      uid: user.uid,
      name: {
        first: user.displayName.split(" ")[0],
        last: user.displayName.split(" ")[1]
      },
      email: user.email
    })
    .then(() => console.log('Successfully written user record:', userRecord))
    .catch(error => console.error("Error writing user record: ", error));
});

exports.deleteUserRecord = functions.
  region('europe-west2')
  .https.onCall((user, context) => {

  checkCredentials(context);

  return firestore
    .collection('users')
    .doc(user.uid)
    .delete()
    .then(() => console.log('Successfully deleted user record', user.uid))
    .catch(error => console.log('Error deleting user record:', error));
});

exports.deleteUser = functions
  .region('europe-west2').firestore
  .document('users/{uid}')
  .onDelete((snap, context) => {
    const userRecord = snap.data();

    return auth.deleteUser(userRecord.uid)
      .then(() => console.log('Successfully deleted user', userRecord.uid))
      .catch(error => console.log('Error deleting user:', error));
  });

exports.updateUserRecord = functions.
  region('europe-west2').https.onCall((user, context) => {
  
  checkCredentials(context);

  return firestore
    .collection('users')
    .doc(user.uid)
    .update({
      name: {
        first: user.name.first,
        last: user.name.last
      }
    })
  .then(() => console.log('Successfully updated user record'))
  .catch(error => console.log('Error updating user record:', error));
});

exports.onRotaPublished = functions
  .region('europe-west2').firestore
  .document('published/{rotaId}')
  .onCreate((snap, context) => {
    const newRota = snap.data();

    sendRotaPublishedEmail(newRota);
  });

exports.onRotaUpdated = functions
  .region('europe-west2').firestore
  .document('published/{rotaId}')
  .onUpdate((change, context) => {
  const updatedRota = change.after.data();

  sendRotaUpdatedEmail(updatedRota);
});