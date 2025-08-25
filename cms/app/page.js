import Image from "next/image";
import Form from "./form/page";
// import LoginPage from "./login/page";
// import LoginForm from "./Components/LoginForm";
import GoogleLogin from "./Components/Googlelogin";
import GoogleAppwriteButton from './Components/GoogleAppwriteButton'; 



export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

      <GoogleAppwriteButton/> 


    {/* Client secret 
    
    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



    Client ID 



    583794709759-kud28fmfvr7mck14fshak0e2kmnai8sm.apps.googleusercontent.com
    
    
    
     */}


    </div>
  );
}
