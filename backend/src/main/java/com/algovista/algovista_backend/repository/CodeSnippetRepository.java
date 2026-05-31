package com.algovista.algovista_backend.repository;

import com.algovista.algovista_backend.model.CodeSnippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Long> {
    List<CodeSnippet> findByAlgorithmId(Long algorithmId);
}
