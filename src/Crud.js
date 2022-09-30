import React, { useEffect, useState } from 'react'
import MaterialTable from '@material-table/core'
import Popup from './Popup';

function Crud() {
   
  const [data, setData] = useState([])

  const url = 'https://jsonplaceholder.typicode.com/users'
  const columns = [
    { title: "Name", field: "name" },
    { title: "UserName", field: "username" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" }
  ];

  useEffect(() => {
    getData()
  }, [])

  // getApi
  const getData = async () => {
    await fetch(url).then((res) => {
      res.json().then((result) => {
        setData(result)
      })
    })
  };

  

  // const handleCreate = () => {

  // }

  // const handleEdit = () => {
  //   alert("clicked edit")
  // }

  // const handleDelete = () => {
  //   alert("clicked delet")
  // }
  return (
    <>
      <h1 align="center" >React Crud Operation on API</h1>
     {/* <AddUser/> */}
      <div>
   

        <MaterialTable
          options={{  
            showFirstLastPageButtons: false,
            paginationType: "stepped",
            headerStyle:{backgroundColor:"black",color:"white"}
          }}
          editable={{
            onRowUpdate:(newData,oldData)=> new Promise((resolve,reject)=>{
              fetch(url+"/"+oldData.id,{
               method:'PUT',
               headers:{
                 'Content-type':'application/json'
               },
               body:JSON.stringify(newData)
              }).then(res=>res.json())
              .then(result=>{
                console.log(result)
              getData()
               resolve()
           })
           }),
           onRowDelete:(oldData) => new Promise((resolve,reject)=>{
            fetch(url+"/"+oldData.id,{
             method:'DELETE',
             headers:{
               'Content-type':'application/json'
             }
            }).then(res=>res.json())
            .then(result=>{
              getData()
             resolve()
         })
         })
          }}
          actions={[
            {
              icon: () =>
                // <Fab onClick={handleCreate} size="small" color="secondary" aria-label="add">
                //   {/* <AddIcon/>  */}
                // </Fab>,
                  <Popup/>,
              isFreeAction: true,
            },
            // {
            //   icon: () =>
            //   <ModeIcon  size="small" color="success"  />,onClick:(e,data)=>console.log(data)
            // },
            // {
            //   icon: () =>
            //    <DeleteOutlineIcon size="small" color="error"/> ,onClick:(e,data)=>console.log(data)
            // }
          ]}
          title={""} 
          columns={columns} data={data} />   
      </div>
    </>
  )
}

export default Crud
