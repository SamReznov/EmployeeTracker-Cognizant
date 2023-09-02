package com.auth0.controller;


import com.auth0.dto.POBlobDataDTO;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.POBlobData;
import com.auth0.service.POBlobDataService;
import com.auth0.service.PoBlobPdfService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class POBlobDataController {

    @Autowired
    private POBlobDataService poBlobService;

    @Autowired
    private PoBlobPdfService poBlobPdfService;

    @Autowired
    private ObjectMapper mapper;

//    @PostMapping("/pdf")
//    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
//        String uploadImage = poBlobPdfService.uploadImage(file);
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(uploadImage);
//    }


    @PostMapping("/po-blob")
    ResponseEntity<String> savePOBlob(@RequestParam("blobData") String blobData,@RequestParam("file") MultipartFile file) throws IOException{
        String message = "";
        POBlobDataDTO poBlobDataDTO=mapper.readValue(blobData,POBlobDataDTO.class);
        try {
            String uploadImage = poBlobPdfService.uploadImage(file);
            message = poBlobService.savePOBlob(poBlobDataDTO);
            System.out.println(file.getOriginalFilename());
            System.out.println(poBlobDataDTO);
        }
        catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);

    }

    @GetMapping("/po-blobs")
    ResponseEntity<List<POBlobData>> getAllPOBlobs(){
        List<POBlobData> poBlobList=poBlobService.getPOBlobs();
        return ResponseEntity.ok().body(poBlobList);
    }

    @GetMapping("/po-blob/{id}")
    ResponseEntity<?> getPOBlobById(@PathVariable long id){
        POBlobData existingPOBlob=new POBlobData();
        try{
            existingPOBlob=poBlobService.getPOBlobById(id);
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
    ResponseEntity<String> deletePOBlob(@PathVariable long id){
        String message="";
        try {
            message = poBlobService.deletePOBlob(id);
        }
        catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);

    }

    //get - get po blobs by po number
    @GetMapping("po/{poNumber}/po-blobs")
    public ResponseEntity<?> getPOBlobsByPO(@PathVariable double poNumber){
        List<POBlobData> poBlobs=new ArrayList<>();
        try {
            poBlobs= this.poBlobService.getPOBlobsByPONumber(poNumber);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(poBlobs, HttpStatus.OK);
    }


}
