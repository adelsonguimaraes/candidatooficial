-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.25-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.4.0.5174
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para candidatooficial
CREATE DATABASE IF NOT EXISTS `candidatooficial` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `candidatooficial`;

-- Copiando estrutura para tabela candidatooficial.agenda
CREATE TABLE IF NOT EXISTS `agenda` (
  `id` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `horario` time DEFAULT NULL,
  `descricao` text,
  `datacastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela candidatooficial.agenda: ~0 rows (aproximadamente)
DELETE FROM `agenda`;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;

-- Copiando estrutura para tabela candidatooficial.bairro
CREATE TABLE IF NOT EXISTS `bairro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela candidatooficial.bairro: ~0 rows (aproximadamente)
DELETE FROM `bairro`;
/*!40000 ALTER TABLE `bairro` DISABLE KEYS */;
/*!40000 ALTER TABLE `bairro` ENABLE KEYS */;

-- Copiando estrutura para tabela candidatooficial.filiado
CREATE TABLE IF NOT EXISTS `filiado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idbairro` int(11) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `datanascimento` date DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(200) DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_filiado_bairro` (`idbairro`),
  CONSTRAINT `FK_filiado_bairro` FOREIGN KEY (`idbairro`) REFERENCES `bairro` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela candidatooficial.filiado: ~0 rows (aproximadamente)
DELETE FROM `filiado`;
/*!40000 ALTER TABLE `filiado` DISABLE KEYS */;
/*!40000 ALTER TABLE `filiado` ENABLE KEYS */;

-- Copiando estrutura para tabela candidatooficial.funcao
CREATE TABLE IF NOT EXISTS `funcao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela candidatooficial.funcao: ~0 rows (aproximadamente)
DELETE FROM `funcao`;
/*!40000 ALTER TABLE `funcao` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcao` ENABLE KEYS */;

-- Copiando estrutura para tabela candidatooficial.lider
CREATE TABLE IF NOT EXISTS `lider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtipolider` int(11) DEFAULT NULL,
  `idfuncao` int(11) DEFAULT NULL,
  `idbairro` int(11) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(200) DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `localidade` enum('CIDADE','INTERIOR') DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_lider_lider` (`idtipolider`),
  KEY `FK_lider_funcao` (`idfuncao`),
  KEY `FK_lider_bairro` (`idbairro`),
  CONSTRAINT `FK_lider_bairro` FOREIGN KEY (`idbairro`) REFERENCES `bairro` (`id`),
  CONSTRAINT `FK_lider_funcao` FOREIGN KEY (`idfuncao`) REFERENCES `funcao` (`id`),
  CONSTRAINT `FK_lider_lider` FOREIGN KEY (`idtipolider`) REFERENCES `lider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela candidatooficial.lider: ~0 rows (aproximadamente)
DELETE FROM `lider`;
/*!40000 ALTER TABLE `lider` DISABLE KEYS */;
/*!40000 ALTER TABLE `lider` ENABLE KEYS */;

-- Copiando estrutura para tabela candidatooficial.tipolider
CREATE TABLE IF NOT EXISTS `tipolider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela candidatooficial.tipolider: ~0 rows (aproximadamente)
DELETE FROM `tipolider`;
/*!40000 ALTER TABLE `tipolider` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipolider` ENABLE KEYS */;

-- Copiando estrutura para tabela candidatooficial.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idlider` int(11) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `perfil` enum('ADM','LIDER','AMIGO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_usuario_lider` (`idlider`),
  CONSTRAINT `FK_usuario_lider` FOREIGN KEY (`idlider`) REFERENCES `lider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela candidatooficial.usuario: ~0 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
