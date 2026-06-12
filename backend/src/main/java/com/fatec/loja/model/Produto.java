package com.fatec.loja.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "produtos")
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    
    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(columnDefinition = "TEXT")
    private String descritivo;
    
    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    @Column(nullable = false)
    private Double valor;
    
    @Min(value = 0, message = "Quantidade não pode ser negativa")
    private Integer quantidade = 0;
    
    @Column(length = 100)
    private String gravadora;
    
    @ElementCollection
    @CollectionTable(name = "produto_faixas", joinColumns = @JoinColumn(name = "produto_codigo"))
    @Column(name = "faixa")
    private List<String> faixas;
    
    private Integer destaque = 0;
    
    @Column(length = 500)
    private String imagemUrl;
    
    // Construtores
    public Produto() {}
    
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