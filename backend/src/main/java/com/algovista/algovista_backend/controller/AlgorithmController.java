package com.algovista.algovista_backend.controller;

import com.algovista.algovista_backend.model.Algorithm;
import com.algovista.algovista_backend.service.AlgorithmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/algorithms")
@CrossOrigin(origins = "http://localhost:5173")
public class AlgorithmController {

    @Autowired
    private AlgorithmService algorithmService;

    @GetMapping
    public ResponseEntity<List<Algorithm>> getAllAlgorithms() {
        return ResponseEntity.ok(algorithmService.getAllAlgorithms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Algorithm> getAlgorithmById(@PathVariable Long id) {
        return algorithmService.getAlgorithmById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Algorithm>> getAlgorithmsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(algorithmService.getAlgorithmsByCategory(category));
    }

    @PostMapping
    public ResponseEntity<Algorithm> createAlgorithm(@RequestBody Algorithm algorithm) {
        return ResponseEntity.ok(algorithmService.createAlgorithm(algorithm));
    }
}
