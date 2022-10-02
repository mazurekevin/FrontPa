import './Navbar.css';
import {useState} from 'react';
import Button from "@material-ui/core/Button";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {goToSignOut, goToHome, goToSignIn} from "../../services/routing.service";
function Navbar_connected() {
    const userSignOut = () => {
        window.localStorage.removeItem("currentUser");
        goToSignIn();
    }

    const [user, setUser] = useState('');
    /*const fetchUser=async()=>{
                  const userResponse = await axios.get('http://localhost:8081/api/users');
                  setUsers(userResponse.data);
              }*/
    return (

        <div >
            <AppBar sx={{backgroundColor: "#2A31B7"}}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}, marginRight: 10}}
                    >
                        <img className={"img"} src={require('../../logo.png')} height="50"  alt="logo" onClick={() => goToHome()}/>
                    </Typography>

                    <Box className="nav-menu" >
                        <Button className="button"
                            onClick={() => userSignOut()}
                        > Sign Out </Button>
                        <span className="pseudo">{JSON.parse(window.localStorage.getItem("currentUser")).username}</span>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar_connected;
