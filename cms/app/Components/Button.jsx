import { useGoogleLogin } from '@react-oauth/google';
 import axios from 'axios';

 const GoogleSignInButton = () => {
   const login = useGoogleLogin({
     clientId: '274081134055-m9e1ffso70opcdam54ul59rhe90uhct2.apps.googleusercontent.com',
     onSuccess: async codeResponse => {
       try {
         const userInfo = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: 'application/json'
            }
            
          }
        );
         // Send userInfo to backend
         console.log(userInfo)
       } catch (err) {
         console.log(err)
       }
     },
     onError: error => console.log('Login Failed:', error),
   });

   return (
     <button onClick={() => login()}>
       Sign in with Google
     </button>
   );
 };

 export default GoogleSignInButton;