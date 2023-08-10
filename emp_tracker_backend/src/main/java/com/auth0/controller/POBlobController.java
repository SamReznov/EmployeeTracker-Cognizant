package com.auth0.controller;


import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.POBlob;
import com.auth0.model.POBlobIdentity;
import com.auth0.service.POBlobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class POBlobController {

    @Autowired
    private POBlobService poBlobService;

//    @PostMapping("/po-blob")
//    ResponseEntity<String> savePOBlob(@RequestBody POBlob poBlob){
//        String message = "";
//        try {
//            message = poBlobService.savePOBlob(poBlob);
//        }
//        catch(ResourceNotFoundException e){
//            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//        catch(Exception e) {
//            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<String>(message,HttpStatus.OK);
//
//    }

    @GetMapping("/po-blobs")
    ResponseEntity<List<POBlob>> getAllPOBlobs(){
        List<POBlob> poBlobList=poBlobService.getPOBlobs();
        return ResponseEntity.ok().body(poBlobList);
    }

    @GetMapping("/po-blob/{revisionNumber}")
    ResponseEntity<?> getPOBlobById(@PathVariable POBlobIdentity poBlobIdentity){
        POBlob existingPOBlob=new POBlob();
        try{
            existingPOBlob=poBlobService.getPOBlobById(poBlobIdentity);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(existingPOBlob);

    }

//    @PutMapping("/po-blob")
//    ResponseEntity<?> updatePOBlob(@RequestBody POBlob poBlob){
//        POBlob updatedPOBlob=new POBlob();
//        try {
//            updatedPOBlob=poBlobService.updatePOBlob(poBlob);
//        }
//        catch(ResourceNotFoundException e){
//            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<POBlob>(updatedPOBlob,HttpStatus.OK);
//
//    }

    @DeleteMapping("po-blob/{revisionNumber}")
    ResponseEntity<String> deletePOBlob(@PathVariable POBlobIdentity poBlobIdentity){
        String message="";
        try {
            message = poBlobService.deletePOBlob(poBlobIdentity);
        }
        catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);

    }

    //get - get po blobs by po number
//    @GetMapping("po/{poNumber}/po-blobs")
//    public ResponseEntity<?> getPOBlobsByPO(@PathVariable double poNumber){
//        List<POBlobIdentity> poBlobs=new ArrayList<>();
//        try {
//            poBlobs= this.poBlobService.getPOBlobsByPONumber(poNumber);
//        }catch(ResourceNotFoundException e){
//            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<>(poBlobs, HttpStatus.OK);
//    }


}
