package com.algovista.algovista_backend.controller;

import com.algovista.algovista_backend.model.CodeSnippet;
import com.algovista.algovista_backend.service.CodeSnippetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/code-snippets")
@CrossOrigin(origins = "http://localhost:5173")
public class CodeSnippetController {

    @Autowired
    private CodeSnippetService codeSnippetService;

    @GetMapping
    public ResponseEntity<List<CodeSnippet>> getAllCodeSnippets() {
        return ResponseEntity.ok(codeSnippetService.getAllCodeSnippets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CodeSnippet> getCodeSnippetById(@PathVariable Long id) {
        return codeSnippetService.getCodeSnippetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/algorithm/{algorithmId}")
    public ResponseEntity<List<CodeSnippet>> getCodeSnippetsByAlgorithmId(@PathVariable Long algorithmId) {
        return ResponseEntity.ok(codeSnippetService.getCodeSnippetsByAlgorithmId(algorithmId));
    }

    @PostMapping
    public ResponseEntity<CodeSnippet> createCodeSnippet(@RequestBody CodeSnippet codeSnippet) {
        return ResponseEntity.ok(codeSnippetService.createCodeSnippet(codeSnippet));
    }
}
