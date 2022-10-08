import Avatar from "@material-ui/core/Avatar";
import React, {useState,useEffect} from 'react';
import "./Profile.css";
import Post from "../post/Post";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {useParams} from "react-router-dom";
import {Modal,Backdrop, Box,styled} from '@mui/material';


const style = {
  position: 'absolute',
  border:'5%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: ' #E5ECF8',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Profile() {
    const [posts, setPosts] = useState ([]);
    const [user, setUsers] = useState([]);
    const [followed, setFollowed] = useState ([]);
    const [follower, setFollower] = useState ([]);
    const [unfollow, setUnFollow] = useState ([]);
    const [checkFollow, setCheckFollow] = useState ();
    const { username } = useParams();
    const name = username;
    const [modal, setModal] = useState(false);
    const token = window.localStorage.getItem("currentUser");
    const toggleModal = () => {
        setModal(!modal);
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    useEffect(async () => {
            fetchPosts();
            fetchUsers();
            fetchFollower();
            //fetchFollowed();
            const check = await fetchCheckFollow();
            setCheckFollow(check.data);
        },
        []);

    const fetchPosts= async()=>{
        const postResponse = await axios.get('http://localhost:8081/api/posts/user/'+name);
        setPosts(postResponse.data);

    }

    const fetchCheckFollow = async()=>{
         return await axios.post("http://localhost:8081/api/follow/checkFollow",{
            id : 2,
            followerUserName: JSON.parse(token).username,
            followedUserName: name
        });

    }

    const fetchFollowed= async()=>{
        const followedResponse = await axios.get('http://localhost:8081/api/follow/followed/'+name);
        setFollowed(followedResponse.data);

    }
    const fetchFollower= async()=>{
        const followerResponse = await axios.get('http://localhost:8081/api/follow/follower/'+name);
        setFollower(followerResponse.data);


    }
    const fetchUsers = async  ()=>{
        const userResponse = await axios.get('http://localhost:8081/api/users/getByUsername/'+name);
        setUsers(userResponse.data);


    }
    const toggleFunction = async ()=>{
        if(!checkFollow){
            setCheckFollow(!checkFollow);
            const createFollow = await axios.post("http://localhost:8081/api/follow",{
                followerUserName: JSON.parse(token).username,
                followedUserName: name
            });
        }else{
            await axios.post("http://localhost:8081/api/follow/deleteFollow",{
                id : 2,
                followerUserName: JSON.parse(token).username,
                followedUserName: name
            });
            setCheckFollow(!checkFollow);
        }
    }



    if(name===JSON.parse(token).username){
        return(

            <div className="profile">
                <Grid justifyContent="center" container spacing={2}>
                <Grid item xs={8} sx={{marginTop:"20px"}}>
                <Card>
                    <div className="divUser">
                        <div className="username">
                            <h1>
                                {user.username}
                            </h1>
                        </div>
                        <div className="followButton">
                            <a href={ `/savePost/${JSON.parse(token).username}`}>Save</a>
                        </div>
                    </div>

                        <button className="text_post"><strong>{posts.length}</strong> posts </button>
                        <button className="text_follow" onClick={() => handleOpen()}><strong>{follower.length}</strong> following</button>



                      </Card>
                      </Grid>
                        <Grid item xs={8} sx={{marginTop:"20px"}}>

                            {
                                posts && posts.map(post => (

                                        <Post username={post.name} language={post.language} caption={post.caption} comments={post.comments} code={post.code} like={post.likeCount} id={post.id}  originId={post.originId} originName={post.originName} />

                                    )
                                )}
                        </Grid>

                </Grid>
                <Modal
                  onClose={handleClose}
                  open={open}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
          <Box sx={style} >
                  <h2>Following :</h2>
                  { follower.map((follow) =>
                      <h3 key={follow.toString()}>{follow.followedUserName}</h3>
                  )}
          </Box>
        </Modal>
            </div>

        );
    }else{
        return(

            <div className="profile">
                <Grid justifyContent="center" container spacing={2}>
                <Grid item xs={8} sx={{marginTop:"20px"}}>
                <Card>
                    <div className="divUser">
                        <div className="username">
                            <h1>
                                {user.username}
                            </h1>
                        </div>
                        {checkFollow===true ?(
                            <div className="followButton">
                                <button onClick={toggleFunction} className="Button">Unfollow</button>
                            </div>
                            ):(
                            <div  className="followButton">
                                <button onClick={toggleFunction} className="Button">Follow</button>
                            </div>
                            )
                        }

                    </div>
                        <button className="text_post"><strong>{posts.length}</strong> posts </button>
                        <button className="text_follow" onClick={() => handleOpen()}><strong>{follower.length}</strong> following </button>
                </Card>
                </Grid>

                <Grid item xs={8} sx={{marginTop:"20px"}}>

                            {
                                posts && posts.map(post => (

                                        <Post username={post.name} language={post.language} caption={post.caption} comments={post.comments} code={post.code} like={post.likeCount} />

                                    )
                                )}
                        </Grid>

                </Grid>
                <Modal
                  onClose={handleClose}
                  open={open}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
          <Box sx={style} >
                  <h2>Following :</h2>
                  { follower.map((follow) =>
                      <h3 key={follow.toString()}>{follow.followedUserName}</h3>
                  )}
          </Box>
        </Modal>
            </div>

        );
    }

}

export default Profile;
