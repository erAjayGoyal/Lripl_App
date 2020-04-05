import React from "react";
import { Button } from "react-bootstrap";
import "../styles/global-styles.scss";
import "../styles/addBrand.scss";
import TextField from "../components/TextField";
import { MdAddCircleOutline, MdClose } from "react-icons/md";

import { appendActivatedRoutes } from '../actions/treeview'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import EllipsisWithTooltipExt from "../components/EllipsisWithTooltipExt";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postNewBrand } from "../actions/dataItem";
import ReactTooltip from 'react-tooltip'
 

class AddBrandContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandData: {
        name: ""
      }
    }

  }


  routeToParent = () => {
    this.props.history.goBack();
  };

  handleDropDownValue = (event, name) => {
    let { value } = event
    let { BrandData } = this.state
    BrandData[name] = value
    this.setState({
      BrandData: BrandData
    })

  }
  componentDidMount() {
    let itemCategory = this.props.match.params.itemName;
    let selectedNode = {
      Name: 'Add Brand',
      path: '/brands/new/brand',
      type: 'child'
    }
    this.props.appendActivatedRoutes(selectedNode)
  }

  handleKeyPress = (event) => {
    let { name, value } = event.target
    let { brandData } = this.state
    brandData[name] = value
    this.setState({
      brandData: brandData
    })

  }

  addBrandDetails = () => {
    let { brandData } = this.state
    if (brandData) {
      this.props.postNewBrand(brandData)
      this.setState({
        brandData: {
          name: ""
        }
      })
    }

  }

  checkAddEnabled = (brandData) => {
    if(brandData){
      let isEnabled = true
      for(let key in brandData){
        if(brandData[key] !== undefined && brandData[key].length < 1){
          isEnabled = false
          break
        }
      }      
    return isEnabled
    }
  }

  renderAddBrand = () => {
    
    let {brandData} = this.state
    let isEnabled = this.checkAddEnabled(brandData)
    return (
      <div class="container">
        <div class="row rowStyle rowSet">
          <div class="row">
            <div className="col-xs-12 col-md-12">
              <h3 className="heading">Add Brand</h3>
            </div>
          </div>
          <div className='row'>

            <div class="col-xs-6 col-md-6 col-md-offset-3">
              <div class="row">
                <div class="col-xs-6 col-md-12">
                  <div class="row blockTheme setFormContainer">
                    <div className="col-xs-12 col-md-12">
                      <form>
                        <div class="form-group row formLeftMargin">
                          <div class="col-xs-4">

                            <EllipsisWithTooltipExt placement="top">
                              Brand Name
                          </EllipsisWithTooltipExt>
                          </div>
                          <div class="col-xs-8">
                            <TextField
                              className="textField"
                              id={"brand_name"}
                              type="text"
                              placeholder='Enter Brand Name'
                              name="name"
                              onChange={(e) => { this.handleKeyPress(e) }}
                              value = {this.state.brandData.name}

                            />
                          </div>
                        </div>
                       
                        <div class="form-group row">
                          <div class="col-md-offset-6 col-xs-2 customMargin">
                            <Button
                              bsStyle="button-class"
                              bsSize="small"
                              id={"cancel_item"}
                              className="button button-class buttonFloat"
                              onClick={e => this.addBrandDetails()}
                              disabled={! isEnabled}
                              
                            >
                              <span className='btnIcon' title="amazing textarea"> 
          
        <MdAddCircleOutline  />
        

                              </span>
                              <span lassName='btnTxt'>
                                Add
                            </span>
                            </Button>
                          </div>
                          <div class="col-xs-2">
                            <Button
                              bsStyle="button-class"
                              bsSize="small"
                              id={"add_item"}
                              className="button buttonClassCancel buttonFloat "
                              onClick={e => this.routeToParent()}>
                              <span className='btnIcon'>
                                <MdClose />
                              </span>
                              <span lassName='btnTxt'>
                                Cancel
                            </span>


                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  render() {
    return (<div>{this.renderAddBrand()}</div>
    )
  }
}
function mapStateToProps(state) {
  return {
    activatedRoutes: state.treeview.activatedRoutes
  }

}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
     postNewBrand: postNewBrand,
      appendActivatedRoutes: appendActivatedRoutes
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(AddBrandContainer)

