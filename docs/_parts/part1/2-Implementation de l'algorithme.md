---
layout: step
title:  "Implémentation de l'algorithme"
part: "Seek Behavior"
order: 2
git_tip: https://github.com/formation-dwwm/Steering-Behavior/tree/step-1
---

## Travail à réaliser

Une base de code vous est fournie, sur laquelle nous allons pouvoir itérer.

Le véhicule sera représenté par une flèche, et la cible par un cercle bleu. A chaque instant la cible est placée sous le curseur de votre souris, et le but de la flèche est donc de la rejoindre.

L'application est très restreinte, son arborescence est la suivante :
- `assets/` 
  --> Images utilisées pour la simulation
- `docs/` 
  --> Cette documentation
- `index.html` 
  --> Fichier html racine à ouvrir dans votre navigateur
- `phaser.min.js` 
  --> Le code réduit de PhaserJS, librairie utilisée pour la simulation
- `script.js` 
  --> Le fichier de script principal de notre application, c'est ici que vous interviendrez principalement

  La version de [PhaserJS](https://phaser.io) utilisée ici est assez ancienne (2.2.9), vous pouvez donc vous baser sur la [documentation de sa version 2](https://phaser.io/docs/2.2.2/index) pour vous aider. Cela tombe bien, c'est la mieux documentée...

## Implémentation de l'algorithme

La version de base du fichier `script.js` vous fournit l'ensemble nécessaire au contexte de notre simulation.

Ouvrez le fichier `index.html` dans votre navigateur ainsi que ce dossier (ou a minima le fichier `script.js`) dans votre éditeur de code.

L'ensemble du système de simulation avec Phaser est déjà mis en place. La fonction `preload` charge les textures de la simulation en mémoire, la fonction `create` prépare la scene en configurant Phaser, créant les acteurs de base et démarrant la simulation physique. Ces deux fonctions sont appelées automatiquement au lancement de notre application Phaser.
Vient ensuite la fonction `update`, qui sera appelée à chaque image ("frame") de notre simulation, et qui nous servira à mettre à jour l'état de l'ensemble de nos acteurs.

C'est dans cette fonction `update` qu'est notamment appelée la fonction `seek`, qui nous intéresse ici.
Le rôle de cette fonction est, partant d'un véhicule et d'une cible, de déterminer la nouvelle vitesse du véhicule pour l'image courante. 
C'est donc bien ici que vient s'insérer notre algorithme de comportement de conduite. La structure de celui-ci a été rappellée en commentaires.

Votre mission, si vous l'acceptez, sera donc d'implémenter cette fonction `seek` à l'aide de notre modélisation et pseudo-code précédents ainsi que des fonctionnalités de PhaserJS. Son squelette est déjà présent.

Une fois fait, vous devriez voir sur votre page la flèche blanche se diriger invariablement vers votre curseur.

> **Infos**
> - Notre véhicule a déjà des propriétés constantes fixées: (pVehicle).MAX_SPEED, MAX_STEER, ainsi que leurs versions "carrées" MAX_SPEED_SQ et MAX_STEER_SQ 
> - Deux arguments sont passés à la fonction `seek`: pVehicle et pTarget, représentant le véhicule et notre cible respectivement. Ces deux objets sont des [Phaser.Sprite](https://phaser.io/docs/2.2.2/Phaser.Sprite.html).
> - Les **Sprite** ont notamment les propriétés interessantes suivantes:
>   - *Spr*.position
>   - *Spr*.body.velocity   (du fait de la simulation physique ajoutée)
> - Ces propriétés sont des [Phaser.Point](https://phaser.io/docs/2.2.2/Phaser.Point.html) (en réalité position est un PIXI.Point, une classe "au dessus" dans la chaîne), et représentent donc des **vecteurs**.
> Javascript ne sachant pas nativement faire des opérations entre des vecteurs, il nous faudra donc utiliser l'API de Phaser et notamment des Phaser.Point afin de réaliser ces calculs.
> Sans plus de détails, la documentation des méthodes suivantes pourra certainement vous orienter :
> <kbd>Point.add</kbd>, <kbd>Point.subtract</kbd>, <kbd>Point.multiply</kbd>, <kbd>Point.normalize</kbd>, <kbd>Point.getMagnitudeSq</kbd>, <kbd>Point.setMagnitude</kbd>
> - Certaines valeurs ont été élevées au carré, en effet, la fonction racine carée étant assez lente, afin de ne pas l'appeller à chaque image une pratique courante est de comparer des vitesses au carré plutôt que des vitesses exactes (mathématiquement, avec a > 0 et b > 0 si a > b alors a² > b²).