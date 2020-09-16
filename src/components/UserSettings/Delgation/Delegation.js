import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, withRouter} from 'react-router-dom';
import {GridComponent, ColumnDirective, ColumnsDirective, Inject, Page,Sort } from '@syncfusion/ej2-react-grids';
import {data} from './dataSource.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import './Delegation.css';
// import NewDelegation from './CreateDelegation/createDelegation.js'
// import ViewDelegation from './CreateDelegation/viewDelegation.js'





 class Delegation extends Component {
    constructor() {   
        super(...arguments);
        this.template = this.gridTemplate;
    }
    gridTemplate(props) {
       
         return (
             <div class="rowLinks">
                  <h6><a>Edit</a></h6>
                 <h6><a>Relese</a></h6> 
                 <Router>
                 <Switch>
                 <h6><Link to="./viewDelegation" style={{color:'#CB05628B'}}>View</Link></h6>
       </Switch>
       </Router>
       </div>
    );
    };
   
    navigate = () => {
      
        this.props.history.push("./newDelegation");
        
        };
    render(){
        
        return (
            
            <div>
                <div class="container ">
                    <div class="row">
   <ul class = "list-unstyled ml-auto mr-3 top">
    <li className="searchBox"> 
     <input type="search" class="form-control searchGrid" placeholder="Search" style={{height:'50px'}}/>
     <i class="fa fa-search" aria-hidden="true"></i>
     </li>
     <li>
        <Button className="filterBtn" color="primary">Filter</Button></li>
     <li className="delgateBtn">
        <Button  color="primary" onClick={this.navigate}>Delegation</Button></li>
   </ul>
   </div>
 </div>
                    <div>
                    
            <GridComponent dataSource={data}
            allowPaging={true}
            pageSetting={{ pageSize:10 }}
            allowSorting={true}>
                <ColumnsDirective>
                <ColumnDirective  field = "id" headerText="ID" width='50' customAttributes={{class: 'e-rowcell'}}></ColumnDirective>
                <ColumnDirective  field = "reason" headerText="Reason" width='300' textAlign="center"></ColumnDirective>
                <ColumnDirective  field = "startDate" headerText="Start Date" width='220'></ColumnDirective>
                <ColumnDirective  field = "endDate" headerText="End Date" width='220'></ColumnDirective>
                <ColumnDirective  field = "delegatedTo" headerText="Delegated To" width='220'></ColumnDirective>
                <ColumnDirective   headerText="Actions" width='220' template={this.template}></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[Page,Sort]} />
                </GridComponent>
                </div>
                </div>
       
    )
}

}
export default withRouter(Delegation);