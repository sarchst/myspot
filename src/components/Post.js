import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Avatar, Button, Grid, IconButton, Link, Menu, MenuItem, Paper } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import ReplyIcon from '@material-ui/icons/Reply';
import ShareIcon from '@material-ui/icons/Share';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1
    },
    paper: {
        display: 'flex',
        padding: 10,
        borderRadius: 16,
    },
    display: {
        display: 'flex',
        padding: 0,
        borderRadius: 12,
        margin: 5
    },
    content: {

    },
    button: {
        padding: 0,
        width: 30,
        height: 30,
        fontSize: "0.6rem",
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    buttongroup: {
        margin: 0,
        padding: 0
    },
    moreGid: {
        maxWidth: 50
    },
    media: {
        // media style
    }
};

const menuOptions = [
    'edit',
    'delete',
    'report'
]

const user = {
    id: 7,
    username: "FreeBird_86"
}

class Post extends Component {
    state = {
        moreOptions: false,
        anchor: null,
        userID: 1,
        username: "BOB_STAR_123",
        content: "Check out this new playlist by ChilledCow!",
        title: "Study Beats",
        type: "playlist",
        usersLiked: [2, 3, 4, 5, 6],
    }

    gotToMedia = () => {
        // TODO GOTO media
    }

    like = (id) => {
        if (!this.state.usersLiked.includes(id)) {
            this.setState({ usersLiked: [...this.state.usersLiked, id] });
        }
    }

    repost = (post) => {
        // create new post
        console.log(post);
    }

    share = (type) => {
        // TODO share spotify media
        console.log(type);
    }

    addPostMedia = (type) => {
        // TODO: add song, album, or playlist
        console.log(type);
    }

    openMoreOptions = e => {
        console.log(e);
        this.setState({
            moreOptions: true,
            anchor: e.currentTarget
        });
    }

    closeOptions = () => {
        this.setState({ moreOptions: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Grid
                    item
                    container
                    xs
                    spacing={1}
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Avatar className={classes.display}>DP</Avatar>
                    </Grid>
                    <Grid item>
                        {this.state.username}
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid
                        item
                        container
                        xs={10}
                        spacing={2}
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            {this.state.content}
                        </Grid>
                        <Grid item>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => this.gotToMedia()}
                            >
                                {this.state.title}
                            </Link>

                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs
                        className={classes.moreGrid}
                        justify="flex-end"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(e) => this.openMoreOptions(e)}
                                className={classes.button}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Grid>
                        <Menu
                            id="options-menu"
                            anchorEl={this.state.anchor}
                            keepMounted
                            open={this.state.moreOptions}
                            onClose={this.closeOptions}
                            PaperProps={{
                                style: {
                                    maxHeight: 300,
                                    width: '20ch',
                                },
                            }}
                        >
                            {menuOptions.map((option) => (
                                <MenuItem key={option} onClick={() => this.closeOptions()}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                    <Grid
                        item
                        container
                        className={classes.buttongroup}
                        direction='row'
                        justify="flex-end"
                        alignItems="flex-end"
                    >
                        <Grid item>
                            <IconButton
                                className={classes.button}
                                size="small"
                                aria-label="like"
                                aria-controls="like-post"
                                onClick={() => this.like(user.id)}
                                color={this.state.usersLiked.includes(user.id) ? "primary" : "default"}
                            >
                                {this.state.usersLiked.length}
                                <EmojiEmotionsIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                className={classes.button}
                                size="small"
                                aria-label="repost"
                                aria-controls="repost-post"
                                onClick={() => this.repost(this.state)}
                            >
                                <ReplyIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                className={classes.button}
                                size="small"
                                aria-label="share"
                                aria-controls="share-post"
                                onClick={() => this.share(this.state.type)}
                            >
                                <ShareIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                className={classes.button}
                                size="small"
                                aria-label="add"
                                aria-controls="add-media"
                                onClick={() => this.addPostMedia(this.state.type)}
                            >
                                <LibraryAddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
)(Post);