import React from 'react'
import MaterialTable from '@material-table/core'
import Popup from './Popup';

function Crud() {
   
  // const [data, setData] = useState([])
  // console.log(setData) 

  const url = 'https://jsonplaceholder.typicode.com/users'
  const columns = [
    { title: "Name", field: "name" },
    { title: "UserName", field: "username" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" }
  ];

  // useEffect(() => {
   
  // }, [])

  // getApi
  // const getData = async () => {
  //   await fetch(url).then((res) => {
  //     res.json().then((result) => {
  //       setData(result)
  //     })
  //   })
  // };

  

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
            // headerStyle:{backgroundColor:"black",color:"white"}
            filtering:true,
            debounceInterval:700,
            padding:"dense"
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
              // getData()
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
              // getData()
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
          columns={columns} 
          data={query =>
            new Promise((resolve, reject) => {
              // console.log(query)
              let url = "https://jsonplaceholder.typicode.com/users?"
              if(query.search){
                url+=`q=${query.search}`
              }
              if(query.orderBy){
                url+=`&_sort=${query.orderBy.field}&_order=${query.orderDirection}`
              }
              if(query.filters.length){
              const filter = query.filters.map((filter)=>{
                   return `&${filter.column.field}${filter.operator}${filter.value}`
                })
                url+=filter.join('')
              }
              url+=`&_page=${query.page+1}`
              url+=`&_limit=${query.pageSize}`
              // prepare your data and then call resolve like this:
              fetch(url).then(res=>res.json()).then(data=>{
                resolve({
                  data: data,// your data array
                  page: query.page,// current page number     
                  totalCount:499 // total row number
              });
              })
            
            })
          
        }/>   
      </div>
    </>
  )
}

export default Crud
