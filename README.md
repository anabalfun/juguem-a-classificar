# Juguem a classificar!

Un joc web tranquil en català per a infants de 4 a 6 anys. Cada ronda presenta un repte aleatori amb dos grups d'exemple i sis dibuixos per ordenar. Es pot tocar un grup o arrossegar-hi el dibuix. Un error deixa el dibuix a la safata perquè l'infant ho torni a provar, sense donar-li la resposta.

## Reptes

Hi ha 17 maneres de classificar:

1. Animals de granja o del bosc.
2. Objectes de l'escola o de la cuina.
3. Coses amb rodes o sense rodes.
4. Vehicles de dues rodes o de quatre.
5. Animals que poden volar o que no poden volar.
6. Animals que viuen a l'aigua o a terra.
7. Animals amb plomes o amb pèl.
8. Fruita o verdura.
9. Menjar que se sol prendre calent o fred.
10. Roba per als dies de sol o de pluja.
11. Coses rodones o allargades.
12. Coses vermelles o blaves.
13. Coses grogues o blaves.
14. Coses taronges o negres.
15. Coses de fusta o de metall.
16. Transports que van per terra o per l'aire.
17. Animals més actius de dia o de nit.

El joc barreja els reptes i no en repeteix cap fins que tots han sortit una vegada. L'ordre de les sis imatges també canvia a cada ronda. En acabar una ronda, es pot continuar amb un altre repte aleatori o parar.

Les estrelles mesuren els encerts a la primera: 5 per sis encerts, 4 per cinc, 3 per tres o quatre, i com a mínim 2 per completar la ronda.

## Executar

Com que el joc fa servir mòduls JavaScript, obre'l des d'un servidor local:

```sh
python3 -m http.server 4173
```

Després visita `http://localhost:4173`.

## Proves

Les proves de regles fan servir el runner integrat de Node.js:

```sh
npm test
```

Les proves de navegador amb Playwright cobreixen una ronda completa, la rotació del repte i la possibilitat de tornar-ho a provar. Executa-les quan calgui:

```sh
npm install
npx playwright install chromium
npm run test:e2e
```

També es poden iniciar amb el comentari `/run-e2e` en una PR. Les proves de regles s'executen a cada push i pull request.

## Estructura i decisions

- `src/challenges.js` conté els 17 reptes, els grups i les imatges d'exemple.
- `src/challenge-cycle.js` barreja la cua de reptes sense repeticions abans de completar un cicle, i barreja les imatges de cada ronda.
- `src/rules.js` conté les funcions pures per validar una resposta i calcular les estrelles.
- `src/main.js` connecta les dades i les regles amb la interfície del navegador.

El codi fa servir separació per responsabilitats i un cicle aleatori explícit, sense afegir un framework ni patrons que no calen.
