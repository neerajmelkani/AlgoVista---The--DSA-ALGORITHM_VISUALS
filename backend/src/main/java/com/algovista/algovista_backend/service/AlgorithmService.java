package com.algovista.algovista_backend.service;

import com.algovista.algovista_backend.model.Algorithm;
import com.algovista.algovista_backend.repository.AlgorithmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlgorithmService {

    @Autowired
    private AlgorithmRepository algorithmRepository;

    public List<Algorithm> getAllAlgorithms() {
        return algorithmRepository.findAll();
    }

    public Optional<Algorithm> getAlgorithmById(Long id) {
        return algorithmRepository.findById(id);
    }

    public List<Algorithm> getAlgorithmsByCategory(String category) {
        return algorithmRepository.findByCategory(category);
    }

    public Algorithm createAlgorithm(Algorithm algorithm) {
        return algorithmRepository.save(algorithm);
    }
}
