import './Navbar.css';
import Button from "@material-ui/core/Button";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {goToSignIn, goToSignUp, goToSignOut,goToHome,goToProfile} from "../../services/routing.service";

function Navbar() {

    const token = window.localStorage.getItem("currentUser");
    const userSignOut = () => {
        window.localStorage.removeItem("currentUser");
        goToSignIn();
    }
    return (

        <div >
            <AppBar sx={{backgroundColor: "#2878EC"}}>
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{mr: 2, display: {xs: 'none', md: 'flex'}, marginRight: 10}}
                >
                    <img className={"img"} src={require('../../logo.png')} height="50"  alt="logo" onClick={() => goToHome()}/>
                </Typography>
            {token ? (
                       <Box className="nav-menu" >
                            <label className="button"
                                 onClick={() => userSignOut()}>Sign Out </label>
                            <label  onClick={() => goToProfile(JSON.parse(token).username)} className="pseudo">
                                    {JSON.parse(token).username}
                            </label>
                       </Box>
                    ) : (

                        <Box className="nav-menu" >
                             <label className="button" onClick={() => goToSignIn()}
                                     >Sign In</label>
                             <label className="button" onClick={() => goToSignUp()}
                                    > Sign Up </label>
                        </Box>
                    )
            }

            </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
