/* eslint-disable */
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
MdAddCircle
import '../styles/global-styles.scss'
import '../styles/BrandList.scss'

import { MdAddCircle } from "react-icons/md";

import { Row, Col, Grid, Button } from 'react-bootstrap'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import { withStyles } from '@material-ui/core/styles'
import addIcon from "../assets/add_icon.png";

const styles = theme => ({
  card: {
    paddingBottom: '0px !important',
    paddingTop: '0px !important',
    minHeight: '50px',
    backgroundColor: '#bcbaba49',
    textAlign: 'center',
    color: 'red',
    lineHeight: '36px',
    height: '60px'
  },
  noBottomPadding: {
    paddingBottom: '0px !important',
  },
  group: {
    padding: '0 20px 20px',
  },
  fixed: {
    maxHeight: '500px',
  },
  button: {
    margin: '8px 8px',
    float: 'right',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: '#db3c5a',
    lineHeight: '74px'
  },
  expandPadding: {
    paddingBottom: '17px !important',
  },
  p: {
    fontSize: '12px',
  },
})

class BrandList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandList: null
    }
    this.serachBrandName = this.serachBrandName.bind(this);
    this.routeToAdd = this.routeToAdd.bind(this);

  }


  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps brand list' + JSON.stringify(nextProps.data));
    this.setState({
      brandList: nextProps.data
    })
  }
  routeToAdd() {
    var url = '/brands/new/brand'
    this.props.history.push(url)
  }
  serachBrandName(event) {
    console.log('value: ' + event.target.value);
    let serachValue = event.target.value;
    let brandData = this.props.data;
    console.log(' brand' + JSON.stringify(brandData));
    brandData = brandData.map((brandRow) => {
      console.log('name' + JSON.stringify(brandRow));
      return brandRow.filter((brand) => {
        let brandName = brand.name.toLowerCase();
        return brandName.indexOf(
          serachValue.toLowerCase()) !== -1
      })
    })
    console.log('filtered brand' + JSON.stringify(brandData));
    this.setState({ brandList: brandData })
  }

  render() {
    //console.log('brand list' + JSON.stringify(this.props.data));
    console.log('render brand list' + JSON.stringify(this.state.brandList));
    return (
      <div class="container containerClass">
        <div class="row rowClass">

          <div className="col-xs-6 col-md-12 oneThirdContainer">

            <div class="row  rowClass">

              <div className="col-xs-6 col-md-12 positionIcon">

                <div className="addIcons col-xs-2 col-md-2 " onClick={this.routeToAdd} title="Add Brand">

                  <img id="img_plus_icon" className="add-brand-icon" src={addIcon} alt="plus logo" />
                  <span className="add-brand-text">Add Brand</span>
                </div>



                <div className="col-xs-5 col-md-4 ">
                  <div className="search-brand">
                    <TextField required id="standard-required" placeholder="search brand" onChange={this.serachBrandName}
                      InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                    />
                  </div>
                </div>

              </div>
            </div>
            {this.state.brandList && this.state.brandList.length > 0 && this.state.brandList.map(element => {
              return (
                <div class="row  rowClass">

                  {element.map(sunbElement => {
                    return (
                      <div className="col-xs-12 col-md-3" >
                        <Paper elevation="24" className="card">
                          <Card className={this.props.classes.card}>
                            {/* <CardActions disableActionSpacing> */}
                            <Grid container spacing={5}>
                              {/* <Grid item md={12} lg={12} xs={12}> */}
                              <div className="brandName">

                                {sunbElement.name}
                              </div>
                            </Grid>
                            {/* </Grid> */}
                            {/* </CardActions> */}


                          </Card>
                        </Paper>

                      </div>)
                  })}
                </div>)
            })}
          </div>

        </div>

      </div>
    );
  }


}

export default withStyles(styles)(BrandList)



