To reliably handle session invalidation, implement server-side token verification in addition to the `onAuthStateChanged` listener.  Periodically send a request to your backend to validate the Firebase ID token. If the token is invalid, explicitly sign the user out in your app. 

Here's an example integrating token verification (replace with your backend API endpoint):

```javascript
// ... Firebase initialization ...

firebase.auth().onAuthStateChanged(user => {
  // ... your existing code ...
});

setInterval(async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    try {
      const response = await fetch('/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken: user.getIdToken() })
      });
      if (!response.ok) {
        // Token is invalid, sign out the user
        await firebase.auth().signOut();
        console.log('User signed out due to invalid token');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }
}, 5000); // Verify every 5 seconds

```
Your backend `/verifyToken` endpoint should verify the token against the Firebase Admin SDK.