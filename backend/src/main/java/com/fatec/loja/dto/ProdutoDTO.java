package com.fatec.loja.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public class ProdutoDTO {
    private Long codigo;
    
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    
    private String descritivo;
    
    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    private Double valor;
    
    @PositiveOrZero(message = "Quantidade deve ser não negativa")
    private Integer quantidade;
    
    private String gravadora;
    private List<String> faixas;
    private Integer destaque;
    private String imagemUrl;
    
    // Getters e Setters
    public Long getCodigo() { return codigo; }
    public void setCodigo(Long codigo) { this.codigo = codigo; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getDescritivo() { return descritivo; }
    public void setDescritivo(String descritivo) { this.descritivo = descritivo; }
    
    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }
    
    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
    
    public String getGravadora() { return gravadora; }
    public void setGravadora(String gravadora) { this.gravadora = gravadora; }
    
    public List<String> getFaixas() { return faixas; }
    public void setFaixas(List<String> faixas) { this.faixas = faixas; }
    
    public Integer getDestaque() { return destaque; }
    public void setDestaque(Integer destaque) { this.destaque = destaque; }
    
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
}