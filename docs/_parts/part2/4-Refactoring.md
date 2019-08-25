---
layout: step
title:  "Refactoring de la méthode Seek"
part: "Passage en POO"
order: 4
git_tip: https://github.com/formation-dwwm/Steering-Behavior/tree/step-3
---

Nous venons de créer une classe Seeker dans l'idée de pouvoir ensuite facilement créer des variations de celle-ci. En POO, des "variations de classes" sont souvent implémentées par le mécanisme d'héritage dans lequel des classes enfants vont étendre une classe parent.

De l'ensemble des méthodes implémentées pour notre classe Seeker, c'est ici la fonction `seek` qui est responsable du Seek Behavior utilisé. Ce sont ultimement des variations de ce comportement précis que nous cherchons à créer. Naïvement, c'est donc l'ensemble de la fonction `seek` qui serait successivement remplacée (`override`) par nos futures classes enfant.

Actuellement, le comportement de suivi est donc implémenté en un seul gros bloc représenté par la méthode `seek`. Si l'on y regarde bien, celle-ci a en réalité de multiples responsabilités.
On peut actuellement dériver son comportement en quatre étapes :
- Calcul de la vitesse désirée
- Calcul de la vitesse de changement de direction
- Mise à jour de la vitesse actuelle
- Mise à jour de la rotation du véhicule

Chacune de ces étapes représente une responsabilité différente, et il serait intéressant de pouvoir les modifier individuellement.
De façon à pouvoir étendre plus finement notre classe `Seeker` et notamment son comportement de suivi, nous allons donc refactorer (changer l'expression sans changer le comportement) la méthode `seek`.
Comme nous souhaitons pouvoir modifier ces quatre responsabilités indépendamment les une des autres, tout en minimisant la duplication de code, nous allons extraire ces quatres "blocs" de code de la fonction `seek` pour les remplacer par des fonctions respectives.

L'idée est donc de passer de ceci :

```js
class MyClass {

    doEverything(){
        // First, do something
        /** Code that does something **/

        // Then, do something else
        /** Code that does something else **/

        // Finally, do this last thing
        /** Code that does this last thing **/
    }

}
```

à ceci :

```js
class MyClass {

    doEverything(){
        this.doSomething();

        this.doSomethingElse();

        this.doThisLastThing();
    }

    doSomething(){
        /** Code that does something **/
    }

    doSomethingElse(){
        /** Code that does something else **/
    }

    doThisLastThing(){
        /** Code that does this last thing **/
    }

}
```

> **Note**
> Ce procédé est très courant en POO, et amène à créer plus de fonctions mais dont les responsabilités sont mieux découpées, chacune d'entre-elle se retrouvant alors plus courte et moins complexe. C'est le plus souvent considéré bonne pratique (ça ne doit pas non plus devenir une fin en soit, le but final reste la qualité et maintenabilité du code).


Suite à ce refactoring, notre classe Seeker devrait avoir une interface semblable à celle-ci :
 ```js
 interface ISeeker {
   static VEC_REF: Phaser.Point;
   static MAX_SPEED: number;
   //...

   constructor(game: Phaser.Game, posX: number, posY: number): ISeeker;
   init(game: Phaser.Game): void;
   seek(pTarget: Phaser.Sprite): void;

   getDesiredVelocity(pTarget: Phaser.Sprite): Phaser.Point;
   getSteeringForce(vecDesired: Phaser.Point): Phaser.Point;
   setNewVelocity(newVelocity: Phaser.Point): void;
   lookAhead(): void;
 }
 ```
