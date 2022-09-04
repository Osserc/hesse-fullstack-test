# Hesse Fullstack test

[English version](#english-version) | [Versione italiana](#versione-italiana)

# English version

## Installation

1. ```git clone https://github.com/Osserc/hesse-fullstack-test.git```
2. ```cd hesse-fullstack-test```
3. ```npm i```
4. ```npm run develop```
5. Open a new terminal in the same directory
6. ```cd react-app```
7. ```npm i```
8. ```npm start```

Note: the .env file and the database are included; they contain no sensitive information no matter what GitHub may complain about.  
I am aware that including .env files is not ideal, but in this case I wanted to spare you the hassle of creating it manually by copying and pasting.  
Rest assured, I will not exempt it from .gitignore in a real production-oriented app. This is purely for the sake of convenience.

## Implementation details

Let's start with the database design. I closely followed your instructions, with the addition of adding media content to every single product.  
The relations between models are as laid out in the instructions. The only difference is that the subscription tier do not have an associated image.  
What they have instead is a field which is the used to identify which symbol matches it.

This decision was taken for two reasons. The first is that since I wanted to take advantage of styled-components, I could not figure out how to implement full SVG functionality to an uploaded image. I could not, for example, achieve the color swapping on button press without having a "real" SVG on my hand.  
The alternative was assigning two different SVGs to the content-entry and dynamically swapping them, but it would have prevented me from changing colors in the future easily.  
What I opted to do instead was storing assets locally and calling it depending on the relevant attribute of the subscription entry, which allowed to easily take advantage of CSS styling and granted greater flexibility.

The next problem to solve was the data fetching from the API, for which I used a custom React Hook.  
The side-effect was that I had to introduce workarounds to prevent the code from failing while React was fetching the data.  
I am not entirely happy with how I handled it (I could not consolidate the 3 checks successfully, unfortunately) but it did the job: right now it simply check for the null status of the three data types queried.

The asynchronous nature of the retrieval made working with the product line a bit harder: my solution had me manipulating the actual object, but this meant that once I filtered the items, I lost them completely.  
I then opted to copy the values in a second state and manipulate that. And since I still had access to the original, I could refresh when removing and changing filters.  
The alternative was, of course, dynamically restricting what objects to show, but I couldn't come up with a stateless logic to handle refreshes.  
Previous attempts in personal projects were not successful, so I went with a tried and true method. A solution would have been elaborating the data fetched from the API and put a "show" field in it, but this would have meant refactor a good portion of the code for a dubious advantage. I would have maybe done it in production, but not for a sample.  
I look forward to seeing how you guys handled it in your app.

Another issue was implementing a universal solution to the button question via styled-components.  
Through careful use of props and conditions, I crafted a button component able to take on different roles without dividing it into multiple components, cutting down on code size. The way I implemented it also allows for further expansion without much hassle.

Next came adding proper logic to the buttons themselves. The way I first wrote it, all the logic was contained in App.js, which tracked the status of the buttons, which itself was generated on the basis of the subscription and product type data retrieved from the API.  
I could have spared myself the trouble by hardcoding the values, but I wanted to "future-proof" it by looking up the data from the Strapi server itself.

The two series of buttons operated on the same logic: when one is activated, all the others are turned off, effective immediately.  
This had the problem of not allowing more than one selection and of rendering the confirm button for the subs irrelevant.  
This was fixed by replicating the logic inside the categories filters component with a little adjustment to allow for multiple selections. While effective, it did not sit well with me.

I therefore decided to refactor the code, conserve only the "final product" of the filters, and confining the actual logic of the buttons in the respective components.  
This had the advantage of achieving a greater separation of concerns, and giving full functionality to the confirm button in the modal.
As an aside, I looked up how you guys implemented the subscription filter functionality and saw that you could select some filters, not apply them, close the modal, re-open it and the app would remember the filters you selected. I am kind of proud of having "unintentionally" achieved the same functionality.  
~~The one difference from your app, however, is that tapping an already selected category filter deselects it instead of doing nothing.~~ I fixed this, it now behaves exactly as your app does.

While we are on the buttons topic, I am irrationally proud of my "all" button implementation. The way the filter works is by generating buttons by mapping the categories on the server, but this left out the "all" category; what I ended up doing was hard-coding a button in front of the collection render and "activating" it when all the other buttons were off. The alternative was adding an "all" category to all products, but I judged it absurd and inelegant.  
Activating the "all" button itself takes advantage of the looping function I wrote: since no button has an id of 0, they will all be turned off, turning then on the "all" button. Silly, I know, but I wanted to include it.

Speaking of the modal, you will notice that it is made as a styled-component; this was't always so.  
Previously it was crafted with pure CSS, but I wanted to play around with some more specific conditions inside styled components.  
It wasn't really worth it, but I appreciated the opportunity to play around with it a bit and familiarize myself with it better.

As for the layout itself, I replicated it almost completely. You will have noticed that the screen is half of the available screen size;  
this is to showcase the scrolling on the categories, and to avoid having a comically large view. I also added a media query to avoid compressing it when going under 800px.

There is only one aspect I could not copy: the top line on each row. I opted for a grid layout, but I could not figure out how to show those borders without a wrapper element, whose implementation itself was more trouble than it was worth.  
I could not figure out an elegant way to do that, so I simply ignored it. Much like product handling, I look forward to seeing how you guys achieved it (maybe it's not even employing grid and I was looking in the wrong place!)

All in all, I had a great time working on this assignment, and I can't wait to have you guys tear it apart piece by piece. Have fun!

# Versione italiana

## Installazione

1. ```git clone https://github.com/Osserc/hesse-fullstack-test.git```
2. ```cd hesse-fullstack-test```
3. ```npm i```
4. ```npm run develop```
5. Aprire un nuovo terminale nella stessa directory
6. ```cd react-app```
7. ```npm i```
8. ```npm start```

Nota: il file .env e il database sono inclusi; non contengono infomazioni sensibili a prescindere dalle lamentele di GitHub.
Sono cosciente del fatto che includere file .env non è ideale, ma in questo caso volevo risparmiarvi il fastidio di crearlo manualmente copiando e incollando.
Vi assicuro che non lo esenterei da .gitignore in un'app da mandare in produzione. L'ho fatto puramente per convenienza.

## Dettagli di implementazione

Iniziamo con il design del database. Ho seguito attentamente le vostre indicazione, con l'aggiunto di aver aggiunto dei media a ogni singolo prodotto.  
Le relazioni tra i database sono quelle specificate nelle istruzioni. L'unica differenza è che i tier degli abbonamenti non hanno un'immagine associata.  
Quello che hanno è un campo che è usato per identificare quale simbolo vi corrisponde.

Questa decisione è stata presa per due ragioni. La prima è che volendo sfruttare gli styled-components, non sono riuscito a capire come implementare piena funzionalità SVG con un immagine caricata. Non ho potuto, per esempio, ottenere l'inversione dei colori premendo i bottoni senza avere una "vera" SVG in mano.  
L'alternativa era assegnare due SVGs diverse alla content-entry e scambiarle dinamicamente, ma mi avrebbe impedito di cambiare facilmente i colori in futuro.  
Ho pertanto scelto di salvare gli assets localmente e chiamarli a seconda degli attributi rilevanti dell'array di iscrizione, che mi ha permesso di sfruttare agevolmente lo styling con CSS e mi ha garantito maggiore flessiblità.

Il prossimo problema è stato risolvere il fetching dei dati dall'API, per il quale ho usato un custom React Hook.  
L'effetto collaterale è stato dover introdurre degli workaround per impedire al codice di fallire mentre React stava ottenendo i dati.  
Non sono del tutto soddisfatti di come l'ho gestito (non sono stato in grado di consolidare i 3 check, purtroppo) ma ha fatto il suo dovere: ora controlla solamente lo status di null dei tre tipi di dati richiesti.

La natura asincrona dell'operazione ha reso lavorare con l'elenco prodotti un po' più difficile: la mia soluzione consiste nel manipolare l'oggetto stesso, ma questo significa che una volta filtrati gli oggetti, li perda completamente.  
Ho pertanto scelto di copiare i valori in un secondo stato e manipolare quello. E siccome ho ancora accesso agli originali, posso refreshare quando rimuovo o cambio i filtri.  
L'alternativa, ovviamente, era restringere dinamicamente quali oggetti mostrare, ma non mi è venuto in mente una logica stateless per gestire i refresh della pagina.  
Alcuni tentativi simili in progetti personali non ebbero successo, per cui ho scelto un metodo collaudato. Una soluzione sarebbe stata elaborare i dati ricevuti dall'API e inserirci un campo come "visible", ma avrebbe significato rivoluzionare buona parte del codice per un vantaggio piuttosto dubbio. L'avrei forse fatto in produzione, ma non per un sample.  
Non vedo l'ora di vedere come avete affrontato la situazione nella vostra app.

Un altro problema è stato implementare una soluzione universale alla questione bottoni tramite styled-components.  
Attraverso un attento uso di props e condizioni, ho costruito un component bottone in grado di prendere diversi ruoli senza dividerlo in diversi componenti, riducendo le dimensioni del codice. Il modo in cui l'ho implementato permette altre espanzioni senza troppi grattacapi.  

Poi c'è stato da aggiugnere la logica dei bottoni stessi. Nel primo modo in cui l'ho scritto, tutta la logica era contenuta in App.js, che tracciava lo stato dei bottoni, essis tessi generati sulla base dei dati su abbonamenti e tipi di prodotti ottenuti dall'API.  
Avrei potuto evitarmi il disturbo hardcode-ando i valori, ma ho voluto "future-proof-arlo" andando a guardare i dati del server Strapi.

Le due serie di bottoni operavano con la stessa logica: quando uno è attivato, gli altri vengono spenti, immediatamente.  
Questo ha creato il problema di non permettere più di una selezione e di rendere il bottone di conferma per gli abbonamenti irrilevante.  
Ciò è sato ovviato replicando la logica all'interno del component dei filtri di categoria, con un piccoloa ggiustamento per permettere selezioni multiple. Sebbene sia stato efficace, non mi è piaciuto.

Ho pertanto deciso di fare refactoring, conservare solamente il "prodotto finale" dei filtri, e confinare la logica vera e propria dei bottoni nei rispettivi componenti.  
Questo ha avuto il vantaggio di ottenere una maggiore separation of concerns, e di dare piena funzionalità al bottone conferma del modale.  
Tra l'altro, ho dato un'occhiata a come avete implementato la funzionalità del filtro deglia bbonammenti e ho visto che si può selezionare alcuni filtri, non applicarli, chiudere il modale, riaprirlo e la app si ricorda quali filtri erano stati spuntati. Sono un po' ogoglioso di aver replicato "per sbaglio" la stessa funzionalità.  
~~L'unica differenza con la vostra applicazione, tuttavia, è che cliccando un filtro di categoria attivato lo disattiva invece di fare nulla.~~ L'ho aggiustato, ora si comporta esattamente come fa la vostra app.

Mentre siamo nell'argomento bottoni, sono irrazionalmente orgoglioso della mia implementazione del bottone "all". Il modo in cui i filtri funzionano è attraverso la generazione di bottoni mappando le categorie sul server, ma ciò lasciava fuori la categoria "tutti"; ciò che ho finito per fare è stato hardcode-are un bottone di fronte al render della collezione e "attivarlo" quando tutti gli altri bottoni erano spenti. L'alternativa era aggiugnere una categoria "all" a tutti i prodotti, ma l'ho ritenuta assurda e poco elegante.  
Attivare il bottone "all" stesso sfrutta il looping della funzione che ho scritto: dato che nessun bottone ha un id di 0, verranno tutti spenti, accendendo dunque il bottone "all". Sciocco, lo so, ma ho voluto includerlo.

Parlando del modale, noterete che è stato fatto con uno styled-component; non era così prima.
Precedentemente era realizzato con puro CSS, ma volevo sperimentare un po' con alcune condizioni specifiche all'interno di styled-components.
Non ne è valsa veramente la pena, ma ho apprezzato l'opportunità di giocarci un po' e familiarizzarmi meglio con esso.

In quanto al layout in sè, l'ho replicato quasi completamente. Avrete notato che la schermata è solamente metà dello schermo disponibile;  
questo è per mostrare lo scrolling nelle categorie, ed evitare di avere una view comicamente larga. Ho anche aggiunto una media query per evitare di comprimerla quando si va sotto gli 800px.

C'è solo un aspetto che non sono riuscito a copiare: la linea in cima a ogni riga. Ho optato per un layout fatto con grid, ma non sono riuscito a inventarmi un metodo per mostrare quei bordi senza un elemento wrapper, la cui implementazione sarebbe stata troppo problematica per essere giustificata.  
Non sono stato in grado di individuare un modo elegante per farlo, dunque l'ho semplicemente ignorato. Come per la gestione dei prodotti, non vedo l'ora di vedere come voi avete ottenuto un simile effetto (magari non usa nemmeno grid e stavo guardando nel posto sbagliato!)

Tutto sommato, mi è piaciuto lavorare su questo test, e non vedo l'ora che lo critichiate. Divertitetvi!