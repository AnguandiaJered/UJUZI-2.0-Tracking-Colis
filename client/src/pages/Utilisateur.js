import React,{ useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Search } from "@material-ui/icons";
import { Toolbar, Fab, TextField, InputAdornment } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { isEmpty } from "./Utils";
import Popup from './Popup';
import axios from 'axios';
import Users from "../modals/Users";
import DeleteIcon from '@mui/icons-material/Delete';


export const Utilisateur = () =>{
    const [openPopupUsers, setOpenPopupUsers] = useState(false)
    const [dataToSave, setDataToSave] = useState()
  
    const [openPopupModification, setOpenPopupModification] = useState(false)
    const [dataModi, setDataModi] = useState()
  
    const Modification =(params)=>{
      setDataModi(params)
      setOpenPopupModification(true)
    }

    const columns = [     
        { field: 'noms', headerName: 'Noms', width: 200, editable: true },
        { field: 'email', headerName: 'Email', width: 230, editable: true },
        { field: 'password', headerName: 'Password', width: 350, editable: true },
        { field: 'role', headerName: 'Role', width: 120, editable: true },
        { field: 'Action', headerName: 'Actions', width: 260, editable: true,
        renderCell : (params)=>{
          return(
            <>
              <span style={{marginLeft:"15px", cursor:"pointer"}} onClick={(e)=>{
                setDataToSave(params.row)
                openPopupUsers(true)
              }}><span style={{marginLeft:"30px", cursor:"pointer"}} onClick={()=> Modification(params.row)}><Edit color="primary"/> Modifier</span></span>
              <button className='btn' onClick={()=> deleteUsers(params.row.id)}><DeleteIcon color="secondary"/>Supprimer</button>
              </>
          )
        }
      },
    ];
 
    const [openPopupForm, setOpenPopupForm] = useState(false)
    const [rows, setRows] = useState([])
    const [enregistrement, setEnregistrement] = useState()
    useEffect(()=>{
      axios.get('http://localhost:8000/users/all')
      .then(res =>{
        setRows(res.data.users)
      })
    },[enregistrement])
    console.log(rows)

    const deleteUsers = async (id) =>{
      await axios.delete(`http://localhost:8000/users/${id}`)
        .then((res)=>{
          setRows(res.data);
        })        
    };
    const [filterFn, setFilterFn] = useState({fn:items=>{return items;}})
    const handleChange =(e)=>{
      let target = e.target
    
      setFilterFn({
        fn:items =>{
          if(target.value === ""){
            return items
          }else{
            return items.filter(x=> x.noms.includes(target.value))
          }
          }
        })
      }
  

  return (
    <div className='dashboard container-fluid'>
        <div className="row">
            <div className="col-lg-12">
                <div className="page-title mt-3 ml-4">
                    <h1 className="titre">SYSTEM TRACKING COLIS
                        <small className="ml-3">Ujuzi Tracking</small>
                    </h1>
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="active"><i className="fa fa-dashboard"></i> Dashboard / Users</li>
                        </ol>
                    </div>                            
                </div>
            </div>
        </div>
        <Toolbar>
                <TextField
                  style={{float:"right", marginLeft:"50px", width:"80%"}}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment:(<InputAdornment position="start">
                      <Search/>
                  
                    </InputAdornment>)
                  }}
                  />
                  <Fab color="primary" onClick={()=>setOpenPopupForm(true)} style={{marginLeft:"50px"}}>
                    <AddIcon/>
                  </Fab>                 
                  
              </Toolbar> 
                
        {
        !isEmpty(rows) &&
            <div style={{ height: 400, width: '100%', marginTop:"12px" }}>
                 <DataGrid
                     rows={filterFn.fn(rows)}
                     columns={columns}
                     pageSize={5}
                     rowsPerPageOptions={[5]}
                     checkboxSelection
                     disableSelectionOnClick
                 />
             </div>
        }
        <Popup
            title="Entrer les informations actuelles de l'utilisateur"
            openPopup={openPopupModification}
            setOpenPopup={setOpenPopupModification}
            >  
                <Users users={dataModi} />
        </Popup>
        <Popup
        title={`Ajout de ${dataToSave && dataToSave.noms}`}
        openPopup={openPopupUsers}
        setOpenPopup={setOpenPopupUsers}
        >  
            <Users data={dataToSave}/>
        </Popup>
    
        <Popup
        title="Enregistrement des utilisateurs"
        openPopup={openPopupForm}
        setOpenPopup={setOpenPopupForm}
        >  
            <Users users={undefined} setEnregistrement={setEnregistrement}/>
        </Popup>    
         
    </div>
  );
}