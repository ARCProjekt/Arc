-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Máj 03. 18:11
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `arc`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alkotos`
--

CREATE TABLE `alkotos` (
  `a_azon` bigint(20) UNSIGNED NOT NULL,
  `szak_id` bigint(20) UNSIGNED NOT NULL,
  `nyelv_id_nev` bigint(20) UNSIGNED NOT NULL,
  `kep_azon` bigint(20) UNSIGNED NOT NULL,
  `nyelv_id_bemutat` bigint(20) UNSIGNED NOT NULL,
  `buszkesegeink` tinyint(1) NOT NULL DEFAULT 0,
  `cs_azon` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `alkotos`
--

INSERT INTO `alkotos` (`a_azon`, `szak_id`, `nyelv_id_nev`, `kep_azon`, `nyelv_id_bemutat`, `buszkesegeink`, `cs_azon`, `created_at`, `updated_at`) VALUES
(1, 1, 24, 1, 28, 0, 1, '2024-05-03 14:04:22', '2024-05-03 14:04:22'),
(2, 2, 25, 2, 29, 1, 1, '2024-05-03 14:04:22', '2024-05-03 14:04:22'),
(3, 2, 26, 2, 40, 1, 2, '2024-05-03 14:04:22', '2024-05-03 14:04:22');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csapats`
--

