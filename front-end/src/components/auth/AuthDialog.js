import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPass from "./ForgotPass";
import './auth.modul.css';
const AuthDialog = ({onClose, authState='signin'}) => {
    const [currentView, setCurrentView] = useState(authState);

    const switchView = (view) => {
        setCurrentView(view);
    }

    return (
        <div className="auth-dialog">
            <div className="authDialogOverlay">
                {currentView === 'signin' && (
                    <SignIn 
                        onSwitchToSignUp={() => switchView('signup')}
                        onSwitchToForgotPass={() => switchView('forgotpass')}
                        onClose={onClose}
                    />
                )}
                {currentView === 'signup' && (
                    <SignUp 
                        onSwitchToSignIn={() => switchView('signin')}
                        onClose={onClose}
                    />
                )}
                {currentView === 'forgotpass' && (
                    <ForgotPass 
                        onSwitchToSignIn={() => switchView('signin')}
                        onClose={onClose}
                    />
                )}
            </div>
            </div>
    )
}

export default AuthDialog;