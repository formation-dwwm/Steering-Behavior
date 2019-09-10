---
layout: step
title:  "De la nourriture pour véhicule"
part: "Aller plus loin"
order: 8
---

## Extension du problème

> Cette partie sera moins guidée, l'objectif est d'étendre le comportement de notre application en mettant en oeuvre ce que vous avez-vu jusqu'ici.

Maintenant que nous avons mieux pris en main les concepts des comportement de conduite, et que nous avons notre classe Seeker de base et extensible, nous allons ajouter de nouvelles contraintes à notre problème.

Les règles de la nouvelle simulation souhaitée sont :
- Des pions immobiles représentent de la nourriture pour nos agents
- Plusieurs pions de nourriture sont placés aléatoirement sur le plateau de jeu
- Plusieurs agents autonomes sont placés aléatoirement sur le plateau de jeu
- Chaque agent cherche à tout moment à rejoindre la nourriture la plus proche de lui
- Lorsqu'un agent est suffisamment proche d'un élément de nourriture, il le mange et ce dernier disparaît
- Régulièrement de nouveaux pions de nourriture sont aléatoirement placés sur le plateau

**Bonus**
- Chaque agent possède des points de vie
- Les agents perdent des points de vie progressivement avec le temps
- A chaque nourriture ingérée, un agent regagne des points de vie
- (OPTION) Le niveau de vie des agents est représenté par leur couleur variant du vert au rouge

**Super-Bonus**
- En plus de la nourriture, du poison est disposé sur le plateau
- Les agents cherchent à éviter le poison
- Le poison fait perdre des points de vie aux agents lorsqu'il est ingéré

**Hyper-Bonus**
- Afin de d'optimiser les agents, ceux-ci attribuent un poid différent à la force d'attraction de la nourriture et celle de répulsion du poison
- Chaque agent utilise des poids aléatoires pour ces forces (les valeurs aléatoire sont choisies dans un domaine faisant sens pour le problème)


**Epic-Bonus**
- Mettre en place un procédé évolutif afin d'obtenir par le calcul de simulation la meilleure pondération nourriture/poison à employer pour faire vivre nos agents le plus longtemps possible

> **Infos**
> - Parmi les classes utilisables comme base pour nos agents, la classe Seeker sera la plus rapide et est conseillée pour cette partie de l'exercice.
> - Le dossier `assets` contient des images utilisables pour vos sprites (nourriture)

<details>
    <summary>
        SPOILER (Aide)
    </summary>

    Créer une classe Vehicule extends Seeker.
    Créer une équipe de Vehicules.

    Vous pouvez représenter les cibles par des sprites teintés (ex: vert pour la nourriture, rouge pour poison)

    Générer une liste de la nourriture à disposer sur le plateau
    Chaque véhicule seek la nourriture la plus proche
    Distance < 10 => Manger (nourriture disparaît)

    A chaque update, de la nourriture peut apparaître avec une certaine probabilité

</details>

