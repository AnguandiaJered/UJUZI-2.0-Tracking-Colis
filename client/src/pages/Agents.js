import React,{ useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Search } from "@material-ui/icons";
import { Toolbar, Fab, TextField, InputAdornment } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import { isEmpty } from "./Utils";
import Popup from './Popup';
import axios from 'axios';
import Agent from "../modals/Agent"


export const Agents = () =>{
    const [openPopupAgent, setOpenPopupAgent] = useState(false)
    const [dataToSave, setDataToSave] = useState()
  
    const [openPopupModification, setOpenPopupModification] = useState(false)
    const [dataModi, setDataModi] = useState()
  
    const Modification =(params)=>{
      setDataModi(params)
      setOpenPopupModification(true)
    }

    const columns = [     
        { field: 'noms', headerName: 'Noms', width: 150, editable: true },
        { field: 'sexe', headerName: 'Sexe', width: 110, editable: true },
        { field: 'datenaissance', headerName: 'Date naissance', width: 110, editable: true },
        { field: 'adresse', headerName: 'Adresse', width: 150, editable: true },
        { field: 'etatcivil', headerName: 'Etat civil', width: 150, editable: true },
        { field: 'telephone', headerName: 'Telephone', width: 150, editable: true },
        { field: 'mail', headerName: 'Mail', width: 200, editable: true },
        { field: 'fonction', headerName: 'fonction', width: 200, editable: true },
        { field: 'Action', headerName: 'Actions', width: 260, editable: true,
        renderCell : (params)=>{
          return(
            <>
              <span style={{marginLeft:"15px", cursor:"pointer"}} onClick={(e)=>{
                setDataToSave(params.row)
                openPopupAgent(true)
              }}><span style={{marginLeft:"15px", cursor:"pointer"}} onClick={()=> Modification(params.row)}><Edit color="primary"/> Modifier</span></span>
              <button className='btn' onClick={()=> deleteAgent(params.row._id)}><DeleteIcon color="secondary"/>Supprimer</button>
              </>
          )
        }
      },
    ];
 
    const [openPopupForm, setOpenPopupForm] = useState(false)
    const [rows, setRows] = useState([])
    const [enregistrement, setEnregistrement] = useState()
    useEffect(()=>{
      axios.get('http://localhost:8000/agent')
      .then(res =>{
        setRows(res.data.agent)
      })
    },[enregistrement])
    console.log(rows)
    const deleteAgent = async (id) =>{
      await axios.delete(`http://localhost:8000/agent/${id}`)
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
                            <li className="active"><i className="fa fa-dashboard"></i> Dashboard / Agents</li>
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
            title="Entrer les informations actuelles de l'agent"
            openPopup={openPopupModification}
            setOpenPopup={setOpenPopupModification}
            >  
                <Agent agent={dataModi} />
        </Popup>
        <Popup
        title={`Ajout de ${dataToSave && dataToSave.noms}`}
        openPopup={openPopupAgent}
        setOpenPopup={setOpenPopupAgent}
        >  
            <Agent data={dataToSave}/>
        </Popup>
    
        <Popup
        title="Enregistrement des agents"
        openPopup={openPopupForm}
        setOpenPopup={setOpenPopupForm}
        >  
            <Agent agent={undefined} setEnregistrement={setEnregistrement}/>
        </Popup>    
         
    </div>
  );
}