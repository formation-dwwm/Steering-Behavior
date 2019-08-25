---
layout: step
title:  "Comportement d'approche simple"
part: "Améliorer les comportements"
order: 5
git_tip: https://github.com/formation-dwwm/Steering-Behavior/tree/step-4
---

Nous sommes maintenant prêts à améliorer notre comportement de suivi. 

Pour rappel, notre problème est qu'actuellement, le véhicule ne s'arrête jamais et oscille sans fin autour de la cible. La raison est simple: quelle que soit la position de notre véhicule nous lui imposons toujours de se déplacer à sa vitesse maximale. Même infiniment près de la cible il se dirigera vers celle-ci à vitesse maximale, la dépassant inévitablement.

En fait, notre véhicule a actuellement bien un comportement de suivi (Seek Behavior) mais pas de comportement d'approche (Arrival Behavior). 
Nous allons donc modifier le calcul de la vitesse désirée pour prendre en compte la distance séparant le véhicule de sa cible.

Une première approche simple serait de continuer à baser la vitesse de notre véhicule sur la distance qui le sépare de la cible [1], mais ensuite de simplement limiter l'intensité du vecteur vitesse désirée à notre MAX_SPEED, plutôt que de le normaliser ([2]) et lui imposer cette même intensité ([3]).

On passe donc de :

> 1. **Vector** (desired velocity) = **Position** (target) – **Position** (vehicle)
> 2. Normalize **Vector** (desired velocity)
> 3. Scale **Vector** (desired velocity) to the *maximum speed*

à :

> 1. **Vector** (desired velocity) = **Position** (target) – **Position** (vehicle)
> 2bis. Limit the magnitude of **Vector** (desired velocity) to the *maximum speed*

De cette façon, plus le véhicule sera proche de la cible, plus sa vitesse sera réduite, et il aura donc une chance de s'arrêter.

Votre travail sera donc d'implémenter ce nouveau comportement, en dérivant une classe `ApproachingSeekerSimple` étendant la classe `Seeker` et dans laquelle il nous suffira de redéclarer la fonction `getDesiredVelocity()`.

> **Infos**
> - Pensez à mettre à jour les fonctions `create` et `update`. 