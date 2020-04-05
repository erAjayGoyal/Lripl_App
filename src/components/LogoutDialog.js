import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import Divider from "@material-ui/core/Divider";
import "../styles/global-styles.scss";
import "../styles/logoutdialog.scss";
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

class LogoutDialog extends React.Component {
    state = {
        open: false,
    };

    negativeAction = () => {
      console.log('dialog close');
      this.props.negativeActionCallBack();
    };

    positiveAction = () => {
this.props.positiveActionCallBack();
    }


    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.negativeAction}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <div className="dialog-header">{this.props.title}</div>
                    <Divider className="header-divider" />
                    <div className="dialog-message">{this.props.message}</div>
                    <DialogActions>
                    <Button variant="contained" color="primary" className="negative-button-color" onClick={this.negativeAction}>
                        NO
                    </Button>
                    <Button variant="contained" className="positive-button-color" onClick={this.positiveAction}>
                        YES
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

LogoutDialog.propTypes = {
    open: PropTypes.bool,
    negativeActionCallBack: PropTypes.func,
    positiveActionCallBack: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    positiveButtonText: PropTypes.string,
    negativeButtonText: PropTypes.string,
}

export default LogoutDialog;