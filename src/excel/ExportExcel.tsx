import React from 'react'
import XLSX from 'sheetjs-style'
import * as FileSaver from 'file-saver';
class ExportExcel{

   
    
    exportToExcel(excelData:any,fileName:any){
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:charset=UTF-8';
        const fileExtention = '.xlsx';
        console.log(excelData)
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = {Sheets:{ 'data': ws },SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb,{bookType:'xlsx',type:'array'})
        const data = new Blob([excelBuffer],{type:fileType});
        return FileSaver.saveAs(data,fileName+fileExtention);
    }

}

export default new ExportExcel