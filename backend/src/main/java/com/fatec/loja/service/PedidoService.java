package com.fatec.loja.service;

import com.fatec.loja.model.Produto;
import com.fatec.loja.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class PedidoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public void finalizarPedido(List<Map<String, Object>> itens) {
        for (Map<String, Object> item : itens) {
            // Pega o objeto produto dentro do item
            Map<String, Object> produtoMap = (Map<String, Object>) item.get("produto");
            int codigo = (int) produtoMap.get("codigo");
            int quantidade = (int) item.get("quantidade");

            Produto produto = produtoRepository.findById((long) codigo)
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + codigo));

            if (produto.getQuantidade() < quantidade) {
                throw new RuntimeException("Estoque insuficiente para: " + produto.getNome());
            }

            produto.setQuantidade(produto.getQuantidade() - quantidade);
            produtoRepository.save(produto);
        }
    }
}
