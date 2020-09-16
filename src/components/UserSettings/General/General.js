import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    FormGroup, Label, Input,
    Button } from 'reactstrap';
import './General.css';



// submit()
// {
//     alert("Form has bee submitted")
// }

export default function General() {
    
    return (
        <div>
           <hr />
           <div class="container formContainer">
                
           <div class ="row">
                    <div class="col-6">
                    <FormGroup>
              <Label>Name (In Arabic)</Label>
              <Input type="text"name="name"/>
            </FormGroup>
                    </div>
                    <div class="col-6">
                    <FormGroup>
              <Label>Name (In French)</Label>
              <Input type="text"name="name"/>
            </FormGroup>
                    </div>
                   </div>
                   <div class ="row">
                    <div class="col-6">
                    <FormGroup>
              <Label>Designation (In Arabic)</Label>
              <Input type="text"name="designation"/>
            </FormGroup>
                    </div>
                    <div class="col-6">
                    <FormGroup>
              <Label>Designation (In French)</Label>
              <Input type="text"name="designation"/>
            </FormGroup>
                    </div>
                </div>
             
                <div class="row">
                <div class="ml-auto mr-3 btn">
        <Button id ="cancel"  onClick="cancel()" >X Cancel</Button>
        {/* <script>
      function cancel() {
          alert("Cancelled Successfully")
      }
      </script> */}
        <Button id ="save"  onClick="save()">Save</Button>
        {/* <script>
      function save() {
          alert("Submitted Successfully")
      }
      </script> */}
        </div>
        </div>
       
            </div>
         
        </div>
    )
}
