package com.fatec.loja.service;

import com.fatec.loja.dto.ProdutoDTO;
import com.fatec.loja.model.Produto;
import com.fatec.loja.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;
    
    private ProdutoDTO convertToDTO(Produto produto) {
        ProdutoDTO dto = new ProdutoDTO();
        dto.setCodigo(produto.getCodigo());
        dto.setNome(produto.getNome());
        dto.setDescritivo(produto.getDescritivo());
        dto.setValor(produto.getValor());
        dto.setQuantidade(produto.getQuantidade());
        dto.setGravadora(produto.getGravadora());
        dto.setFaixas(produto.getFaixas());
        dto.setDestaque(produto.getDestaque());
        dto.setImagemUrl(produto.getImagemUrl());
        return dto;
    }
    
    private Produto convertToEntity(ProdutoDTO dto) {
        Produto produto = new Produto();
        produto.setCodigo(dto.getCodigo());
        produto.setNome(dto.getNome());
        produto.setDescritivo(dto.getDescritivo());
        produto.setValor(dto.getValor());
        produto.setQuantidade(dto.getQuantidade());
        produto.setGravadora(dto.getGravadora());
        produto.setFaixas(dto.getFaixas());
        produto.setDestaque(dto.getDestaque());
        produto.setImagemUrl(dto.getImagemUrl());
        return produto;
    }
    
    public List<ProdutoDTO> listarTodos() {
        return produtoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ProdutoDTO buscarPorId(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return convertToDTO(produto);
    }
    
    public List<ProdutoDTO> buscarPorTermo(String termo) {
        return produtoRepository.buscaPorTermo(termo).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<ProdutoDTO> buscarDestaques() {
        return produtoRepository.findByDestaqueGreaterThanOrderByDestaqueAsc(0).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProdutoDTO cadastrar(ProdutoDTO dto) {
        Produto produto = convertToEntity(dto);
        produto.setCodigo(null); // garante que vai gerar novo ID
        Produto saved = produtoRepository.save(produto);
        return convertToDTO(saved);
    }
}