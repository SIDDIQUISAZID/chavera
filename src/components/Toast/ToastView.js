import React, { Component } from 'react';
import ToastService from "./ToastService";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { withStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';

const icons = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    critical: ErrorIcon,
    major: ErrorIcon,
    minor: WarningIcon,
    info: InfoIcon
}

const useStyles = (theme) => {
    return ({
        success: {
            backgroundColor: '#4CAF50',
            color: "#fff"
        },
        warning: {
            backgroundColor: '#FF9800',
            color: "#fff"
        },
        error: {
            backgroundColor: '#F44336',
            color: "#fff"
        },
        critical: {
            backgroundColor: '#F44336',
            color: "#fff"
        },
        major: {
            backgroundColor: '#FF7400',
            color: "#fff"
        },
        minor: {
            backgroundColor: '#FFE000',
            color: "rgba(0, 0, 0, 0.87)"
        },
        info: {
            backgroundColor: '#2196F3',
            color: "#fff"
        },
        message: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem'
        },
        icon: {
            marginRight: '5px'
        }
    })
}
/**
 * ToastView: Easy way to display dynamic & resuable Toasts that can be used by importing ToastService
 * @param {Toast} Function (icon: string, message: string, duration: integer), pass icon to use, message to display, and duration to display for (in ms).
 */
class ToastView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            icon: "success",
            message: "",
            cb: undefined
        }
    }

    componentDidMount() {
        ToastService.Toast = this.Toast;
        ToastService.Close = this.Close;
    }

    componentWillUnmount() {
        ToastService.reset();
    }

    Toast = (icon, message, duration, cb) => {
        // lowercase icon and default to info if it doesnt exist
        let _icon = (typeof icon === "string") ? icon.toLowerCase() : icon;
        if (icons[_icon] === undefined) {
            console.error(`Toast error: the icon provided ${icon} does not exist. Icon has been defaulted to info.`);
            _icon = "info";
        };
        this.setState({
            open: true,
            icon: _icon,
            message: message,
            cb: cb
        });
        if (duration) {
            setTimeout(() => {
                if (this.state.cb) this.state.cb();
                this.setState({
                    open: false,
                    cb: undefined
                });
            }, duration);
        }
    }

    Close = () => {
        this.setState({
            open: false
        });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        if (this.state.cb) this.state.cb();
        this.setState({
            open: false,
            cb: undefined
        });
    }

    setOpen = (bool) => {
        this.setState({
            open: bool
        });
    }

    render() {
        const Icon = icons[this.state.icon];
        const { classes } = this.props;
        return (
            <>
                <Snackbar
                    className={classes[this.state.icon]}
                    open={this.state.open}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                        'style': { 'backgroundColor': 'inherit', 'color': 'inherit' }
                    }}
                    message={
                        <span id="message-id" className={classes.message}>
                            <Icon className={classes.icon} />
                            {this.state.message}
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                >
                </Snackbar>
            </>
        );
    }
}

export default withStyles(useStyles)(ToastView);