CREATE TABLE `csapats` (
  `cs_azon` bigint(20) UNSIGNED NOT NULL,
  `galeria_id` bigint(20) UNSIGNED NOT NULL,
  `k_id` bigint(20) UNSIGNED NOT NULL,
  `nyelv_id_csapat_nev` bigint(20) UNSIGNED NOT NULL,
  `nyelv_id_leiras` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `csapats`
--

INSERT INTO `csapats` (`cs_azon`, `galeria_id`, `k_id`, `nyelv_id_csapat_nev`, `nyelv_id_leiras`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 34, 36, '2024-05-03 14:04:17', '2024-05-03 14:04:17'),
(2, 2, 2, 35, 37, '2024-05-03 14:04:17', '2024-05-03 14:04:17');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `galerias`
--

CREATE TABLE `galerias` (
  `galeria_id` bigint(20) UNSIGNED NOT NULL,
  `fogaleria` bigint(20) UNSIGNED DEFAULT NULL,
  `nyelv_id_leiras` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `galerias`
--

INSERT INTO `galerias` (`galeria_id`, `fogaleria`, `nyelv_id_leiras`, `created_at`, `updated_at`) VALUES
(1, NULL, 32, '2024-05-03 14:04:09', '2024-05-03 14:04:09'),
(2, 1, 32, '2024-05-03 14:04:09', '2024-05-03 14:04:09');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `galeria_keps`
--

CREATE TABLE `galeria_keps` (
  `galeria_id` bigint(20) UNSIGNED NOT NULL,
  `kep_azon` bigint(20) UNSIGNED NOT NULL,
  `kiemelt_kep` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `galeria_keps`
--

INSERT INTO `galeria_keps` (`galeria_id`, `kep_azon`, `kiemelt_kep`, `created_at`, `updated_at`) VALUES
(1, 1, 0, '2024-05-03 14:04:10', '2024-05-03 14:04:10'),
(1, 2, 0, '2024-05-03 14:04:10', '2024-05-03 14:04:10'),
(2, 1, 0, '2024-05-03 14:04:10', '2024-05-03 14:04:10'),
(2, 2, 0, '2024-05-03 14:04:10', '2024-05-03 14:04:10');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jogosultsags`
--

CREATE TABLE `jogosultsags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jog` char(255) NOT NULL DEFAULT 'T',
  `elnevezes` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `jogosultsags`
--

INSERT INTO `jogosultsags` (`id`, `jog`, `elnevezes`, `created_at`, `updated_at`) VALUES
(1, 'A', 'Admin', '2024-05-03 14:03:59', '2024-05-03 14:03:59'),
(2, 'T', 'Tanár', '2024-05-03 14:03:59', '2024-05-03 14:03:59');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategorias`
--

CREATE TABLE `kategorias` (
  `k_id` bigint(20) UNSIGNED NOT NULL,
  `nyelv_id_elnevezes` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `kategorias`
--

INSERT INTO `kategorias` (`k_id`, `nyelv_id_elnevezes`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(2, 2, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(3, 3, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(4, 4, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(5, 5, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(6, 6, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(7, 7, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(8, 8, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(9, 9, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(10, 10, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(11, 11, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(12, 12, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(13, 13, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(14, 14, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(15, 15, '2024-05-03 14:04:12', '2024-05-03 14:04:12'),
(16, 16, '2024-05-03 14:04:13', '2024-05-03 14:04:13'),
(17, 17, '2024-05-03 14:04:13', '2024-05-03 14:04:13'),
(18, 18, '2024-05-03 14:04:13', '2024-05-03 14:04:13'),
(19, 19, '2024-05-03 14:04:13', '2024-05-03 14:04:13'),
(20, 20, '2024-05-03 14:04:13', '2024-05-03 14:04:13'),
(21, 21, '2024-05-03 14:04:13', '2024-05-03 14:04:13');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kepeks`
--

CREATE TABLE `kepeks` (
  `kep_azon` bigint(20) UNSIGNED NOT NULL,
  `kep` varchar(255) NOT NULL,
  `nyelv_id_leiras` bigint(20) UNSIGNED NOT NULL,
  `fotos_neve` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `kepeks`
--

INSERT INTO `kepeks` (`kep_azon`, `kep`, `nyelv_id_leiras`, `fotos_neve`, `created_at`, `updated_at`) VALUES
(1, 'storage/csapatkepek/csapat.jpg', 30, 'R. Máté', '2024-05-03 14:04:07', '2024-05-03 14:04:07'),
(2, 'storage/csapatkepek/csapat.jpg', 31, 'Balázs', '2024-05-03 14:04:07', '2024-05-03 14:04:07');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_01_12_103410_create_jogosultsags_table', 1),
(2, '2014_10_12_000000_create_users_table', 1),
(3, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2024_01_12_103309_create_nyelvs_table', 1),
(7, '2024_01_12_103319_create_szaks_table', 1),
(8, '2024_01_12_103425_create_kepeks_table', 1),
(9, '2024_01_12_103435_create_galerias_table', 1),
(10, '2024_01_12_103451_create_galeria_keps_table', 1),
(11, '2024_01_12_103505_create_kategorias_table', 1),
(12, '2024_01_12_103522_create_csapats_table', 1),
(13, '2024_01_13_103426_create_alkotos_table', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nyelvs`
--

CREATE TABLE `nyelvs` (
  `nyelv_id` bigint(20) UNSIGNED NOT NULL,
  `magyar` varchar(255) NOT NULL,
  `angol` varchar(255) NOT NULL,
  `hol` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `nyelvs`
--

INSERT INTO `nyelvs` (`nyelv_id`, `magyar`, `angol`, `hol`, `created_at`, `updated_at`) VALUES
(1, 'A jövő visszhangjai', 'Echoes of the future', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(2, 'Az ismeretlen ösvényei', 'Paths of the unknown', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(3, 'Nomád örökség', 'Nomad legacy', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(4, 'Városi krónikák', 'Urban chronicles', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(5, 'Poszt-apokaliptikus futurizmus', 'Post-apocalyptic futurism', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(6, 'Városi túlélés', 'Urban survival', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(7, 'Adaptív divat', 'Adaptive fashion', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(8, 'Újjászületés és megújulás', 'Rebirth and renewal', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(9, 'Túlélés az egységen keresztül', 'Survival through unity', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(10, 'Minimalizmus és alkalmazkodás', 'Minimalism and adaptation', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(11, 'Harcos szellem', 'Warrior spirit', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(12, 'A sokféleségben rejlő erő ünneplése', 'Celebrating the strength in diversity', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(13, 'Kibernetikus túlélés', 'Cyber survival', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(14, 'Nomád alkímia', 'Nomad alchemy', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(15, 'Feltérképezetlen terep', 'Uncharted terrain', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(16, 'Az ismeretlen megformálása', 'Crafting the unknown', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(17, 'Túlélési stratégiák dekódolva/megfejtve', 'Survival strategies decoded', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(18, 'A holnapon túl', 'Beyond tomorrow', 'Kategória elnevezés', '2024-05-03 14:04:03', '2024-05-03 14:04:03'),
(19, 'Navigálás az ismeretlen felé', 'Navigating to the unknow', 'Kategória elnevezés', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(20, 'Menekülés a disztópiából', 'Escape from dystopia', 'Kategória elnevezés', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(21, 'Túlélési stratégiák: a mimikri művészete', 'Survival strategies: the art of mimicry', 'Kategória elnevezés', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(22, 'Designer', 'Designer', 'Szak elnevezés', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(23, 'Divattervő', 'Fashion designer', 'Szak elnevezés', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(24, 'Kovács Adrián', 'Adrian Kovacs', 'Alkotó név', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(25, 'Hobrics Maja', 'Maja Hubrics', 'Alkotó név', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(26, 'Vona Kata', 'Kata Vona', 'Alkotó név', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(27, 'Horváth Zoltán', 'Zoltan Horvath', 'Alkotó név', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(28, 'maaagyaaaaaaaaaaaaar', 'aaaaaaaaaangooooooooooooool', 'Alkotó bemutat', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(29, 'maaagyaaaaaaaaaaaaar 222222222', 'aaaaaaaaaangooooooooooooool 222222222', 'Alkotó bemutat', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(30, 'Rossz jövő', 'Bad Future', 'Kép leírás', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(31, 'Eső', 'Rain', 'Kép leírás', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(32, 'elso galeria', 'elso galeria', 'Galeria', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(33, 'masodik g.', 'masodik g.', 'gALERIA   ', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(34, 'Éjszaka Udvara', 'Court of Night', 'csapat nev', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(35, 'Tavasz udvara', 'Court of Spring', 'csapat nev', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(36, 'Éjszaka Udvara a legjobb hely ahova valaha akartam menni', 'Court of Night is the best place, where i ever want to go', 'csapat leiras', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(37, 'Tavasz udvara egy rossz hely', 'Court of Spring is a wrong place', 'csapat leiras', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(38, 'alma', 'apple', 'csapat nev', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(39, 'egymegy', 'gogogogog', 'csapat leiras', '2024-05-03 14:04:04', '2024-05-03 14:04:04'),
(40, 'magyar ', 'angol ', 'Alkotó bemutat', '2024-05-03 14:04:04', '2024-05-03 14:04:04');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szaks`
--

CREATE TABLE `szaks` (
  `szak_id` bigint(20) UNSIGNED NOT NULL,
  `nyelv_id_elnevezes` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `szaks`
--

INSERT INTO `szaks` (`szak_id`, `nyelv_id_elnevezes`, `created_at`, `updated_at`) VALUES
(1, 22, '2024-05-03 14:04:06', '2024-05-03 14:04:06'),
(2, 23, '2024-05-03 14:04:06', '2024-05-03 14:04:06');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `jog` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `jog`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Cséfalvay Katalain', 2, 'csefi@gmail.com', NULL, '$2y$12$lZqLkzSp60.NlByXlRHhgOK6rk3OdjbBiQNTlwGct3Q/Y9tK8IQfa', NULL, '2024-05-03 14:04:00', '2024-05-03 14:04:00'),
(2, 'admin', 1, 'admin@admin.com', NULL, '$2y$12$nH2wwM.9u6zmqsQT8Pi6POTbELbHEaKBDHr53fP0ITRJ0LRM47Eba', NULL, '2024-05-03 14:04:01', '2024-05-03 14:04:01');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alkotos`
--
ALTER TABLE `alkotos`
  ADD PRIMARY KEY (`a_azon`),
  ADD KEY `alkotos_szak_id_foreign` (`szak_id`),
  ADD KEY `alkotos_nyelv_id_nev_foreign` (`nyelv_id_nev`),
  ADD KEY `alkotos_kep_azon_foreign` (`kep_azon`),
  ADD KEY `alkotos_nyelv_id_bemutat_foreign` (`nyelv_id_bemutat`),
  ADD KEY `alkotos_cs_azon_foreign` (`cs_azon`);

--
-- A tábla indexei `csapats`
--
ALTER TABLE `csapats`
  ADD PRIMARY KEY (`cs_azon`),
  ADD KEY `csapats_galeria_id_foreign` (`galeria_id`),
  ADD KEY `csapats_k_id_foreign` (`k_id`),
  ADD KEY `csapats_nyelv_id_csapat_nev_foreign` (`nyelv_id_csapat_nev`),
  ADD KEY `csapats_nyelv_id_leiras_foreign` (`nyelv_id_leiras`);

--
-- A tábla indexei `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- A tábla indexei `galerias`
--
ALTER TABLE `galerias`
  ADD PRIMARY KEY (`galeria_id`),
  ADD KEY `galerias_fogaleria_foreign` (`fogaleria`),
  ADD KEY `galerias_nyelv_id_leiras_foreign` (`nyelv_id_leiras`);

--
-- A tábla indexei `galeria_keps`
--
ALTER TABLE `galeria_keps`
  ADD PRIMARY KEY (`galeria_id`,`kep_azon`),
  ADD KEY `galeria_keps_kep_azon_foreign` (`kep_azon`);

--
-- A tábla indexei `jogosultsags`
--
ALTER TABLE `jogosultsags`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kategorias`
--
ALTER TABLE `kategorias`
  ADD PRIMARY KEY (`k_id`),
  ADD KEY `kategorias_nyelv_id_elnevezes_foreign` (`nyelv_id_elnevezes`);

--
-- A tábla indexei `kepeks`
--
ALTER TABLE `kepeks`
  ADD PRIMARY KEY (`kep_azon`),
  ADD KEY `kepeks_nyelv_id_leiras_foreign` (`nyelv_id_leiras`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `nyelvs`
--
ALTER TABLE `nyelvs`
  ADD PRIMARY KEY (`nyelv_id`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- A tábla indexei `szaks`
--
ALTER TABLE `szaks`
  ADD PRIMARY KEY (`szak_id`),
  ADD KEY `szaks_nyelv_id_elnevezes_foreign` (`nyelv_id_elnevezes`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_jog_foreign` (`jog`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alkotos`
--
ALTER TABLE `alkotos`
  MODIFY `a_azon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `csapats`
--
ALTER TABLE `csapats`
  MODIFY `cs_azon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `galerias`
--
ALTER TABLE `galerias`
  MODIFY `galeria_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `jogosultsags`
--
ALTER TABLE `jogosultsags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `kategorias`
--
ALTER TABLE `kategorias`
  MODIFY `k_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `kepeks`
--
ALTER TABLE `kepeks`
  MODIFY `kep_azon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `nyelvs`
--
ALTER TABLE `nyelvs`
  MODIFY `nyelv_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `szaks`
--
ALTER TABLE `szaks`
  MODIFY `szak_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `alkotos`
--
ALTER TABLE `alkotos`
  ADD CONSTRAINT `alkotos_cs_azon_foreign` FOREIGN KEY (`cs_azon`) REFERENCES `csapats` (`cs_azon`),
  ADD CONSTRAINT `alkotos_kep_azon_foreign` FOREIGN KEY (`kep_azon`) REFERENCES `kepeks` (`kep_azon`),
  ADD CONSTRAINT `alkotos_nyelv_id_bemutat_foreign` FOREIGN KEY (`nyelv_id_bemutat`) REFERENCES `nyelvs` (`nyelv_id`),
  ADD CONSTRAINT `alkotos_nyelv_id_nev_foreign` FOREIGN KEY (`nyelv_id_nev`) REFERENCES `nyelvs` (`nyelv_id`),
  ADD CONSTRAINT `alkotos_szak_id_foreign` FOREIGN KEY (`szak_id`) REFERENCES `szaks` (`szak_id`);

--
-- Megkötések a táblához `csapats`
--
ALTER TABLE `csapats`
  ADD CONSTRAINT `csapats_galeria_id_foreign` FOREIGN KEY (`galeria_id`) REFERENCES `galerias` (`galeria_id`),
  ADD CONSTRAINT `csapats_k_id_foreign` FOREIGN KEY (`k_id`) REFERENCES `kategorias` (`k_id`),
  ADD CONSTRAINT `csapats_nyelv_id_csapat_nev_foreign` FOREIGN KEY (`nyelv_id_csapat_nev`) REFERENCES `nyelvs` (`nyelv_id`),
  ADD CONSTRAINT `csapats_nyelv_id_leiras_foreign` FOREIGN KEY (`nyelv_id_leiras`) REFERENCES `nyelvs` (`nyelv_id`);

--
-- Megkötések a táblához `galerias`
--
ALTER TABLE `galerias`
  ADD CONSTRAINT `galerias_fogaleria_foreign` FOREIGN KEY (`fogaleria`) REFERENCES `galerias` (`galeria_id`),
  ADD CONSTRAINT `galerias_nyelv_id_leiras_foreign` FOREIGN KEY (`nyelv_id_leiras`) REFERENCES `nyelvs` (`nyelv_id`);

--
-- Megkötések a táblához `galeria_keps`
--
ALTER TABLE `galeria_keps`
  ADD CONSTRAINT `galeria_keps_galeria_id_foreign` FOREIGN KEY (`galeria_id`) REFERENCES `galerias` (`galeria_id`),
  ADD CONSTRAINT `galeria_keps_kep_azon_foreign` FOREIGN KEY (`kep_azon`) REFERENCES `kepeks` (`kep_azon`);

--
-- Megkötések a táblához `kategorias`
--
ALTER TABLE `kategorias`
  ADD CONSTRAINT `kategorias_nyelv_id_elnevezes_foreign` FOREIGN KEY (`nyelv_id_elnevezes`) REFERENCES `nyelvs` (`nyelv_id`);

--
-- Megkötések a táblához `kepeks`
--
ALTER TABLE `kepeks`
  ADD CONSTRAINT `kepeks_nyelv_id_leiras_foreign` FOREIGN KEY (`nyelv_id_leiras`) REFERENCES `nyelvs` (`nyelv_id`);

--
-- Megkötések a táblához `szaks`
--
ALTER TABLE `szaks`
  ADD CONSTRAINT `szaks_nyelv_id_elnevezes_foreign` FOREIGN KEY (`nyelv_id_elnevezes`) REFERENCES `nyelvs` (`nyelv_id`);

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_jog_foreign` FOREIGN KEY (`jog`) REFERENCES `jogosultsags` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
