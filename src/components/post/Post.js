import React, {useState,useRef} from 'react';
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import Editor from "@monaco-editor/react";
import Card from '@mui/material/Card';
import {
    CardHeader,
    CardContent,
    Box,
    CardActions,
    Collapse,
    Avatar,
    Typography,
    FavoriteIcon,
    ShareIcon,
    Alert
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import "./Post.css";
import Navbar_code from "../navbar/Navbar-code";
import Axios from 'axios';
import {goToProfile, goToHome, goToAddPost} from "../../services/routing.service";
import  {sendComment} from "../../services/posts.service";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Modal,Backdrop} from '@mui/material';




interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

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

function Post({username,caption,comments,code,language,like,id,originName,savePostId,myPseudo,originId,setpost}) {
    const user = window.localStorage.getItem("currentUser");
    const [contentLanguage,setContentLanguage] = useState("");
    const handleLike = () => {
        axios.put("http://localhost:8080/api/posts/"+id,{
                name : username,
                code: userCode,
                language: userLang,
                caption: caption, likeCount: like+1
                })
                setLiked(true);
        alert('Thank you! That post has '+ like+1 +'likes now');

    }
        const handleDisLike = () => {
            axios.put("http://localhost:8080/api/posts/"+id,{
                    name : username,
                    code: userCode,
                    language: userLang,
                    caption: caption, likeCount: like-1
                    })
                    setLiked(false);
        alert('Post has '+ like-1 +'likes now');
        }


    const handleEdit = () => {
        axios.put("http://localhost:8080/api/posts/"+id,{
        name : username,
        code: userCode,
        language: userLang,
        caption: caption, likeCount: like
        })
        alert('Post has been successfully Updated');
    }
    const [comment, setComment] = useState("");

    const fetchPosts= async()=>{
        return await axios.get('http://localhost:8080/api/posts');

    }

    function createSave(){
        alert("This post has been saved !!! ")
        if(originId!=null){
            Axios.post("http://localhost:8080/api/SavePosts", {
                myPseudo : JSON.parse(user).username,
                name : username,
                code: userCode,
                language: userLang,
                caption: caption,
                like: 0,
                originId: originId,
                originName: originName});
        }else{
            Axios.post("http://localhost:8080/api/SavePosts", {
                myPseudo : JSON.parse(user).username,
                name : username,
                code: userCode,
                language: userLang,
                caption: caption,
                like: 0,
                originId: id,
                originName: originName});
        }

    }

    function  postComment(){
         Axios.post("http://localhost:8080/api/posts/"+id+"/comments", {
                                        username : JSON.parse(user).username,
                                        body: comment,
                                        })
             .then(async function (response) {
                 const data = await fetchPosts()
                 setpost([])
                 setpost(data.data)
                 setComment("")
             });

    }

    function deletePost(){
        if(myPseudo===undefined){
            Axios.delete("http://localhost:8080/api/posts/"+id);
            window.location.reload(false);
        }else{
            Axios.delete("http://localhost:8080/api/SavePosts/"+savePostId);
            window.location.reload(false);
        }

    }
    
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // source code
    let [userCode, setUserCode] = useState(code);

//  language
    let [userLang, setUserLang] = useState(language);

    // State variable to set users input
    const [userInput, setUserInput] = useState("");

// output
    const [userOutput, setUserOutput] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


// hop on compile merci

    function compile() {
        if (userCode === ``) {
            return
        }

        // envoie la sauce
        Axios.post(`https://serverpa.herokuapp.com/compile`, {
            code: userCode,
            language: userLang,
            input: userInput}).then((res) => {
            if(res.data.success) {
                setUserOutput(res.data.output);
                setOpen(true);

            }else{
                setUserOutput(res.data.error);
                setOpen(true);
            }
        }).catch((error)=>{
            console.log(error)
        })

    }
    function save(){
        console.log('SAVED!')
    }
// efface moi le resultat graciac
    function clearOutput() {
        setUserOutput("");
    }

    if(code ==""){
        userCode = "# Enter Your Code Here ...";
    }


    return(

        <Card sx={{  marginTop: '20px'}}>
            <CardHeader
                avatar={
                <a href={ `/profile/${username}`}>
                    <Avatar sx={{ bgcolor: "#2878EC" }}  aria-label="recipe"/>
                </a>
                }
                action={

                (username != JSON.parse(user).username)?
                    (<IconButton aria-label="settings">
                        { liked? (<Button onClick={handleDisLike}> DisLike </Button>)
                            :
                            <Button onClick={handleLike}> Like </Button>
                        }
                        {originId!==null&&
                            <div>
                                <Button href={ `/originalPost/${originId}`}>Show original</Button>
                            </div>
                        }
                        {myPseudo===JSON.parse(user).username &&
                            <div>
                                <Button href={ `/addPostData/${savePostId}`}>Update</Button>
                            </div>

                        }
                        <Button onClick={()=> createSave() }>save</Button>


                    </IconButton>)
                    :
                    (<IconButton aria-label="settings">
                        <Button onClick={() => handleEdit()}> Edit </Button>
                        <Button onClick={()=> createSave()}>save</Button>
                            <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this post?')) deletePost() } }>
                                <Button className="Button">delete</Button>
                            </div>



                            {originId!==null&&
                                <div>
                                    <Button href={ `/originalPost/${originId}`}>Show original</Button>
                                </div>
                            }
                            {myPseudo===JSON.parse(user).username &&
                                <div>
                                    <Button href={ `/addPostData/${savePostId}`}>Update</Button>
                                </div>

                            }
                    </IconButton>
                    )

                }
                title={<b>{username} / Origin by <a href={ `/profile/${originName}`}>{originName}</a></b>}
                //title={<b>test{originName}</b>}
            />



            <CardContent >
                <Typography variant="body2" color="text.secondary">
                    Description: {caption}
                </Typography>
            </CardContent>
            <div className="App">
                <Navbar_code
                    userLang={userLang} setUserLang={setUserLang}

                />
                
                <div className="main">
                    <div className="left-container">
                        <Editor

                            padding={15}
                            style={{

                                fontSize: 12,
                                backgroundColor: "#000000",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                            theme="vs-dark"
                            language={language? (language) : (userLang)}
                            defaultLanguage={language}

                            value={code? (code): ("# Enter Your Code Here ...")}
                            onChange={(value) => { setUserCode(value) }}
                        />
                        <button className="run-btn" onClick={() => compile()}>
                            Run
                        </button>

                        <div className="right-container">
                            <h4 className="text-inp">Input:</h4>
                            <div className="input-box">
                                <textarea id="code-inp" onChange=
                                    {(e) => setUserInput(e.target.value)}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {myPseudo!==undefined ?(
                <div>
                </div>
            ):(
                <div>
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <div className="post__comments">
                                {comments.map((comment) => (
                                    <p>
                                        <strong>{comment.username}</strong> {comment.body}
                                    </p>
                                ))}
                            </div>
                            <div className="post_commentBox">
                                <Input
                                    className="post_input"
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <Button
                                    className="post_button"
                                    disabled={!comment}
                                    type="submit"
                                    onClick={postComment}
                                >
                                    Post
                                </Button>
                            </div>
                        </CardContent>
                    </Collapse>

                    <Modal
                        onClose={handleClose}
                        open={open}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{timeout: 500,}}
                    >
                        <Box sx={style} >
                            <pre style={{minHeight:"200px", backgroundColor:" #E5ECF8",color:"black"}}>{userOutput}</pre>
                            <button onClick={() => { clearOutput() }}
                                    className="clear-btn">
                                Clear
                            </button>
                        </Box>
                    </Modal>

                </div>
            )
            }



        </Card>
    )
}

export default Post

