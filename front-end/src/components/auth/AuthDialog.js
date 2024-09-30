import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPass from "./ForgotPass";

const AuthDialog = () => {
    const [currentView, setCurrentView] = useState('signin');

    const switchView = (view) => {
        setCurrentView(view);
    }

    return (
        <div className="auth-dialog">
            {currentView === 'signin' && (
                <SignIn 
                    onSwitchToSignUp={() => switchView('signup')}
                    onSwitchToForgotPass={() => switchView('forgotpass')}
                />
            )}
            {currentView === 'signup' && (
                <SignUp 
                    onSwitchToSignIn={() => switchView('signin')}
                />
            )}
            {currentView === 'forgotpass' && (
                <ForgotPass 
                    onSwitchToSignIn={() => switchView('signin')}
                />
            )}
        </div>
    )
}

export default AuthDialog;