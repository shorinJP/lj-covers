package com.fatec.loja.controller;

import com.fatec.loja.dto.LoginDTO;
import com.fatec.loja.dto.RetornoDTO;
import com.fatec.loja.dto.UsuarioDTO;
import com.fatec.loja.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;
    

    @PostMapping("/cadastro")
    public ResponseEntity<RetornoDTO> cadastrar(@Valid @RequestBody UsuarioDTO dto) {
        try {
            UsuarioDTO usuario = usuarioService.cadastrar(dto);
            return ResponseEntity.ok(RetornoDTO.sucesso("Cadastro realizado com sucesso", usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(RetornoDTO.erro(e.getMessage()));
        }
    }
    

    @PostMapping("/login")
    public ResponseEntity<RetornoDTO> login(@Valid @RequestBody LoginDTO dto) {
        try {
            UsuarioDTO usuario = usuarioService.login(dto.getEmail(), dto.getSenha());
            return ResponseEntity.ok(RetornoDTO.sucesso("Login realizado com sucesso", usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(RetornoDTO.erro(e.getMessage()));
        }
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<RetornoDTO> recuperarSenha(@RequestBody LoginDTO dto) {
        try {
            usuarioService.recuperarSenha(dto.getEmail());
            return ResponseEntity.ok(RetornoDTO.sucesso("Nova senha enviada para " + dto.getEmail(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(RetornoDTO.erro(e.getMessage()));
        }
    }
}