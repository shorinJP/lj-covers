package com.fatec.loja.controller;

import com.fatec.loja.dto.ProdutoDTO;
import com.fatec.loja.dto.RetornoDTO;
import com.fatec.loja.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;
    

    @GetMapping
    public ResponseEntity<RetornoDTO> listarTodos() {
        List<ProdutoDTO> produtos = produtoService.listarTodos();
        return ResponseEntity.ok(RetornoDTO.sucesso("Produtos listados", produtos));
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<RetornoDTO> buscarPorId(@PathVariable Long id) {
        try {
            ProdutoDTO produto = produtoService.buscarPorId(id);
            return ResponseEntity.ok(RetornoDTO.sucesso("Produto encontrado", produto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(RetornoDTO.erro(e.getMessage()));
        }
    }
    

    @GetMapping("/busca")
    public ResponseEntity<RetornoDTO> buscarPorTermo(@RequestParam String termo) {
        List<ProdutoDTO> produtos = produtoService.buscarPorTermo(termo);
        return ResponseEntity.ok(RetornoDTO.sucesso("Resultados da busca", produtos));
    }
    
    // GET /api/produtos/destaques - Vitrine
    @GetMapping("/destaques")
    public ResponseEntity<RetornoDTO> buscarDestaques() {
        List<ProdutoDTO> destaques = produtoService.buscarDestaques();
        return ResponseEntity.ok(RetornoDTO.sucesso("Produtos em destaque", destaques));
    }

    // POST /api/produtos - Cadastrar produto
    @PostMapping
    public ResponseEntity<RetornoDTO> cadastrar(@RequestBody ProdutoDTO dto) {
        try {
            ProdutoDTO produto = produtoService.cadastrar(dto);
            return ResponseEntity.ok(RetornoDTO.sucesso("Produto cadastrado com sucesso", produto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(RetornoDTO.erro(e.getMessage()));
        }
    }
}