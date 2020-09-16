import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {GridComponent, ColumnDirective, ColumnsDirective, Inject, Page,Sort } from '@syncfusion/ej2-react-grids';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Input,Button } from 'reactstrap';
import './createDelegation.css';
import {data} from '../dataSource.tsx';


 class ViewDelegation extends Component {
  state = {
    redirectToMain: false
  }
  
  redirectToMain = () => this.setState({redirectToMain: true }
    )
  render(){
      return (
        <div>
           <h1>Delegated Tasks</h1>
           <div class="container formContainer">
                
           <div class ="row">
                    <div class="col-6">
                    <FormGroup>
              <Label>Start Date</Label>
              <Input type="text"name="startDate" required/>
            </FormGroup>
                    </div>
                    <div class="col-6">
                    <FormGroup>
              <Label>End Date</Label>
              <Input type="text"name="endtDate" required/>
            </FormGroup>
                    </div>
                   </div>
                   <div class ="row">
                    <div class="col-6">
                    <FormGroup>
              <Label>Start Time</Label>
              <Input type="text"name="startTime" required/>
            </FormGroup>
                    </div>
                    <div class="col-6">
                    <FormGroup>
              <Label>End Time</Label>
              <Input type="text"name="endTime" required/>
            </FormGroup>
                    </div>
                </div>
                <div class ="row">
                    <div class="col-6">
                    <FormGroup>
              <Label>Delegated To</Label>
              <Input type="text"name="startTime" required/>
            </FormGroup>
                    </div>
                </div>
                <div class ="row">
                    <div class="col-12">
                    <FormGroup>
              <Label>Reason</Label>
              <Input type="text"name="startTime" required style ={{height:'95px'}}/>
            </FormGroup>
                    </div>
                </div>
             
                <div class="row">
                <div class="ml-auto mr-3 btn">
        <Button color="primary" onClick={this.redirectToMain}  id ="cancelButton"> Cancel</Button>
        {this.state.redirectToMain &&
          <Redirect to='/delegations' />
        }
        <Button color="primary" onClick={this.redirectToMain} id ="saveButton">Submit</Button>
        {this.state.redirectToMain &&
          <Redirect to='/delegations' />
        }
        </div>
        </div>
       
            </div>
         
         <div>
         <GridComponent dataSource={data}
            allowPaging={true}
            pageSetting={{ pageSize:10 }}
            allowSorting={true}>
                <ColumnsDirective>
                <ColumnDirective  field = "id" headerText="ID" width='50' ></ColumnDirective>
                <ColumnDirective  field = "reason" headerText="Reason" width='300' textAlign="center"></ColumnDirective>
                <ColumnDirective  field = "startDate" headerText="Date Recived" width='220'></ColumnDirective>
                <ColumnDirective  field = "delegatedTo" headerText="Owner" width='220'></ColumnDirective>
                <ColumnDirective   headerText="Department" width='220' ></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[Page,Sort]} />
                </GridComponent>
         </div>
        </div>
    )
}
}
export default ViewDelegation