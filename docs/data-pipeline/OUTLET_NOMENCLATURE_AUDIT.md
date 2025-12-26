# Outlet Nomenclature Audit

**Generated**: December 2025
**Source**: BigQuery `all_channels_data` table
**Total Unique Outlet Values**: 487
**Total Articles**: ~500,000+

This audit identifies duplicate outlet names, variations, and recommended canonical names for standardization.

---

## Summary of Issues

| Issue Type | Count |
|------------|-------|
| Duplicate/variant outlet names | 110+ groups |
| URL-based names (should be outlet names) | 150+ |
| GitHub repos (should be separate category) | 8 |
| Encoding issues (Página vs Pgina) | 5 |

---

## Recommended Merges

### Priority 1: High-Volume Duplicates (>1000 articles affected)

| Canonical Name | Variants to Merge | Total Articles |
|----------------|-------------------|----------------|
| **X** | `X`, `twitter.com`, `nitter.privacydev.net` | 346,783 |
| **Reddit** | `Reddit`, `reddit.com` | 46,943 |
| **Stacker News** | `Stacker News`, `stacker.news` | 17,058 |
| **Cointelegraph** | `Cointelegraph` | 16,467 |
| **CoinDesk** | `CoinDesk` | 12,805 |
| **CryptoNews** | `Crypto News`, `CryptoNews` | 10,647 |
| **CNBC** | `CNBC`, `CNBC Television`, `cnbc.com` | 8,477 |
| **Decrypt** | `Decrypt` | 8,031 |
| **BeInCrypto** | `BeInCrypto` | 8,311 |
| **Forbes** | `Forbes`, `forbes.com` | 8,327 |
| **Bloomberg** | `Bloomberg`, `Bloomberg News`, `Bloomberg Television`, `bloomberg.com` | 8,166 |
| **Bitcoin Magazine** | `Bitcoin Magazine` | 6,736 |
| **CryptoSlate** | `CryptoSlate` | 6,358 |
| **The Block** | `The Block` | 4,184 |
| **Reuters** | `Reuters`, `reuters.com` | 3,577 |
| **Daily Mail** | `Daily Mail`, `dailymail.co.uk` | 2,265 |
| **The Defiant** | `The Defiant` | 2,299 |
| **Blockworks** | `Blockworks` | 2,153 |
| **The Globe and Mail** | `The Globe And Mail`, `theglobeandmail.com` | 1,758 |
| **Barron's** | `Barron's`, `barrons.com` | 1,963 |
| **Fox News** | `Fox News` | 1,872 |
| **The Independent** | `The Independent`, `independent.co.uk` | 1,527 |
| **Fortune** | `Fortune`, `Fortune Magazine`, `fortune.com` | 1,278 |
| **Wall Street Journal** | `Wall Street Journal`, `WSJ` | 1,147 |
| **Yahoo Finance** | `Yahoo Finance` | 1,213 |
| **The Guardian** | `The Guardian`, `theguardian.com` | 679 |

### Priority 2: Medium-Volume Duplicates (100-1000 articles)

| Canonical Name | Variants to Merge | Total Articles |
|----------------|-------------------|----------------|
| **New York Times** | `New York Times`, `The New York Times` | 603 |
| **ABC News** | `ABC`, `ABC News`, `ABC Australia`, `abc.net.au`, `abcnews.go.com`, `about.abc.net.au`, `iview.abc.net.au` | 1,276 |
| **Frankfurter Allgemeine Zeitung** | `Frankfurter Allgemeine Zeitung`, `faz.net` | 741 |
| **La Repubblica** | `La Repubblica`, `repubblica.it`, `finanza.repubblica.it`, `firenze.repubblica.it`, `milano.repubblica.it`, `palermo.repubblica.it`, `roma.repubblica.it`, `torino.repubblica.it`, `invececoncita.blogautore.repubblica.it`, `bari.repubblica.it` | 700+ |
| **Finansavisen** | `Finansavisen`, `finansavisen.no` | 662 |
| **Le Figaro** | `Le Figaro`, `lefigaro.fr`, `bourse.lefigaro.fr`, `leparticulier.lefigaro.fr`, `sport24.lefigaro.fr`, `tvmag.lefigaro.fr`, `video.lefigaro.fr` | 658 |
| **El Comercio** | `El Comercio`, `elcomercio.pe` | 560 |
| **El Financiero** | `El Financiero`, `elfinanciero.com.mx` | 547 |
| **Le Monde** | `Le Monde`, `lemonde.fr`, `podcasts.lemonde.fr` | 214 |
| **Financial Times** | `Financial Times`, `ft.com` | 506 |
| **TV Azteca** | `TV Azteca`, `tvazteca.com` | 677 |
| **La Nación** | `La Nación`, `lanacion.com.ar` | 594 |
| **Milenio** | `Milenio` | 531 |
| **Vice** | `Vice` | 522 |
| **SMH** | `Sydney Morning Herald`, `smh.com.au` | 466 |
| **The Age** | `theage.com.au`, `tvguide.theage.com.au` | 464 |
| **The Australian** | `theaustralian.com.au` | 470 |
| **Washington Post** | `Washington Post` | 458 |
| **Clarín** | `Clarín`, `clarin.com` | 425 |
| **CNN** | `CNN` | 438 |
| **TechCrunch** | `TechCrunch` | 413 |
| **Global News** | `Global News`, `globalnews.ca` | 404 |
| **Corriere della Sera** | `Corriere Della Sera`, `corriere.it`, regional variants | 500+ |
| **CTV News** | `CTV News`, `ctvnews.ca`, regional variants | 550+ |
| **Wired** | `Wired` | 352 |
| **E24** | `E24`, `e24` | 346 |
| **El Periódico** | `El Periódico`, `elperiodico.com` | 338 |
| **Süddeutsche Zeitung** | `sueddeutsche.de`, `sz-magazin.sueddeutsche.de` | 378 |
| **La Vanguardia** | `La Vanguardia`, `lavanguardia.com` | 318 |
| **Todo Noticias** | `Todo Noticias`, `tn.com.ar` | 315 |
| **Google News** | `Google News`, `news.google.com` | 317 |
| **Svenska Dagbladet** | `Svenska Dagbladet` | 295 |
| **New York Post** | `New York Post`, `nypost.com` | 282 |
| **El Mundo** | `El Mundo`, `elmundo.es` | 276 |
| **National Post** | `National Post`, `nationalpost.com` | 262 |
| **AP News** | `AP`, `AP News`, `apnews.com` | 229 |
| **El Tiempo** | `El Tiempo` | 211 |
| **Newsweek** | `Newsweek`, `newsweek.com` | 186 |
| **Página 12** | `Pgina 12`, `Pgina12`, `Página 12`, `Página12`, `pagina12.com.ar` | 183 |
| **NBC News** | `NBC`, `NBC News`, `nbcnews.com`, `nbcmiami.com` | 186 |
| **Aftonbladet** | `Aftonbladet`, `aftonbladet.se`, `tv.aftonbladet.se` | 168 |
| **Dagens Næringsliv** | `Dagens Næringsliv`, `dn.no` | 171 |
| **El Nacional** | `El Nacional`, `elnacional.com` | 150 |
| **LA Times** | `LA Times`, `Los Angeles Times`, `latimes.com`, `highschool.latimes.com` | 199 |
| **Chicago Tribune** | `Chicago Tribune`, `chicagotribune.com` | 144 |
| **Excélsior** | `Excelsior`, `Excélsior` | 133 |
| **Galaxy Research** | `Galaxy Insights`, `Galaxy Research`, `galaxy.com` | 138 |
| **Seeking Alpha** | `Seeking Alpha` | 131 |
| **CBS News** | `CBS News`, `CBS Mornings` | 129 |
| **YouTube** | `YouTube`, `youtube.com`, `youtu.be` | 125 |
| **NPR** | `NPR`, `npr.org` | 119 |
| **Ars Technica** | `Ars Technica` | 115 |
| **Sky News** | `Sky News`, `news.sky.com`, `skynews.com.au` | 215 |

### Priority 3: Low-Volume Duplicates (<100 articles)

| Canonical Name | Variants to Merge | Total Articles |
|----------------|-------------------|----------------|
| **Aftenposten** | `Aftenposten`, `aftenposten.no` | 25 |
| **Antena 3** | `Antena 3`, `antena3.com` | 43 |
| **a16z Crypto** | `a16z Crypto`, `a16z crypto` | 2 |
| **ARCA** | `ARCA`, `Arca` | 12 |
| **BBC** | `BBC`, `bbc.com` | 370 |
| **Bitcoin Optech** | `Bitcoin Ops`, `Bitcoin Optech`, `bitcoinops.org` | 58 |
| **Bitcoin Magazine Pro** | `Bitcoin Magazine Pro`, `bitcoinmagazinepro.com` | 50 |
| **BIS** | `BIS`, `bis.org` | 21 |
| **Castle Island Ventures** | `Castle Island`, `Castle Island Ventures` | 27 |
| **Channel 4** | `Channel 4`, `channel4.com` | 7 |
| **Coin Metrics** | `Coin Metrics`, `CoinMetrics`, `Coinmetrics (Substack)`, `coinmetrics.substack.com` | 34 |
| **Crónica** | `Crónica`, `cronica.com.ar` | 68 |
| **DR** | `DR` | 85 |
| **Engadget** | `Engadget` | 151 |
| **Fast Company** | `Fast Company` | 16 |
| **Fox Business** | `Fox Business`, `foxbusiness.com` | 39 |
| **France Info** | `France Info`, `Franceinfo`, `franceinfo`, `francetvinfo.fr`, `france3-regions.francetvinfo.fr`, `geopolis.francetvinfo.fr`, `la1ere.francetvinfo.fr` | 165 |
| **Gizmodo** | `Gizmodo`, `gizmodo.com` | 962 |
| **Glassnode** | `Glassnode`, `insights.glassnode.com` | 25 |
| **GlobeNewswire** | `Globe News Wire`, `GlobeNewswire` | 79 |
| **ITV** | `itv.com` | 39 |
| **Kiplinger** | `Kiplinger` | 6 |
| **La Sexta** | `La Sexta`, `laSexta` | 67 |
| **Mashable** | `Mashable` | 491 |
| **MarketWatch** | `MarketWatch` | 48 |
| **Messari** | `Messari`, `messari.io` | 58 |
| **Mirror** | `Mirror`, `mirror.co.uk` | 6 |
| **MSNBC** | `MSNBC`, `msnbc.com` | 18 |
| **Nyheter24** | `Nyheter 24`, `Nyheter24`, `nyheter24.se` | 3 |
| **NRK** | `NRK`, `nrk.no` | 46 |
| **NYDIG** | `NYDIG`, `nydig.com` | 26 |
| **Onramp** | `Onramp`, `Onramp Media` | 189 |
| **PBS** | `PBS`, `pbs.org` | 57 |
| **Politico** | `Politico` | 98 |
| **Quartz** | `Quartz` | 4 |
| **Radio-Canada** | `ici.radio-canada.ca`, `communiques.radio-canada.ca`, `radio-canada.ca` | 182 |
| **Rolling Stone** | `Rolling Stone` | 66 |
| **SBS** | `sbs.com.au`, `theworldgame.sbs.com.au` | 57 |
| **SVT** | `SVT`, `SVT Play` | 93 |
| **The Atlantic** | `The Atlantic`, `theatlantic.com` | 61 |
| **The Boston Globe** | `The Boston Globe` | 12 |
| **The Economist** | `The Economist` | 34 |
| **The New Yorker** | `The New Yorker`, `newyorker.com` | 28 |
| **The Sun** | `thesun.co.uk` | 603 |
| **The Telegraph** | `The Telegraph` | 13 |
| **The Times** | `thetimes.co.uk` | 448 |
| **The Verge** | `The Verge`, `theverge.com` | 35 |
| **The Star (Toronto)** | `thestar.com` | 492 |
| **This Is Money** | `This Is Money`, `thisismoney.co.uk` | 20 |
| **Time** | `Time`, `time.com` | 39 |
| **TV 2 (Denmark)** | `TV 2 Nyheder` | 66 |
| **TV 2 (Norway)** | `TV 2 Norge` | 34 |
| **USA Today** | `USA Today`, `usatoday.com`, *wire variants* | 500+ |
| **Vancouver Sun** | `Vancouver Sun`, `vancouversun.com`, `vancouversun.com:443` | 83 |
| **Verdens Gang (VG)** | `VG`, `Verdens Gang`, `vg.no` | 30 |
| **Vox** | `Vox` | 16 |
| **ZDF** | `ZDF`, `zdf.de` | 72 |

---

## Special Categories to Separate

### GitHub Repositories (Should be "GitHub" or separate table)

These are Bitcoin/Lightning development repos being tracked - should be categorized differently:

| Current Name | Articles | Recommended |
|--------------|----------|-------------|
| /bitcoin/bitcoin | 2,048 | GitHub: Bitcoin Core |
| ACINQ/eclair | 215 | GitHub: Eclair |
| ElementsProject/elements | 91 | GitHub: Elements |
| ElementsProject/lightning | 609 | GitHub: c-lightning |
| btcpayserver/btcpayserver | 327 | GitHub: BTCPay Server |
| fedimint/fedimint | 1,422 | GitHub: Fedimint |
| lightningnetwork/lnd | 725 | GitHub: LND |
| rsksmart/rskj | 542 | GitHub: RSK |
| mailing-list.bitcoindevs.xyz | 50 | Bitcoin Dev Mailing List |

**Total GitHub articles**: 6,029

---

## URL-Based Names (Need Outlet Name)

These entries use domain names instead of proper outlet names:

### Australian Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| 9news.com.au | 9News | 6 |
| abc.net.au | ABC Australia | 911 |
| heraldsun.com.au | Herald Sun | 707 |
| news.com.au | News.com.au | 701 |
| sbs.com.au | SBS | 53 |
| skynews.com.au | Sky News Australia | 98 |
| smh.com.au | Sydney Morning Herald | 465 |
| theage.com.au | The Age | 463 |
| theaustralian.com.au | The Australian | 470 |

### Canadian Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| montrealgazette.com | Montreal Gazette | 85 |
| ottawacitizen.com | Ottawa Citizen | 54 |
| theglobeandmail.com | The Globe and Mail | 746 |
| thestar.com | Toronto Star | 492 |
| vancouversun.com | Vancouver Sun | 76 |

### UK Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| dailymail.co.uk | Daily Mail | 6 |
| independent.co.uk | The Independent | 2 |
| mirror.co.uk | Mirror | 1 |
| news.sky.com | Sky News | 115 |
| theguardian.com | The Guardian | 1 |
| thesun.co.uk | The Sun | 603 |
| thetimes.co.uk | The Times | 448 |
| thisismoney.co.uk | This Is Money | 18 |

### German Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| boerse.ard.de | ARD Börse | 224 |
| faz.net | Frankfurter Allgemeine | 92 |
| sueddeutsche.de | Süddeutsche Zeitung | 374 |
| zdf.de | ZDF | 15 |

### Italian Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| corriere.it | Corriere della Sera | 77 |
| repubblica.it | La Repubblica | 64 |
| tg24.sky.it | Sky TG24 | 140 |
| tgcom24.mediaset.it | TGCom24 | 90 |

### French Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| lefigaro.fr | Le Figaro | 80 |
| lemonde.fr | Le Monde | 21 |
| tf1.fr | TF1 | 6 |
| francetvinfo.fr | France Info | 11 |

### Spanish Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| elmundo.es | El Mundo | 8 |
| lavanguardia.com | La Vanguardia | 5 |
| elperiodico.com | El Periódico | 1 |

### Latin American Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| clarin.com | Clarín | 1 |
| cronica.com.ar | Crónica | 2 |
| elcomercio.pe | El Comercio | 2 |
| elfinanciero.com.mx | El Financiero | 11 |
| elnacional.com | El Nacional | 1 |
| lanacion.com.ar | La Nación | 5 |
| pagina12.com.ar | Página 12 | 18 |
| tn.com.ar | Todo Noticias | 3 |
| tvazteca.com | TV Azteca | 8 |

### US Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| chicagotribune.com | Chicago Tribune | 117 |
| cnbc.com | CNBC | 47 |
| forbes.com | Forbes | 37 |
| fortune.com | Fortune | 45 |
| foxbusiness.com | Fox Business | 3 |
| latimes.com | LA Times | 15 |
| nbcnews.com | NBC News | 11 |
| npr.org | NPR | 15 |
| nypost.com | New York Post | 4 |
| pbs.org | PBS | 9 |
| usatoday.com | USA Today | 482 |

### Scandinavian Media
| URL-Based Name | Recommended | Articles |
|----------------|-------------|----------|
| aftenposten.no | Aftenposten | 2 |
| aftonbladet.se | Aftonbladet | 4 |
| dn.no | Dagens Næringsliv | 3 |
| finansavisen.no | Finansavisen | 1 |
| nrk.no | NRK | 2 |
| nyheter24.se | Nyheter24 | 1 |
| vg.no | VG | 1 |

---

## Encoding Issues

| Current (Broken) | Correct | Articles |
|------------------|---------|----------|
| Pgina 12 | Página 12 | 14 |
| Pgina12 | Página 12 | 69 |

---

## USA Today Wire Network

These are all USA Today sports verticals - consider merging to "USA Today":

| Variant | Articles |
|---------|----------|
| broncoswire.usatoday.com | 1 |
| bucswire.usatoday.com | 3 |
| chiefswire.usatoday.com | 3 |
| dolphinswire.usatoday.com | 1 |
| ftw.usatoday.com | 14 |
| giantswire.usatoday.com | 1 |
| golfweek.usatoday.com | 2 |
| lebronwire.usatoday.com | 1 |
| longhornswire.usatoday.com | 1 |
| lsutigerswire.usatoday.com | 1 |
| mmajunkie.usatoday.com | 2 |
| packerswire.usatoday.com | 1 |
| pantherswire.usatoday.com | 1 |
| patriotswire.usatoday.com | 1 |
| rocketswire.usatoday.com | 1 |
| seahawkswire.usatoday.com | 3 |
| steelerswire.usatoday.com | 1 |
| texanswire.usatoday.com | 1 |
| theramswire.usatoday.com | 3 |
| titanswire.usatoday.com | 1 |
| usatoday.com | 482 |
| **Total** | **525** |

---

## Regional Variants (Consider Merging)

### CTV News (Canada)
| Variant | Articles |
|---------|----------|
| CTV News | 478 |
| ctvnews.ca | 32 |
| barrie.ctvnews.ca | 1 |
| bc.ctvnews.ca | 5 |
| calgary.ctvnews.ca | 9 |
| kitchener.ctvnews.ca | 2 |
| london.ctvnews.ca | 1 |
| ottawa.ctvnews.ca | 1 |
| regina.ctvnews.ca | 3 |
| toronto.ctvnews.ca | 2 |
| winnipeg.ctvnews.ca | 1 |
| **Total** | **535** |

### Corriere della Sera (Italy)
| Variant | Articles |
|---------|----------|
| Corriere Della Sera | 340 |
| corriere.it | 77 |
| bergamo.corriere.it | 1 |
| brescia.corriere.it | 5 |
| corrieredeltrentino.corriere.it | 1 |
| corrieredelveneto.corriere.it | 5 |
| corrieredibologna.corriere.it | 2 |
| corrierefiorentino.corriere.it | 1 |
| economiapro.corriere.it | 1 |
| ilquotidianoinclasse.corriere.it | 4 |
| milano.corriere.it | 1 |
| roma.corriere.it | 4 |
| torino.corriere.it | 4 |
| video.corriere.it | 4 |
| **Total** | **450** |

### La Repubblica (Italy)
| Variant | Articles |
|---------|----------|
| La Repubblica | 612 |
| repubblica.it | 64 |
| bari.repubblica.it | 3 |
| finanza.repubblica.it | 48 |
| firenze.repubblica.it | 3 |
| invececoncita.blogautore.repubblica.it | 1 |
| milano.repubblica.it | 3 |
| palermo.repubblica.it | 1 |
| roma.repubblica.it | 6 |
| torino.repubblica.it | 1 |
| **Total** | **742** |

### Mediaset (Italy)
| Variant | Articles |
|---------|----------|
| iene.mediaset.it | 12 |
| mediasetinfinity.mediaset.it | 6 |
| mediasetplay.mediaset.it | 14 |
| sportmediaset.mediaset.it | 5 |
| striscialanotizia.mediaset.it | 11 |
| tgcom24.mediaset.it | 90 |
| video.mediaset.it | 4 |
| **Total** | **142** |

### RAI (Italy)
| Variant | Articles |
|---------|----------|
| raiscuola.rai.it | 4 |
| report.rai.it | 1 |
| televideo.rai.it | 16 |
| **Total** | **21** |

---

## Recommended SQL for Merging

```sql
-- Create a mapping table for outlet normalization
CREATE OR REPLACE TABLE `triple-upgrade-245423.btcp_main_dataset.outlet_mapping` AS
SELECT * FROM UNNEST([
  -- Priority 1: High-volume merges
  STRUCT('twitter.com' AS original, 'X' AS canonical),
  STRUCT('nitter.privacydev.net', 'X'),
  STRUCT('reddit.com', 'Reddit'),
  STRUCT('stacker.news', 'Stacker News'),
  STRUCT('Crypto News', 'CryptoNews'),
  STRUCT('CNBC Television', 'CNBC'),
  STRUCT('cnbc.com', 'CNBC'),
  STRUCT('Bloomberg News', 'Bloomberg'),
  STRUCT('Bloomberg Television', 'Bloomberg'),
  STRUCT('bloomberg.com', 'Bloomberg'),
  STRUCT('forbes.com', 'Forbes'),
  STRUCT('reuters.com', 'Reuters'),
  STRUCT('The New York Times', 'New York Times'),
  STRUCT('New York Times', 'The New York Times'),
  STRUCT('WSJ', 'Wall Street Journal'),
  STRUCT('Fortune Magazine', 'Fortune'),
  STRUCT('fortune.com', 'Fortune'),
  STRUCT('The Globe And Mail', 'The Globe and Mail'),
  STRUCT('theglobeandmail.com', 'The Globe and Mail'),
  STRUCT('barrons.com', 'Barron\'s'),
  STRUCT('dailymail.co.uk', 'Daily Mail'),
  STRUCT('independent.co.uk', 'The Independent'),
  STRUCT('theguardian.com', 'The Guardian'),

  -- Encoding fixes
  STRUCT('Pgina 12', 'Página 12'),
  STRUCT('Pgina12', 'Página 12'),
  STRUCT('Página12', 'Página 12'),

  -- Case/spelling fixes
  STRUCT('Excelsior', 'Excélsior'),
  STRUCT('La Sexta', 'laSexta'),
  STRUCT('laSexta', 'La Sexta'),
  STRUCT('a16z crypto', 'a16z Crypto'),
  STRUCT('ARCA', 'Arca'),
  STRUCT('e24', 'E24'),

  -- More merges...
  STRUCT('ABC', 'ABC News'),
  STRUCT('ABC Australia', 'ABC News'),
  STRUCT('abc.net.au', 'ABC Australia'),
  STRUCT('AP', 'AP News'),
  STRUCT('apnews.com', 'AP News')
  -- Add more as needed
]);

-- Update query (run after creating mapping)
UPDATE `triple-upgrade-245423.btcp_main_dataset.all_channels_data` a
SET Outlet = m.canonical
FROM `triple-upgrade-245423.btcp_main_dataset.outlet_mapping` m
WHERE a.Outlet = m.original;
```

---

## Next Steps

1. **Review this audit** - Confirm merge decisions
2. **Create mapping table** - With all canonical names
3. **Run update query** - Merge duplicates
4. **Update categorization code** - `src/lib/utils/outlet-categorization.ts`
5. **Update SOURCES_DIRECTORY.md** - With canonical names

---

**Generated by**: Claude Code
**Date**: December 2025
