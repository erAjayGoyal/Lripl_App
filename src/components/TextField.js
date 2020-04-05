import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  textField: {
    width: 100,
    borderRadius: 4,
    height: 30,
    verticalAlign: 'middle',
    backgroundColor: '#ffffff',
  },
  resize: {
    fontSize: 13.7,
    padding: 8,
    paddingLeft: 7,
    paddingTop: 8,
  },
  input: {
    height: 30,
    top: 0,
    paddingLeft: 5,
  },
})

class TextFields extends React.Component {
  constructor(props) {
    super(props)
    if (props.inputProps) {
      this.inputProps = props.inputProps
    }
  }

  render() {
    //Use other to capture only the props you're not using
    const { classes, ...other } = this.props

    return (
      <textStyles>
        <TextField
          {...other}
          variant="outlined"
          id={this.props.id ? this.props.id : 'txt_textField'}
          InputProps={{
            classes: {
              input: classes.resize,
            },
            className: classes.input,
            maxLength: 10,
          }}
          className={classes.textField +" " +  this.props.className}
          style = {this.props.style}
        />
      </textStyles>
    )
  }
}

export default withStyles(styles)(TextFields)
