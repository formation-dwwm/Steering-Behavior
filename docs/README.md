# Intelligence Artificielle - Algorithmie

## Steering Behavior

> Basé sur les ressources :
> https://www.askforgametask.com/tutorial/steering-behaviors-seek/


Ce document propose une implémentation HTML5 du Seek Steering Behavior (Comportement de recherche de direction) dans lequel un véhicule (seeker) se déplace de manière réaliste vers une cible.

Les Steering Behaviors sont des algorithmes d'intelligence artificielle permettant à des agents autonomes de se déplacer de manière réaliste. Ils sont développés par [Craig Reynolds](http://www.red3d.com/cwr/steer/). Plus d'informations sur la théorie derrière ces algorithmes sont disponibles sur son site.

Le premier comportement que l'on va traiter ici est l'algorithme Seek, soit de recherche.


## Démo en ligne

Notre première étape nous amènera au résultat suivant, disponible en ligne :

[Live Demo](https://www.askforgametask.com/html5/tutorials/steer/steer_01_seek.html)


## Problème

On cherche ici à animer un acteur, par exemple un véhicule, de telle sorte à ce que celui-ci se déplace pour rejoindre un point particulier dans l'espace.

Afin de réduire le problème nous nous restreindrons ici à deux dimensions, et nous placerons dans un cas où nous pouvons intéragir immédiatement avec la vitesse de nos objets. A tout moment la position et vitesse de l'ensemble des objets de la simulation peut-être connu.

## Modélisation et pseudo-code

Nous utiliserons ici un véhicule pour représenter notre agent autonome. Dans les schémas suivants, celui-ci est noté "Vehicle", et la cible "Target".
Un véhicule aura une vitesse maximale de déplacement, ainsi qu'une vitesse maximale de changement de direction.

### Etapes 1-3: Calcul de la vitesse désirée

A chaque instant de la simulation nous connaissons la position de notre véhicule ainsi que de sa cible.

Nous pouvons donc connaitre la distance qui sépare notre véhicule de cette cible, ainsi que la direction dans laquelle il nous faudrait se déplacer (en ligne droite !) afin de la rejoindre.

En soustrayant la position du véhicule à celle de notre cible, l'on obtient un vecteur représentant le mouvement que devrait effectuer notre véhicule pour rejoindre sa cible [1].
Si l'on normalise ce vecteur (garder son sens et direction mais ramener sa norme [longueur] à 1), nous obtenons donc la direction à suivre [2].
Il nous reste à multiplier ce dernier vecteur normé par la vitesse maximale de notre véhicule afin d'obtenir la vitesse désirée [3].

![](img/steer_seek_fig1.png)

> 1. **Vector** (desired velocity) = **Position** (target) – **Position** (vehicle)
> 2. Normalize **Vector** (desired velocity)
> 3. Scale **Vector** (desired velocity) to the *maximum speed*

### Etapes 4-5: Calcul de la force de direction

En plus de connaitre les positions de nos objets, nous connaissons aussi leur vitesses. Notre véhicule lui-même a, à chaque instant, une vitesse courante mesurable (current velocity), avec sa propre direction et intensité.

Les changements d'orientation de notre véhicule sont modelisés par une force de changement de direction, qui nous permet de représenter le comportement de conduite. Notre véhicule possède une valeur maximale pour cette force de changement de direction, qu'il ne devra donc pas pouvoir dépasser.

Conceptuellement, cette force représente le changement de direction que l'on veut voir notre véhicule réaliser.
Nous pouvons donc la calculer comme étant la différence entre la vitesse désirée et la vitesse actuelle [4], puis en limitant l'intensité de ce vecteur à la force maximale du véhicule [5].

![](img/steer_seek_fig2.png)

> 4. **Vector** (steering force) = **Vector** (desired velocity) – **Vector** (current velocity)
> 5. Limit the magnitude of **Vector** (steering force) to the maximum force

### Etapes 6-7: Calcul de la nouvelle vitesse

Connaissant notre vitesse de déplacement actuelle ainsi que la "force" à appliquer à celle-ci pour s'orienter vers notre vitesse désirée, nous pouvons calculer la nouvelle vitesse instantanée.

Celle-ci est en effet la somme de notre vitesse actuelle ainsi que de la force de changement de direction [6], limitée par la vitesse maximale de notre véhicule [7].

![](img/steer_seek_fig3.png)

> 6. **Vector** (new velocity) = **Vector** (current velocity) + **Vector** (steering force)
> 7. Limit the magnitude of **Vector** (new velocity) to the maximum speed


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

### 1. Implémentation de l'algorithme

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