package com.fatec.loja.repository;

import com.fatec.loja.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
    // Busca por nome (ignorando maiúsculas/minúsculas)
    List<Produto> findByNomeContainingIgnoreCase(String nome);
    
    // Produtos em destaque
    List<Produto> findByDestaqueGreaterThanOrderByDestaqueAsc(Integer destaque);
    
    // Busca por termo no nome
    @Query("SELECT p FROM Produto p WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :termo, '%'))")
    List<Produto> buscaPorTermo(@Param("termo") String termo);
}