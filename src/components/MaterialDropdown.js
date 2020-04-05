import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { constants } from '../constants/Reducers'

const styles = theme => ({
  resize: {
    fontSize: 12,
  },
  input: {
    height: 30,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
})
const DivWrapper = styled.div`
  display: inline-block;
  @media (max-width: 960px) {
    display: ${props => (props['hideInMobile'] ? 'none' : 'inline-block')};
  }
`
class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    var selected = this.getSelectedFromProps(this.props)
    this.state = {
      selected: selected,
    }
    this.selected = []
    this.handleChange = this.handleChange.bind(this)
    this.getSelectedFromProps = this.getSelectedFromProps.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    var selected = this.getSelectedFromProps(nextProps)
    this.setState({
      selected: selected,
    })
  }

  componentDidUpdate() {
    var selected = this.getSelectedFromProps(this.props)
    this.selected = selected
  }

  componentDidMount() {
    this.handleOrientation()
  }
  getSelectedFromProps(props) {
    var selected
    if (props.value === null && props.options.length !== 0) {
      selected = props.options[0][props.valueField]
    } else {
      selected = props.value
    }
    return selected
  }
  handleChange(e, index, value) {
    if (this.props.onChange) {
      var change = {
        oldValue: this.state.selected,
        newValue: e.target.value,
      }
      this.props.onChange(change)
    }
    this.setState({ selected: value })
  }
  handleOrientation() {
    var self = this
    if ('onresize' in window) {
      self.setState({
        orientation: !self.state.orientation,
      })
      window.addEventListener(
        'resize',
        function() {
          self.setState({
            orientation: !self.state.orientation,
          })
        },
        false
      )
    }
  }
  render() {
    var self = this
    let { classes } = this.props
    var options = self.props.options.map(option => (
      <option
        className={classes.resize}
        id={self.props.id + option[self.props.valueField]}
        key={option[self.props.valueField]}
        value={option[self.props.valueField]}
      >
        {option[self.props.labelField]}
      </option>
    ))
    var value = this.state.selected ? this.state.selected : this.selected
    var disabled = false
    if (
      (!this.state.selected || value === constants.notAvailable) &&
      !this.selected
    ) {
      disabled = true
      value = constants.notAvailable
      options = []
      options.push(
        <option
          key="Not Available"
          value="Not Available"
          primaryText="Not Available"
        >
          Not Available{' '}
        </option>
      )
    }
    return (
      <DivWrapper hideInMobile={this.props.hideInMobile}>
        <TextField
          disabled={disabled}
          id={this.props.name}
          select
          className={classes.textField}
          value={value}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputProps={{
            className: classes.input,
            readOnly: this.props.inputProps ? this.props.inputProps : false,
          }}
          style={{
            width: this.props.width ? this.props.width : '100px',
          }}
        >
          {options}
          ))}
        </TextField>
      </DivWrapper>
    )
  }
}
Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  valueField: PropTypes.string,
  labelField: PropTypes.string,
  onChange: PropTypes.func,
}
Dropdown.getDefaultProps = {
  value: null,
  valueField: 'value',
  labelField: 'label',
  onChange: null,
}

export default withStyles(styles)(Dropdown)
