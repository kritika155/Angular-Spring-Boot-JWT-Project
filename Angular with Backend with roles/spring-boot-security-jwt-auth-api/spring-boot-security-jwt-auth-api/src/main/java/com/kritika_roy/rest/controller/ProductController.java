package com.kritika_roy.rest.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.kritika_roy.entity.Product;
import com.kritika_roy.service.ProductService;

 
@RestController
@CrossOrigin
public class ProductController {
 
    @Autowired
    private ProductService service;
     
    // RESTful API methods for Retrieval operations
    @GetMapping("/products")
    public List<Product> list() {
        return service.listAll();
    }
   
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> get(@PathVariable Integer id) {
        try {
            Product product = service.get(id);
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }      
    }
    // RESTful API method for Create operation
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/products")
    public void add(@RequestBody Product product) {
        service.save(product);
    }
    // RESTful API method for Update operation
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/products/{id}")
    public ResponseEntity<?> update(@RequestBody Product product, @PathVariable Integer id) {
        try {
        	Product updateProduct=service.get(id);
        	updateProduct.setName(product.getName());
        	updateProduct.setPrice(product.getPrice());
        	service.save(updateProduct);
            return new ResponseEntity<String>("Data Updated Successfully",HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<String>("No such elements exist",HttpStatus.NOT_FOUND);
        }      
    }
    // RESTful API method for Delete operation
    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        service.delete(id);
        return new ResponseEntity<String>("Data deleted Successfully",HttpStatus.OK);
    }
}

