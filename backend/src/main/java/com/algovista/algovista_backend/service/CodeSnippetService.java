package com.algovista.algovista_backend.service;

import com.algovista.algovista_backend.model.CodeSnippet;
import com.algovista.algovista_backend.repository.CodeSnippetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CodeSnippetService {

    @Autowired
    private CodeSnippetRepository codeSnippetRepository;

    public List<CodeSnippet> getAllCodeSnippets() {
        return codeSnippetRepository.findAll();
    }

    public Optional<CodeSnippet> getCodeSnippetById(Long id) {
        return codeSnippetRepository.findById(id);
    }

    public List<CodeSnippet> getCodeSnippetsByAlgorithmId(Long algorithmId) {
        return codeSnippetRepository.findByAlgorithmId(algorithmId);
    }

    public CodeSnippet createCodeSnippet(CodeSnippet codeSnippet) {
        return codeSnippetRepository.save(codeSnippet);
    }
}
