# Hesse Fullstack test

[English version] (#english-version) | [Versione italiana] (#versione-italiana)

# English version

## Installation

1. git clone https://github.com/Osserc/hesse-fullstack-test.git
2. cd hesse-fullstack-test
3. npm i
4. npm run develop
5. Open a new terminal in the same directory
6. cd react-app
7. npm i
8. npm start

Note: the .env file and the database are included; they contain no sensitive information no matter what GitHub may complain about.  
I am aware that including .env files is not ideal, but in this case I wanted to spare you the hassle of creating it manually by copying and pasting.  
Rest assured, I will not exempt it from .gitignore in a real production-oriented app. This is purely for the sake of convenience.

## Implementation details

Let's start with the database design. I closely followed your instructions, with the addition of adding media content to every single project.  
The relations between models are as laid out in the instructions. The only difference is that the subscription tier do not have an associated image.  
What they have instead is a field which is the used to identify which symbol matches it.

This decision was taken for two reasons. The first is that since I wanted to take advantage of styled-components, I could not figure out how to implement full SVG functionality to an uploaded image. I could not, for example, achieve the color swapping on button press without having a "real" SVG on my hand.  
The alternative was assigning two different SVGs to the content-entry and dynamically swapping them, but it would prevent me from changing colors in the future easily.

What I opted to do instead was storing assets locally and calling it depending on the relevant attribute of the subscription entry, which allowed to easily take advantage of CSS styling and granted greater flexibility.

The next problem to solve was the data fetching from the API, for which I used a custom React Hook.  
The side-effect was that I had to introduce workarounds to prevent the code from failing while React was fetching the data.  
I am not entirely happy with how I handled it (I could not consolidate the 3 checks successfully, unfortunately) but it did the job: right now it simply check for the null status of the three data types queried.

The asynchronous nature of the retrieval made working with the product line a bit harder: my solution had me manipulating the actual object, but this meant that once I filtered the items, I lost them completely.  
I then opted to copy the values in a second state and manipulate that. And since I still had access to the original, I could refresh when removing and changing filters.  
The alternative was, of course, dynamically restricting what objects to show, but I couldn't come up with a stateless logic to handle refreshes.  
Previous attempts in personal projects were not successful, so I went with a tried and true method.  
I look forward to seeing how you guys handled it in your app.

Another issue was implementing a universal solution to the button question via styled-components.  
Through careful use of props and conditions, I crafted a button component able to take on different roles without dividing it into multiple components, cutting down on code size. The way I implemented it also allows for further expansion without much hassle.

Next came adding proper logic to the buttons themselves. The way I first wrote it, all the logic was contained in App.js, which tracked the status of the buttons, which itself was generated on the basis of the subscription and product type data retrieved from the API.  
I could have spared myself the trouble by hardcoding the values, but I wanted to "future-proof" it by looking up the data from the Strapi server itself.

The two series of buttons operated on the same logic: when one is activated, all the others are turned off, effective immediately.  
This had the problem of not allowing more than one selection and of rendering the confirm button for the subs irrelevant.  
This was fixed by replicating the logic inside the categories filters component. While effective, it did not sit well with me.

I therefore decided to refactor the code, and conserve only the "final product" of the filters, and confining the actual logic of the buttons in the respective components.  
This had the advantage of achieving a greater separation of concerns, and giving full functionality to the confirm button in the modal.
As an aside, I looked up how you guys implemented the subscription filter functionality and saw that you could select some filters, not apply them, close the modal, re-open it and the app would remember the filters you selected. I am kind of proud of having "unintentionally" achieved the same functionality.  
~~The one difference from your app, however, is that tapping an already selected category filter deselects it instead of doing nothing.~~ I fixed this, it now behaves exactly as your app does.

While we are on the buttons topic, I am irrationally proud of my "all" button implementation. The way the filter works is by generating buttons by mapping the categories on the server, but this left out the "all" category; what I ended up doing was hard-coding a button in front of the collection render and "activating" it when all the other buttons were off.  
Activating the "all" button itself takes advantage of the looping function I wrote: since no button has an id of 0, they will all be turned off, turning then on the "all" button. Silly, I know, but I wanted to include it.

Speaking of the modal, you will notice that it is made as a styled-component; this was't always so.  
Previously it was crafted with pure CSS, but I wanted to play around with some more specific conditions inside styled components.  
It wasn't really worth it, but I appreciated the opportunity to play around with it a bit and familiarize myself with it better.

As for the layout itself, I replicated it almost completely. You will have noticed that the screen is half of the available screen size;  
this is to showcase the scrolling on the categories, and to avoid having a comically large view. I also added a media query to avoid compressing it when going under 800px.

There is only one aspect I could not copy: the top line on each row. I opted for a grid layout, but I could not figure out how to show those borders without a wrapper element, whose implementation itself was more trouble than it was worth.  
I could not figure out an elegant way to do that, so I simply ignored it. Much like product handling, I look forward to seeing how you guys achieved it (maybe it's not even employing grid!)

All in all, I had a great time working on this assignment, and I can't wait to have you guys tear it apart piece by piece. Have fun!

# Versione italiana

## Installazione

1. git clone https://github.com/Osserc/hesse-fullstack-test.git
2. cd hesse-fullstack-test
3. npm i
4. npm run develop
5. Aprire un nuovo terminale nella stessa directory
6. cd react-app
7. npm i
8. npm start

## Dettagli di implementazione

