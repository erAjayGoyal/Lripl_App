import React from 'react'
import styled from 'styled-components'
import { SideBar } from '../components'
import { Header } from '../components'
import { Sticky } from 'react-sticky'
import ImageUploader from 'react-images-upload';
import { Button } from 'react-bootstrap'
import '../styles/global-styles.scss'
import '../styles/additem.scss'


class productContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldsetDisabled : true
    }

  }


handleEdit = ()=> {
  this.setState({
    fieldsetDisabled : false
  })
}

handleAdd = () => {
  this.setState({
    fieldsetDisabled :true
  })
}

  render() {

    return (

      <div class="container">
          <div class="row rowStyle">

            <div class="col-xs-6 col-md-6">
              <div class="row">
              <fieldset disabled = {this.state.fieldsetDisabled}>

                <div class="col-xs-6 col-md-12">
                  <div class="row blockTheme">
                    <div className="col-xs-12 col-md-12">
                      <form>
                        <div class="form-group row formLeftMargin">
                          <label for="first_name" class="col-xs-4 col-form-label mr-2"> Product Name</label>
                          <div class="col-xs-8">
                            <input type="text" class="form-control" id="product_name" name="product_name"></input>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-xs-4 col-form-label mr-2"> Product Zone</label>
                          <div class="col-xs-8">
                            <input type="text" class="form-control" id="product_zone" name="product_zone"></input>
                          </div>
                        </div>

                        <div class="form-group row">
                          <label for="first_name" class="col-xs-4 col-form-label mr-2"> Name</label>
                          <div class="col-xs-8">
                            <textarea value="helooo" />
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="col-xs-4 col-form-label mr-2"> Product Price</label>
                          <div class="col-xs-8">
                            <input type="text" class="form-control" id="product_zone" name="product_price"></input>
                          </div>

                        </div>


                        <div class="form-group row">
                          <div class="offset-xs-3 col-xs-12">
                            <Button
                              bsStyle="button-class"
                              bsSize="small"
                              id="add_butto"
                              className="button button-class buttonFloat"
                              onClick={() => {this.handleAdd()}}
                            >
                              Add
          </Button>




                          </div>
                        </div>
                      </form>
                    </div>
                  </div>




                </div>

              </fieldset>
              </div>
            </div>
            <div className="col-xs-6 col-md-6">
              <div class="row">
                <div class="col-xs-6 col-md-2">
                  <div className="tdSubmit">
                    <Button
                      bsStyle="button-class"
                      bsSize="small"
                      id={"edit_button"}
                      className="button button-class"
                      onClick = {() =>{this.handleEdit()}} 
                    >
                      edit
                </Button>
                  </div>
                  </div>
                  <div class="col-xs-6 col-md-2">
                    <div className="tdSubmit">
                      <Button
                        bsStyle="button-class"
                        bsSize="small"
                        id="delete_button"
                        className="button button-class"
                        onClick={(e) => (console.log('this', encodeURI))}

                      >
                        delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

    )
  }
}

//export default connect(mapStateToProps, mapDispatchtoProps)(AddItemContainer)
export default productContainer
