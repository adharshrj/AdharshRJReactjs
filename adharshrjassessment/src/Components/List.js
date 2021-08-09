import {React,useState,useEffect} from 'react'
import axios from 'axios';
import {Table} from 'react-bootstrap'
export default function List() {
    const url = 'http://localhost:4000/login';
    const [data, setData] = useState([]);
   
    useEffect(() => {
        axios.get(url).then(json => setData(json.data))
    }, []);
    const renderTable = () => {
        return data.map(login =>{
          return(
            <tr>
              <td>{login.name}</td>
              <td>{login.city}</td>
              <td>{login.company}</td>
              <td>{login.email}</td>
              <td>{login.department}</td>
              <td>{login.country}</td>
            </tr> 
          )
        })
      }
     
    return (
        <div>
             <h1>Student Table</h1>
          <Table striped bordered hover variant="dark" id="user" align="center">
            <tr>
              <td>Name</td>
              <td>City</td>
              <td>Company</td>
              <td>Email</td>
              <td>Department</td>
              <td>Country</td>
            </tr>{
              renderTable()
            }
          </Table>
        </div>

        
    )
}