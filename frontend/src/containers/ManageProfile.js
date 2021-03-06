import React, { useState } from 'react';
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import Navbar from '../components/Navbar/Navbar';

import { postUpdateProfile } from '../actions/users';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#EFEFEF",
        height: "100vh"
    },
    container: {
        padding: '0px 10%'
    },
    manageProfileForm: {
        padding: "2em",
        backgroundColor: "white",
        width: "50%",
        height: "500px",
        borderRadius: "8px"
    },
    profileSetting: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "1em",
    },
    profileSettingLabel: {
        fontStyle: "bold"
    },
    updateLink: {
        cursor: "pointer",
        color: "#D1305E"
    }
  }));


function ManageProfile(props) {
    const classes = useStyles();
    const container = ['container-fluid', classes.container];

    const [textDisplayName, setTextDisplayName] = useState('');
    const [textGHURL, setTextGHURL] = useState('');

    const onTextChange = (e) => {
        switch (e.target.id) {
            case 'textDisplayName':
                setTextDisplayName(e.target.value);
                break;
            case 'textGHURL':
                setTextGHURL(e.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <div 
            className={classes.root}
        >
            <Navbar />
            <div className={container.join(' ')}>
                <div className='row align-items-start' >
                 
                    <div className={classes.manageProfileForm}>
                        <h2>Manage Profile</h2>

                        <hr></hr>

                        <span>Display Name:</span>
                        <div className={classes.profileSetting}>
                            <InputBase
                                id='textDisplayName'
                                className={classes.textField}
                                placeholder={props.author.displayName}
                                value={textDisplayName}
                                onChange={onTextChange}
                                fullWidth
                            /> 
                            <span 
                                className={classes.updateLink}
                                // onClick={() => console.log(`Send request to update Display Name to ${textDisplayName}`)}
                                onClick={() => props.postUpdateProfile({ ...props.author, displayName: textDisplayName }, props.token)}
                            >
                                Update
                            </span>
                        </div>
                       
                        <span>GitHub URL:</span>
                        <div className={classes.profileSetting}>
                            <InputBase
                                id='textGHURL'
                                className={classes.textField}
                                placeholder={props.author.github}
                                value={textGHURL}
                                onChange={onTextChange}
                                fullWidth
                            />
                            <span 
                                className={classes.updateLink}
                                // onClick={() => console.log(`Send request to update GH Url to ${textGHURL}`)}
                                onClick={() => props.postUpdateProfile({ ...props.author, github: textGHURL }, props.token)}
                            >
                                Update
                            </span>            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    author: state.users.user, // use this instead of temp_
    token: state.users.basic_token,
});
  
// export default ManageProfile;
export default connect(mapStateToProps, { postUpdateProfile })(ManageProfile);
