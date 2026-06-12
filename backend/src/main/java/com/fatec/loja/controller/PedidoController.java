package com.fatec.loja.controller;

import com.fatec.loja.dto.RetornoDTO;
import com.fatec.loja.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;


    @PostMapping("/finalizar")
    public ResponseEntity<RetornoDTO> finalizar(@RequestBody List<Map<String, Object>> itens) {
        try {
            pedidoService.finalizarPedido(itens);
            return ResponseEntity.ok(RetornoDTO.sucesso("Compra finalizada com sucesso!", null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(RetornoDTO.erro(e.getMessage()));
        }
    }
}
