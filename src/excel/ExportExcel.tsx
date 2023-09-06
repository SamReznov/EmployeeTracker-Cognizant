import React from 'react'
import XLSX from 'sheetjs-style'
import * as FileSaver from 'file-saver';
import { Button, Tooltip } from '@mui/material';
const ExportExcel = ({excelData,fileName}:any) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:charset=UTF-8';
    const fileExtention = '.xlsx';
    const exportToExcel = async ()=>{
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = {Sheets:{ 'data': ws },SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb,{bookType:'xlsx',type:'array'})
        const data = new Blob([excelBuffer],{type:fileType});
        FileSaver.saveAs(data,fileName+fileExtention);
    }
  return (
    <div>
        <Tooltip title="Excel Export">
            <Button variant = 'contained' onClick={(e)=>{exportToExcel()} } color='primary'>
                Excel Export
            </Button>
        </Tooltip>
    </div>
  )
}

export default ExportExcel