---
layout: step
title:  "Création de la classe Seeker"
part: "Passage en POO"
order: 3
git_tip: https://github.com/formation-dwwm/Steering-Behavior/tree/step-2
---

Nous aimerions maintenant améliorer notre modèle. En effet, arrivé jusqu'ici, notre véhicule suit effectivement bien notre cible et la rejoint comme désiré, mais comme vous pouvez le constater celui-ci ne s'arrête jamais, et oscille sans fin autour de la cible lorsque cette dernière est statique.

La raison est simple, notre véhicule se déplaçant toujours à vitesse maximale, il n'a aucun moyen de ralentir, et cherche donc à inverser sa vitesse à chaque fois qu'il dépasse sa cible.

Pour régler ceci, il nous faut implémenter un comportement supplémentaire, le comportement "d'approche".

Or notre simulation est actuellement codée de manière très impérative. Ca n'a pas été un problème jusqu'ici, mais devient contraignant si l'on veut implémenter des "variations" de notre véhicule.
Nous allons donc dans un premier temps refactorer notre code de façon à utiliser le paradigme Orienté Objet.

## Création de la classe Seeker

Commencons par créer une classe `Seeker`. Jusqu'ici notre seeker est un Sprite, notre classe devra donc étendre la classe `Phaser.Sprite`.

Le seeker est actuellement créé dans la fonction `create`, lignes 39 à 46, et comme vous pouvez le voir c'est assez verbeux :

```js
sprSeeker = game.add.sprite(game.world.centerX, game.world.centerY, 'imgSeeker');
sprSeeker.anchor.setTo(0.5, 0.5);
game.physics.enable(sprSeeker, Phaser.Physics.ARCADE);

sprSeeker.MAX_SPEED = 240;
sprSeeker.MAX_STEER = 6;
sprSeeker.MAX_SPEED_SQ = sprSeeker.MAX_SPEED * sprSeeker.MAX_SPEED;
sprSeeker.MAX_STEER_SQ = sprSeeker.MAX_STEER * sprSeeker.MAX_STEER;
```

Notre but est de transformer ce code de telle sorte à pouvoir instancer un seeker et remplacer le code précédent par une expression plus succincte :

```js
sprSeeker = new Seeker(game, game.world.centerX, game.world.centerY);
```
Et de la même façon, pouvoir remplacer dans la fonction `update`:

```js
seek(sprSeeker, sprTarget);
```

par

```js
sprSeeker.seek(sprTarget);
```

A vous de jouer !

> **Infos**
> - Pensez à appeler le constructeur de Sprite dans votre constructeur de Seeker. Selon les choix de nommages de vos variables, nous pourrions l'appeler comme suit :
> ```js
> /**
>   * game: L'instance de Phaser.Game actuelle
>   * posX: la position horizontale de notre Seeker
>   * posY: la position verticale de notre Seeker
>   * "imgSeeker": Chaîne de charactères fixe représentant le nom associé à la texture choisie pour notre Seeker
>   */
> super(game, posX, posY, "imgSeeker");
> ``` 
> - Un appel à `game.add.sprite()` fait deux chose: créer le sprite, et l'ajouter à `game`. 
> En utilisant la syntaxe `new Seeker`, nous ne faisons qu'instancier la classe Seeker, il nous faut alors ensuite l'ajouter au jeu. Pour ce faire nous pouvons utiliser la méthode `Phaser.Game.add.existing(object: Phaser.DisplayObject)` en lui fournissant notre nouvelle instance comme argument. La solution retenue a été de déclarer une méthode `Seeker.init(game: Phaser.Game)` qui appelera `game.add.existing(this)`, et qui sera elle-même appellée depuis le constructeur de `Seeker`.
> - De multiples solutions sont possibles, mais dans celle retenue nous avons fait le choix de paramétrer nos véhicules (MAX_SPEED, ...) via des propriétés statiques.
> - Au final, la classe Seeker aura donc au minimum l'interface :
> ```js
> interface ISeeker {
>   static VEC_REF: Phaser.Point;
>   static MAX_SPEED: number;
>   //...
>
>   constructor(game: Phaser.Game, posX: number, posY: number): ISeeker;
>   init(game: Phaser.Game): void;
>   seek(pTarget: Phaser.Sprite): void;
> }
> ```
> - Pensez à mettre à jour les fonctions `create` et `update` !
