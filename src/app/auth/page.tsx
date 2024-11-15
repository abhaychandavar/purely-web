import { ThemeProvider } from "next-themes";
import PhoneSignIn from "./components/phoneSignin";
import TopBar from "./components/topBar";
import OtpView from "./components/otp";

const Auth = () => {
    return (
        <main className="h-screen flex flex-col items-center">
            <TopBar />
            <div className="w-[90%] md:w-full h-full flex justify-center items-center">
                <ThemeProvider attribute="class">
                    <PhoneSignIn />
                    {/* <OtpView /> */}
                </ThemeProvider>
            </div>
        </main>
    )
}

export default Auth;