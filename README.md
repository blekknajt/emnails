# EMnails – Salon Stylizacji Paznokci Lubsko (Hugo)

Statyczna strona internetowa dla salonu **EMnails** (ul. Warszawska 12, 68-300 Lubsko) zbudowana w **Hugo** w oparciu o ten sam, lekki model co projekt `rehabilitacja` (dane w YAML, automatyczna konwersja zdjęć do AVIF/WebP, lokalne kroje pisma bez trackerów RODO).

## Podgląd lokalny i budowanie

```bash
# Uruchomienie lokalnego serwera z automatycznym odświeżaniem:
hugo server

# Zbudowanie gotowej wersji produkcyjnej do katalogu public/:
hugo --minify --gc --cleanDestinationDir
```

## Jak łatwo zaktualizować dane na stronie

Wszystkie dane biznesowe trzymane są w plikach YAML w katalogu `data/`:

- **`data/salon.yaml`** – numer telefonu, adres, link do Facebooka, opcjonalny e-mail, Instagram, Booksy, godziny otwarcia oraz pasek aktualności (np. informacja o urlopie lub zapisach).
- **`data/uslugi.yaml`** – lista usług, opisy i przypisane zdjęcia.
- **`data/cennik.yaml`** – gotowy szablon cennika. Gdy właścicielka uzupełni ceny, wystarczy zmienić w `config.toml`:
  ```toml
  [params]
  pokazCennik = true
  ```
- **`data/galeria.yaml`** – zdjęcia prac (`assets/img/`), opisy i kategorie filtrowania (`french`, `efekty`, `zdobienia`, `sezonowe`). Pole `wyroznione: true` decyduje o pokazaniu zdjęcia również na stronie głównej.
- **`data/opinie.yaml`** – publiczne opinie klientek z Facebooka.

## Wdrożenie na serwer

Po uzupełnieniu docelowego adresu hostingu w `config.toml` (`baseURL`) oraz komendy `rsync` w `wyslij.sh`, wystarczy uruchomić `./wyslij.sh` lub wgrać zawartość katalogu `public/` na dowolny hosting statyczny (Hostido, Cloudflare Pages, Netlify, GitHub Pages).
