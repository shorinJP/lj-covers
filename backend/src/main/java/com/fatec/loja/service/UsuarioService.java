package com.fatec.loja.service;

import com.fatec.loja.dto.UsuarioDTO;
import com.fatec.loja.model.Usuario;
import com.fatec.loja.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private JavaMailSender mailSender;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    
    public UsuarioDTO cadastrar(UsuarioDTO dto) {
        // Verificar se email já existe
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        // Verificar se CPF já existe
        if (dto.getCpf() != null && usuarioRepository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }
        
        // Verificar se senhas conferem
        if (dto.getConfirmarSenha() == null || !dto.getSenha().equals(dto.getConfirmarSenha())) {
    throw new RuntimeException("Senhas não conferem");
        }
        
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(encoder.encode(dto.getSenha()));
        usuario.setCpf(dto.getCpf());
        usuario.setTelefone(dto.getTelefone());
        
        Usuario saved = usuarioRepository.save(usuario);
        
        UsuarioDTO response = new UsuarioDTO();
        response.setId(saved.getId());
        response.setNome(saved.getNome());
        response.setEmail(saved.getEmail());
        response.setCpf(saved.getCpf());
        response.setTelefone(saved.getTelefone());
        
        return response;
    }
    
    public UsuarioDTO login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));
        
        if (!encoder.matches(senha, usuario.getSenha())) {
            throw new RuntimeException("Email ou senha inválidos");
        }
        
        UsuarioDTO response = new UsuarioDTO();
        response.setId(usuario.getId());
        response.setNome(usuario.getNome());
        response.setEmail(usuario.getEmail());
        response.setCpf(usuario.getCpf());
        response.setTelefone(usuario.getTelefone());
        
        return response;
    }

    public void recuperarSenha(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email não encontrado"));

        String novaSenha = gerarSenhaTemporaria();
        usuario.setSenha(encoder.encode(novaSenha));
        usuarioRepository.save(usuario);

        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(usuario.getEmail());
        mensagem.setSubject("Recuperação de senha - LJ Covers");
        mensagem.setText(
            "Olá, " + usuario.getNome() + "!\n\n" +
            "Sua nova senha temporária é: " + novaSenha + "\n\n" +
            "Por favor, faça login e altere sua senha assim que possível.\n\n" +
            "Atenciosamente,\nEquipe LJ Covers"
        );

        mailSender.send(mensagem);
    }

    private String gerarSenhaTemporaria() {
        return java.util.UUID.randomUUID().toString().substring(0, 8);
    }
}