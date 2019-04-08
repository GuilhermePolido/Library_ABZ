-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09-Abr-2019 às 00:31
-- Versão do servidor: 10.1.35-MariaDB
-- versão do PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `capalivro`
--

CREATE TABLE `capalivro` (
  `CD_CAPALIVRO` int(11) NOT NULL,
  `CD_LIVRO` int(11) NOT NULL,
  `DS_LOCALCAPA` varchar(255) DEFAULT NULL COMMENT 'Caminho para a capa do livro',
  `DS_LOCALLATERAL` varchar(255) DEFAULT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `comentario`
--

CREATE TABLE `comentario` (
  `CD_COMENTARIO` int(11) NOT NULL,
  `DS_COMENTARIO` varchar(45) DEFAULT NULL,
  `CD_LIVRO` int(11) NOT NULL,
  `DT_MANUTENCAO` varchar(45) DEFAULT NULL,
  `CD_USUARIO` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `devolucao`
--

CREATE TABLE `devolucao` (
  `CD_DEVOLUCAO` int(11) NOT NULL,
  `CD_EMPRESTIMO` int(11) NOT NULL,
  `DT_DEVOLUCAO` date DEFAULT NULL,
  `CD_USUARIO` varchar(50) NOT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplina`
--

CREATE TABLE `disciplina` (
  `CD_DISCIPLINA` varchar(6) NOT NULL,
  `NM_DISCIPLINA` varchar(45) DEFAULT NULL,
  `DS_PLANOENSINO` varchar(200) DEFAULT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplina_ref_basica`
--

CREATE TABLE `disciplina_ref_basica` (
  `CD_DISCIPLINA` varchar(6) NOT NULL,
  `CD_LIVRO` int(11) NOT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplina_ref_compolementar`
--

CREATE TABLE `disciplina_ref_compolementar` (
  `CD_DISCIPLINA` varchar(6) NOT NULL,
  `CD_LIVRO` int(11) NOT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `emprestimo`
--

CREATE TABLE `emprestimo` (
  `CD_EMPRESTIMO` int(11) NOT NULL,
  `DT_DEVOLUCAO` date DEFAULT NULL,
  `CD_USUARIO` varchar(50) NOT NULL,
  `DT_EMPRESTIMO` date DEFAULT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL,
  `LIVRO_CD_LIVRO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estante`
--

CREATE TABLE `estante` (
  `CD_ESTANTE` int(11) NOT NULL,
  `CD_ADMINISTRADOR` varchar(50) NOT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `estante`
--

INSERT INTO `estante` (`CD_ESTANTE`, `CD_ADMINISTRADOR`, `DT_MANUTENCAO`) VALUES
(1, '1', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `livro`
--

CREATE TABLE `livro` (
  `CD_LIVRO` int(11) NOT NULL,
  `DS_TITULO` varchar(80) DEFAULT NULL,
  `NM_AUTOR` varchar(60) DEFAULT NULL,
  `NM_EDITOR` varchar(45) DEFAULT NULL,
  `NR_PAGINA` int(11) DEFAULT NULL,
  `QT_LIVRO` int(11) DEFAULT NULL,
  `NR_CLASSIFICACAO` int(11) DEFAULT NULL,
  `DS_SUMARIO` varchar(200) DEFAULT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL,
  `CD_ESTANTE` int(11) NOT NULL,
  `ST_LIVRO` int(11) DEFAULT NULL COMMENT 'Situação do livro: (0) Disponivel, (1) Emprestado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `livro`
--

INSERT INTO `livro` (`CD_LIVRO`, `DS_TITULO`, `NM_AUTOR`, `NM_EDITOR`, `NR_PAGINA`, `QT_LIVRO`, `NR_CLASSIFICACAO`, `DS_SUMARIO`, `DT_MANUTENCAO`, `CD_ESTANTE`, `ST_LIVRO`) VALUES
(1, 'livro', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `logusuario`
--

CREATE TABLE `logusuario` (
  `CD_LOG` int(11) NOT NULL,
  `DS_LOG` varchar(255) DEFAULT NULL,
  `CD_USUARIO` varchar(50) NOT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL,
  `HR_LOG` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `reserva`
--

CREATE TABLE `reserva` (
  `CD_RESERVA` int(11) NOT NULL,
  `CD_LIVRO` int(11) NOT NULL,
  `CD_USUARIO` varchar(50) NOT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL,
  `DT_RESERVA` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `CD_USUARIO` varchar(50) NOT NULL,
  `DS_SENHA` varchar(255) NOT NULL,
  `DS_EMAIL` varchar(45) DEFAULT NULL,
  `NM_USUARIO` varchar(60) DEFAULT NULL,
  `NR_TELEFONE` varchar(19) DEFAULT NULL,
  `DT_MANUTENCAO` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`CD_USUARIO`, `DS_SENHA`, `DS_EMAIL`, `NM_USUARIO`, `NR_TELEFONE`, `DT_MANUTENCAO`) VALUES
('1', '1234', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `capalivro`
--
ALTER TABLE `capalivro`
  ADD PRIMARY KEY (`CD_CAPALIVRO`),
  ADD KEY `fk_capalivro_livro_idx` (`CD_LIVRO`);

--
-- Indexes for table `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`CD_COMENTARIO`),
  ADD KEY `fk_COMENTARIO_LIVRO1_idx` (`CD_LIVRO`),
  ADD KEY `fk_COMENTARIO_USUARIO1_idx` (`CD_USUARIO`);

--
-- Indexes for table `devolucao`
--
ALTER TABLE `devolucao`
  ADD PRIMARY KEY (`CD_DEVOLUCAO`),
  ADD KEY `fk_DEVOLUCAO_EMPRESTIMO1_idx` (`CD_EMPRESTIMO`),
  ADD KEY `fk_DEVOLUCAO_USUARIO1_idx` (`CD_USUARIO`);

--
-- Indexes for table `disciplina`
--
ALTER TABLE `disciplina`
  ADD PRIMARY KEY (`CD_DISCIPLINA`);

--
-- Indexes for table `disciplina_ref_basica`
--
ALTER TABLE `disciplina_ref_basica`
  ADD PRIMARY KEY (`CD_DISCIPLINA`,`CD_LIVRO`),
  ADD KEY `fk_DISCIPLINA_has_LIVRO1_LIVRO1_idx` (`CD_LIVRO`),
  ADD KEY `fk_DISCIPLINA_has_LIVRO1_DISCIPLINA1_idx` (`CD_DISCIPLINA`);

--
-- Indexes for table `disciplina_ref_compolementar`
--
ALTER TABLE `disciplina_ref_compolementar`
  ADD PRIMARY KEY (`CD_DISCIPLINA`,`CD_LIVRO`),
  ADD KEY `fk_DISCIPLINA_has_LIVRO_LIVRO1_idx` (`CD_LIVRO`),
  ADD KEY `fk_DISCIPLINA_has_LIVRO_DISCIPLINA1_idx` (`CD_DISCIPLINA`);

--
-- Indexes for table `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD PRIMARY KEY (`CD_EMPRESTIMO`),
  ADD KEY `fk_EMPRESTIMO_USUARIO1_idx` (`CD_USUARIO`),
  ADD KEY `fk_EMPRESTIMO_LIVRO1_idx` (`LIVRO_CD_LIVRO`);

--
-- Indexes for table `estante`
--
ALTER TABLE `estante`
  ADD PRIMARY KEY (`CD_ESTANTE`),
  ADD KEY `fk_ESTANTE_USUARIO1_idx` (`CD_ADMINISTRADOR`);

--
-- Indexes for table `livro`
--
ALTER TABLE `livro`
  ADD PRIMARY KEY (`CD_LIVRO`),
  ADD KEY `fk_LIVRO_ESTANTE1_idx` (`CD_ESTANTE`);

--
-- Indexes for table `logusuario`
--
ALTER TABLE `logusuario`
  ADD PRIMARY KEY (`CD_LOG`),
  ADD KEY `fk_LOGUSUARIO_USUARIO1_idx` (`CD_USUARIO`);

--
-- Indexes for table `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`CD_RESERVA`),
  ADD KEY `fk_RESERVA_LIVRO1_idx` (`CD_LIVRO`),
  ADD KEY `fk_RESERVA_USUARIO1_idx` (`CD_USUARIO`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`CD_USUARIO`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `capalivro`
--
ALTER TABLE `capalivro`
  MODIFY `CD_CAPALIVRO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comentario`
--
ALTER TABLE `comentario`
  MODIFY `CD_COMENTARIO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `devolucao`
--
ALTER TABLE `devolucao`
  MODIFY `CD_DEVOLUCAO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emprestimo`
--
ALTER TABLE `emprestimo`
  MODIFY `CD_EMPRESTIMO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estante`
--
ALTER TABLE `estante`
  MODIFY `CD_ESTANTE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `livro`
--
ALTER TABLE `livro`
  MODIFY `CD_LIVRO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `logusuario`
--
ALTER TABLE `logusuario`
  MODIFY `CD_LOG` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reserva`
--
ALTER TABLE `reserva`
  MODIFY `CD_RESERVA` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `capalivro`
--
ALTER TABLE `capalivro`
  ADD CONSTRAINT `fk_capalivro_livro` FOREIGN KEY (`CD_LIVRO`) REFERENCES `livro` (`CD_LIVRO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `fk_COMENTARIO_LIVRO1` FOREIGN KEY (`CD_LIVRO`) REFERENCES `livro` (`CD_LIVRO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_COMENTARIO_USUARIO1` FOREIGN KEY (`CD_USUARIO`) REFERENCES `usuario` (`CD_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `devolucao`
--
ALTER TABLE `devolucao`
  ADD CONSTRAINT `fk_DEVOLUCAO_EMPRESTIMO1` FOREIGN KEY (`CD_EMPRESTIMO`) REFERENCES `emprestimo` (`CD_EMPRESTIMO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_DEVOLUCAO_USUARIO1` FOREIGN KEY (`CD_USUARIO`) REFERENCES `usuario` (`CD_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `disciplina_ref_basica`
--
ALTER TABLE `disciplina_ref_basica`
  ADD CONSTRAINT `fk_DISCIPLINA_has_LIVRO1_DISCIPLINA1` FOREIGN KEY (`CD_DISCIPLINA`) REFERENCES `disciplina` (`CD_DISCIPLINA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_DISCIPLINA_has_LIVRO1_LIVRO1` FOREIGN KEY (`CD_LIVRO`) REFERENCES `livro` (`CD_LIVRO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `disciplina_ref_compolementar`
--
ALTER TABLE `disciplina_ref_compolementar`
  ADD CONSTRAINT `fk_DISCIPLINA_has_LIVRO_DISCIPLINA1` FOREIGN KEY (`CD_DISCIPLINA`) REFERENCES `disciplina` (`CD_DISCIPLINA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_DISCIPLINA_has_LIVRO_LIVRO1` FOREIGN KEY (`CD_LIVRO`) REFERENCES `livro` (`CD_LIVRO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD CONSTRAINT `fk_EMPRESTIMO_LIVRO1` FOREIGN KEY (`LIVRO_CD_LIVRO`) REFERENCES `livro` (`CD_LIVRO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_EMPRESTIMO_USUARIO1` FOREIGN KEY (`CD_USUARIO`) REFERENCES `usuario` (`CD_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `estante`
--
ALTER TABLE `estante`
  ADD CONSTRAINT `fk_ESTANTE_USUARIO1` FOREIGN KEY (`CD_ADMINISTRADOR`) REFERENCES `usuario` (`CD_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `livro`
--
ALTER TABLE `livro`
  ADD CONSTRAINT `fk_LIVRO_ESTANTE1` FOREIGN KEY (`CD_ESTANTE`) REFERENCES `estante` (`CD_ESTANTE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `logusuario`
--
ALTER TABLE `logusuario`
  ADD CONSTRAINT `fk_LOGUSUARIO_USUARIO1` FOREIGN KEY (`CD_USUARIO`) REFERENCES `usuario` (`CD_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `fk_RESERVA_LIVRO1` FOREIGN KEY (`CD_LIVRO`) REFERENCES `livro` (`CD_LIVRO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_RESERVA_USUARIO1` FOREIGN KEY (`CD_USUARIO`) REFERENCES `usuario` (`CD_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
