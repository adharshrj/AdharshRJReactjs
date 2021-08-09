import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Formik from "formik"

export default function SampleForm(props) {
  const initialValues = {
    name:"",
    email: "",
    passwd:"",
    campus: -1,
    hostel: false,
    nothostel: false,

  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [campus, setCampus] = useState([]);
  const [residencetype, setTypes] = useState([]);
  const [res, setRes] = useState();
  //const url = 'http://localhost:4000/student';
  const [country, setCountry] = useState([]);
  //const [data, setData] = useState([]);

  const handleDoSubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));

    console.log(formValues);
    console.log("Submitted");


    console.log("===" + Object.entries(formErrors).length)

    setSubmitted(true);
 
    const regOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formValues)
    };
    fetch("http://localhost:4000/student", regOptions).then(res => res.json()).then(data => {
      console.log("Saved");
      console.log(data.id);
      setRes(data.id);
    });
    //props.onUserAdd(formValues);
  };
  const handleOnChange = (event) => {
    const isHostel = event.target.type === "checkbox";
    

    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: isHostel ? event.target.checked : value,
      };
    });

    console.log(formValues);
  };

  const validate = (values) => {
    let errors = {};
    console.log(values);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    
    if (!values.name) {
        errors.name = "Name Cannot be blank";
    }

    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!values.passwd) {
        errors.passwd = "Password Cannot be blank";
    }
    

    if (values.campus < 0) {
      errors.campus = "Please Select a campus";
    }

    if (values.residencetype < 0) {
        errors.residencetype = "Please Select a residence type";
      }
    
    if (values.country < 0) {
      errors.country = "Please Select a country";
     }



    if (values.yes === false) {
        if(values.no === true){
      errors.yes = "Please accept agreement";
        }else if(values.no === false){
            errors.no = "Please accept agreement";  
        }else if(values.yes === true && values.no === true){
          errors.no = "Select only one option";
          errors.yes = "Select only one option";  
        }else{
          errors.yes = "Please accept agreement";
          errors.no = "Please accept agreement";
        }
    }


    return errors;
  };

  const noEmpty = () => {
    return formValues.name.length>0 && formValues.passwd.length>0 && formValues.email.length>0;
  }

  useEffect(() => {
    //axios.get(url).then(json => setData(json.data))
    console.log("Executed after render method");
    let res = fetch("http://localhost:4000/campus").then(res => res.json()).then(data => {
      console.log(data);
      setCampus(data);
    }).catch(e => {
      console.error("Error in campus");
    }).finally(() => {
      console.log("Finally");
    })
    console.log("==");

    let res2 = fetch("http://localhost:4000/residencetype").then(res2 => res2.json()).then(data => {
      console.log(data);
      setTypes(data);
    }).catch(e => {
      console.error("Error in types");
    }).finally(() => {
      console.log("Finally");
    })
    console.log("==");

    let res3 = fetch("http://localhost:4000/country").then(res3 => res3.json()).then(data => {
      console.log(data);
      setCountry(data);
    }).catch(e => {
      console.error("Error in country");
    }).finally(() => {
      console.log("Finally");
    })
    console.log("==");

  }, []);

 
  return (
    <div className = "App">
      <Formik
      initialValues={{
        name:"",
        passwd:"",
        campus:"",
        residencetype:"",
        country:""
      }}
      onSubmit={values => {
        handleDoSubmit(values.initialValues)
      }}
    ></Formik>
      {res && submitted && <div>{res}</div>}
      {(Object.entries(formErrors).length === 0) && submitted && <div> Form Gets Submitted Sucessfully </div>}
      <form onSubmit={handleDoSubmit} noValidate>
        <FormGroup controlId="Username" bsSize="large">
          <FormLabel>Name</FormLabel>
          <FormControl
            value={formValues.name}
            name="name"
            type="name"
            id="name"
            onChange={handleOnChange}
          />
          <ErrorMessage message={formErrors.name} />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
          <FormLabel>e-mail</FormLabel>
          <FormControl
            value={formValues.email}
            name="email"
            type="email"
            id="email"
            onChange={handleOnChange}
          />
          <ErrorMessage message={formErrors.email} />
          </FormGroup>
          <FormGroup controlId="passwd" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={formValues.passwd}
            name="passwd"
            type="password"
            id="password"
            onChange={handleOnChange}
          />
          <ErrorMessage message={formErrors.passwd} />
          </FormGroup>

          <FormGroup controlId="campus" bsSize="large">
          <FormLabel>Campus</FormLabel>
          <select name="campus" onChange={handleOnChange} value={formValues.campus}>
            <option value="-1">Please select a campus</option>
            {campus.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </select>
          <div>
            <ErrorMessage message={formErrors.campus} />
          </div>
         </FormGroup>
        <div>
          <label>Residence Type</label>
          <select name="residencetype" onChange={handleOnChange} value={formValues.residencetype}>
            <option value="-1">Please select a Residence Type</option>
            {residencetype.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </select>
          <div>
            <ErrorMessage message={formErrors.residencetype} />
          </div>
        </div>
        <div>
          <label>Country</label>
          <select name="country" onChange={handleOnChange} value={formValues.country}>
            <option value="-1">Please select a Residence Type</option>
            {country.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
          </select>
          <div>
            <ErrorMessage message={formErrors.country} />
          </div>
          
        </div>

        <div>
          <label>Accept Agreement</label><br/>
          <input type="checkbox" name="Yes" onChange={handleOnChange} /> Yes
          <div>
            <ErrorMessage message={formErrors.yes} />
          <input type="checkbox" name="No" onChange={handleOnChange} /> No
            <ErrorMessage message={formErrors.no} />
          </div>
        </div>

        <Button block bsSize="large" disabled={!noEmpty()} type="submit">
        submit
        </Button>

        {/* <div>
          <h1>Student Table</h1>
          <table id="student" align="center">
            <tr>
              <td>Name</td>
              <td>E-mail</td>
              <td>Password</td>
              <td>Campus</td>
              <td>Residence Type</td>
              <td>Country</td>
            </tr>{
              renderTable()
            }
          </table>
        </div> */}
      </form>
    </div>
  );
}