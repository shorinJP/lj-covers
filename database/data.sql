-- Criar banco de dados
CREATE DATABASE loja_discos;
CREATE DATABASE IF NOT EXISTS loja_discos;
USE loja_discos;

-- Inserir produtos (discos de vinil)
INSERT INTO produtos (codigo, nome, descritivo, valor, quantidade, gravadora, destaque, imagem_url) VALUES
(1, 'Tim Maia 1972', 'Seu terceiro álbum com 12 faixas onde ele embeleza e nos mostra o que realmente é MPB.', 400.00, 3, 'Polydor', 1, '/public/img1.jpeg'),
(2, 'Queen: News of the World 1977', 'Considerado por muitos o melhor álbum da banda, contendo 11 faixas sendo uma delas "We Are The Champions". Isso é Rock!', 290.00, 8, 'EMI / Elektra', 1, '/public/img2.jpeg'),
(3, 'Queen: A Night at the Opera 1975', 'Mistura rock, ópera, baladas e pop. Produção sofisticada para a época. "Bohemian Rhapsody" sendo a mais conhecida.', 250.00, 20, 'EMI / Elektra', 1, '/public/img3.jpeg'),
(4, 'Creed: The Best Of Creed 2025', 'Um disco onde se reúne o melhor do Creed. Isso é Slow Rock.', 300.00, 10, 'Wind-up Records', 0, '/public/img4.jpeg'),
(5, "BMTH: That's the Spirit 2015", "BMTH se renova em uma pegada mais pop sem deixar o Rock de lado. 11 faixas, com 'Follow You' sendo a melhor.", 280.00, 5, 'RCA Records', 1, '/public/img5.jpeg'),
(6, 'BMTH: Sempiternal 2013', "BMTH na sua maior essência, o puro Metalcore. 11 faixas sendo 'Can You Feel My Heart' a mais famosa.", 300.00, 8, 'RCA Records', 0, '/public/img6.jpeg'),
(7, 'Rita Lee (Remastered) 1979', "Rita Lee revolucionando o POP brasileiro. 8 faixas, com 'Mania de Você' sendo a mais famosa.", 260.00, 7, 'Som Livre', 0, '/public/img7.jpeg'),
(8, 'Chico Buarque 1987', "Com 11 faixas Chico traz um novo ar para o MPB, com 'Cálice' e 'Apesar de Você' eternizadas na memória.", 300.00, 1, 'Philips', 0, '/public/img8.jpeg'),
(9, 'Charlie Brown Jr.: Abalando sua Fábrica 2001', "Punk Rock e Hardcore melódico em 12 faixas. 'Lugar ao Sol' sendo a mais conhecida.", 200.00, 1, 'Virgin Records', 0, '/public/img9.jpeg'),
(10, 'Bob Marley: The Best of Bob Marley 1984', "16 faixas com o melhor da lenda jamaicana. 'Is This Love', 'No Woman, No Cry' e 'Could You Be Loved'.", 180.00, 2, 'Island Records', 1, '/public/img10.jpeg'),
(11, 'Tyler, The Creator: Igor 2019', "Mistura RAP, JAZZ, FUNK, GOSPEL. 12 faixas com 'Earfquake' sendo a mais famosa.", 250.00, 6, 'Columbia Records', 0, '/public/img11.jpeg'),
(12, 'Toca-discos Crosley Keepsake', 'Um toca-discos simples, porém muito elegante.', 800.00, 5, 'Crosley', 0, '/public/img12.jpeg');

-- Inserir faixas para os produtos
INSERT INTO produto_faixas (produto_codigo, faixa) VALUES
(1, 'Não Quero Dinheiro'), (1, 'Me Dê Motivo'), (1, 'Primavera'), (1, 'Azul da Cor do Mar'),
(2, 'We Will Rock You'), (2, 'We Are the Champions'), (2, 'Sheer Heart Attack'),
(3, 'Death on Two Legs'), (3, 'Lazing on a Sunday Afternoon'), (3, "I'm in Love with My Car"), (3, "You're My Best Friend"), (3, "'39"), (3, 'Bohemian Rhapsody');

-- Verificar dados
SELECT * FROM produtos;