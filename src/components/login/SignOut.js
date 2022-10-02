import React from 'react';

function SignOut(){
    const userSignOut = window.localStorage
    return(
        <div>
            {userSignOut.removeItem("currentUser")}

        </div>

    );
}

export default SignOut;