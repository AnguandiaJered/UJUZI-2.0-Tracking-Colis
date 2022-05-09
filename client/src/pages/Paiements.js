import React,{ useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Search } from "@material-ui/icons";
import { Toolbar, Fab, TextField, InputAdornment } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { isEmpty } from "./Utils";
import Popup from './Popup';
import axios from 'axios';
import Paiement from "../modals/Paiement";
import DeleteIcon from '@mui/icons-material/Delete';


export const Paiements = () =>{
    const [openPopupPaiement, setOpenPopupPaiement] = useState(false)
    const [dataToSave, setDataToSave] = useState()
  
    const [openPopupModification, setOpenPopupModification] = useState(false)
    const [dataModi, setDataModi] = useState()
  
    const Modification =(params)=>{
      setDataModi(params)
      setOpenPopupModification(true)
    }

    const columns = [
     
        { field: 'client', headerName: 'Client', width: 170, editable: true },
        { field: 'colis', headerName: 'Colis', width: 150, editable: true },
        { field: 'montant', headerName: 'Montant', width: 100, editable: true },
        { field: 'libelle', headerName: 'Libelle', width: 250, editable: true },
        { field: 'datepaiement', headerName: 'Date paiement', width: 150, editable: true },
        { field: 'author', headerName: 'Author', width: 150, editable: true },
        { field: 'Action', headerName: 'Actions', width: 260, editable: true,
        renderCell : (params)=>{
          return(
            <>
              <span style={{marginLeft:"15px", cursor:"pointer"}} onClick={(e)=>{
                setDataToSave(params.row)
                openPopupPaiement(true)
              }}><DeleteIcon color="secondary" />Supprimer</span>
              <span style={{marginLeft:"30px", cursor:"pointer"}} onClick={()=> Modification(params.row)}><Edit color="primary"/> Modifier</span>
              </>
          )
        }
      },
    ];
 
    const [openPopupForm, setOpenPopupForm] = useState(false)
    const [rows, setRows] = useState([])
    const [enregistrement, setEnregistrement] = useState()
    useEffect(()=>{
      axios.get('http://localhost:8000/paiement/all')
      .then(res =>{
        setRows(res.data.paiement)
      })
    },[enregistrement])
    console.log(rows)
    const [filterFn, setFilterFn] = useState({fn:items=>{return items;}})
    const handleChange =(e)=>{
      let target = e.target
    
      setFilterFn({
        fn:items =>{
          if(target.value === ""){
            return items
          }else{
            return items.filter(x=> x.montant.includes(target.value))
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
                            <li className="active"><i className="fa fa-dashboard"></i> Dashboard / Paiements</li>
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
            title="Entrer les informations actuelles de paiement"
            openPopup={openPopupModification}
            setOpenPopup={setOpenPopupModification}
            >  
                <Paiement paiement={dataModi} />
        </Popup>
        <Popup
        title={`Ajout de ${dataToSave && dataToSave.noms}`}
        openPopup={openPopupPaiement}
        setOpenPopup={setOpenPopupPaiement}
        >  
            <Paiement data={dataToSave}/>
        </Popup>
    
        <Popup
        title="Enregistrement des paiements"
        openPopup={openPopupForm}
        setOpenPopup={setOpenPopupForm}
        >  
            <Paiement paiement={undefined} setEnregistrement={setEnregistrement}/>
        </Popup>    
         
    </div>
  );
}