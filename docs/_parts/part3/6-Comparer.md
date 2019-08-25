---
layout: step
title:  "Comparer"
part: "Améliorer les comportements"
order: 6
git_tip: https://github.com/formation-dwwm/Steering-Behavior/tree/step-5
---

Si tout s'est bien passé, nous avons maintenant deux classes implémentant le comportement de conduite, dont une ayant aussi un comportement d'approche.
Il serait appréciable maintenant de pouvoir comparer ces deux classes simultanément.

Pour ce faire, il nous suffit fondamentalement de créer une instance de chacune de ces classes dans notre fonction `create`, puis appeler leurs méthodes `seek` respectives depuis la fonction `update`.

Afin de pouvoir mieux distinguer nos différents acteurs, nous allons utiliser une astuce proposée par PhaserJS. Actuellement, chacun de nos vehicules est représenté par une flêche blanche. Nous pourrions choisir d'utiliser différentes textures pour chacun d'entre eux, mais ceci nous demanderait de réaliser (ou collecter) ces mêmes textures, et s'ajouteraient alors à la charge des ressources nécéssaires à notre application.

Une solution plus optimisée serait de simplement attribuer différentes couleurs à nos véhicules pour les distinguer. Là aussi ceci pourrait être réalisé avec de multiples textures et leurs couleurs associées, mais l'on retomberait dans la problématique précédente.
Une solution proposée par PhaserJS est de pouvoir appliquer dynamiquement une teinte aux entités de type `Phaser.Sprite`. C'est d'ailleurs la raison pour laquelle nous avons choisi une flèche blanche jusqu'ici: le blanc étant représenté (en RGB) par une quantité maximale de rouge, de vert et de bleu, c'est la couleur la plus facile à teinter.

Chaque `Phaser.Sprite` a une propriété `tint`, valeur numérique exprimée en hexadécimal. Dans l'exemple suivant, nous créons un sprite puis teintons sa texture en rouge (#ff0000);

```js
const sprite = new Phaser.Sprite(/* ... */);
sprite.tint = 0xff0000;
```

Plusieurs implémentations sont possibles pour tirer partie de cette idée dans notre programme. La solution choisie ici a été de modifier le constructeur de notre classe `Seeker` pour lui ajouter un argument color, et réassigner `this.tint` depuis ce même constructeur. Par empathie avec nos futurs nous-même, cet argument `color` a été défini comme optionnel avec une valeur par défaut à `0xffffff`, ce qui effectivement signifie "aucune teinte".

Réalisez ces changements dans votre code, puis instancer un véhicule de chaque classe avec une couleur différente depuis la fonction `create`.
Ceci vous permettra de mieux distinguer les deux véhicules et leurs comportements associés.