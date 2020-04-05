import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Style = styled.div`
  .form-control {
    background-color: rgb(234,234,234) ;
    display: inline-block;
    width: 100px;
    height: 31px;
    padding: 3px 12px;
    padding-left: 8px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s,
      -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s,
      -webkit-box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
      -webkit-box-shadow ease-in-out 0.15s;
    @media (max-width: 960px) {
      display: ${props => (props['hideInMobile'] ? 'none' : 'inline-block')};
    }
    option {
    background-color: #fff !important;
padding: 12px 16px !important;
height: 31px !important;
  }
`

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    var selected = this.getSelectedFromProps(this.props)
    this.state = {
      selected: selected,
    }
    this.handleChange = this.handleChange.bind(this)
    this.getSelectedFromProps = this.getSelectedFromProps.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    var selected = this.getSelectedFromProps(nextProps)
    this.setState({
      selected: selected,
    })
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
  handleChange(e) {
    if (this.props.onChange) {
      var change = {
        oldValue: this.state.selected,
        newValue: e.target.value,
      }
      this.props.onChange(change)
    }
    this.setState({ selected: e.target.value })
  }
  render() {
    var self = this
    var options = self.props.options.map(function(option) {
      return (
        <option
          key={option[self.props.valueField]}
          value={option[self.props.valueField]}
          style={{
            display: self.props.optionDisplay
              ? self.props.optionDisplay
              : 'inherit',
          }}
        >
          {option[self.props.labelField]}
        </option>
      )
    })
    return (
      <Style hideInMobile={this.props.hideInMobile}>
        <select
          id={this.props.id}
          className="form-control"
          value={this.state.selected}
          onChange={this.handleChange}
          style={{ width: this.props.width ? this.props.width : '100px' }}
        >
          {options}
        </select>
      </Style>
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

export default Dropdown
