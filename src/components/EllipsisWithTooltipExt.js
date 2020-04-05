/* eslint-disable no-unused-expressions */
import React from 'react'
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip'
import styled from 'styled-components'
import { Tooltip, OverlayTrigger, Overlay } from 'react-bootstrap'

const Style = styled.div`
  .truncateText {
    /* width: 200px; */
    height: 2em;
    /* line-height: 2em; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700l;
  }
`

class EllipsisWithTooltipExt extends React.Component {
  render() {
    var width = window.innerWidth
    var userAgent = navigator.userAgent

    if (width < 800 || userAgent.match(/iPad/i)) {
      const burgertooltip = <Tooltip id="burger">{this.props.children}</Tooltip>
      if (this.props.children && this.props.children.length > 13) {
        return (
          <Style>
            <OverlayTrigger
              id="trigger"
              placement={this.props.placement}
              overlay={burgertooltip}
              enabled={false}
            >
              <div className="truncateText"> {this.props.children} </div>
            </OverlayTrigger>
          </Style>
        )
      } else {
        ;<Style>
          <div className="truncateText"> {this.props.children} </div>
        </Style>
      }
    }
    return (
      <EllipsisWithTooltip
        placement={this.props.placement}
        key={Math.random()}
        style={{
          minHeight: this.props.minHeight ? this.props.minHeight : '27px',
          color: this.props.color ? this.props.color : 'inherit',
          paddingLeft: this.props.paddingLeft ? this.props.paddingLeft : '',
          fontWeight : '700'
        }}
      >
        {this.props.children}
      </EllipsisWithTooltip>
    )
  }
}
export default EllipsisWithTooltipExt
