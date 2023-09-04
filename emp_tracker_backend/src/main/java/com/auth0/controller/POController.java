package com.auth0.controller;


import com.auth0.exception.EmployeeNotFoundException;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.PO;
import com.auth0.service.POService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class POController {

    @Autowired
    private POService poService;

    @PostMapping("/po")
    ResponseEntity<String> savePO(@RequestBody PO po){
        String message="";
        try {
            message = poService.savePO(po);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);
    }

    @GetMapping("/pos")
    ResponseEntity<List<PO>> getAllPOs(){
        List<PO> poList=poService.getPOs();
        return ResponseEntity.ok().body(poList);
    }

    @GetMapping("/po/{poNumber}")
    ResponseEntity<?> getPOById(@PathVariable double poNumber){
        PO existPO=new PO();
        try{
            existPO=poService.getPOById(poNumber);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(existPO);
    }

    @PutMapping("/po")
    ResponseEntity<?> updatePO(@RequestBody PO po){
        PO updatedPO=new PO();
        try{
            updatedPO=poService.updatePO(po);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(updatedPO);
    }

    @DeleteMapping("po/{poNumber}")
    ResponseEntity<String> deletePO(@PathVariable double poNumber){
        String message="";
        try{
            message=poService.deletePO(poNumber);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(message);
    }

    @GetMapping("/po/{poNumber}/employees")
    ResponseEntity<?> getAllEmployeesByProjectId(@PathVariable double poNumber){
        List<Employee> employeeList=new ArrayList<>();
        try{
            employeeList=poService.getAllEmployeeByPONumber(poNumber);

        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(employeeList);
    }

    @GetMapping("/po")
    ResponseEntity<Page<PO>> getTotalEmployeeByPage(
            @RequestParam(value="pageNo") int pageNo
    ){
        Page<PO> poPage=poService.findAllPoByPage(pageNo);
        return ResponseEntity.ok().body(poPage);
    }

    @GetMapping("/po_by_po_number")
    ResponseEntity<?> getPoByPoNumber(@RequestParam(value="pageNo", defaultValue = "1") int pageNo,
                                                  @RequestParam(value="poNumber", defaultValue = "0") double poNumber
    ){
        Page<PO> poPage;
        try{
            poPage=poService.findPOByPONumber(poNumber,pageNo);
        }catch(EmployeeNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(poPage);
    }


}
