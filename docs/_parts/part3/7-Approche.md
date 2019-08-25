---
layout: step
title:  "Comportement d'approche amélioré"
part: "Améliorer les comportements"
order: 7
git_tip: https://github.com/formation-dwwm/Steering-Behavior/tree/step-6
---

Maintenant que nous avons de bonne méthodologies pour créer différentes variations de nos véhicules ainsi que pour les distinguer facilement, nous avons le champ libre pour expérimenter.

Entre autres, notre comportement d'approche pourrait être un peu amélioré: a bien regarder le comportement du véhicule, celui-ci commence à ralentir très tôt, et peut donc mettre un certain temps à rejoindre la cible.

Ceci se comprend bien: nous prenons maintenant bien en compte la distance par rapport à la cible, mais nous nous y référons constamment, même lorsque celle-ci est relativement grande.

Pour palier à cela, l'algorithme d'approche utilisé par Reynolds est un tout petit peu plus poussé que notre algorithme actuel. Il rajoute en effet une variable, représentant la distance minimale pour laquelle le véhicule commence à ralentir.
Cette distance minimale peut être conceptualisée comme un cercle autour de la cible, *hors* duquel notre véhicule avance à MAX_SPEED, et *dans* lequel sa vitesse diminue linéairement avec la distance à la cible.

> **Arrival Behavior**
>  ![]({{ "img/arrival.gif" | relative_url }})
> Arrival behavior is identical to seek while the character is far from its target. But instead of moving through the target at full speed, this behavior causes the character to slow down as it approaches the target, eventually slowing to a stop coincident with the target, as shown in Figure 6. The distance at which slowing begins is a parameter of the behavior. This implementation is similar to seek: a desired velocity is determined pointing from the character towards the target. Outside the stopping radius this desired velocity is clipped to max_speed, inside the stopping radius, desired velocity is ramped down (e.g. linearly) to zero.
> ```pseudo
>    target_offset = target - position
>    distance = length (target_offset)
>    ramped_speed = max_speed * (distance / slowing_distance)
>    clipped_speed = minimum (ramped_speed, max_speed)
>    desired_velocity = (clipped_speed / distance) * target_offset
>    steering = desired_velocity - velocity
>```
> Real world examples of this behavior include a baseball player running to, and then stopping at a base; or an automobile driving towards an intersection and coming to a stop at a traffic light.
> 
> -- [Steering Behaviors For Autonomous Characters](http://www.red3d.com/cwr/steer/gdc99/), Craig W. Reynolds


En se basant sur ces informations, créer une classe `ApproachingSeeker` basée sur `Seeker` et utilisant cette troisième version de l'algorithme de comportement. Dans la solution proposée, le choix a été fait de stocker la distance minimale dans une variable statique `ApproachingSeeker.SLOWING_DISTANCE_THRESHOLD`, mais d'autres solutions sont possibles.

Comparez ensuite le comportement de vos trois agents différents.
Identifiez les avantages de la POO pour ce type de développement.
Enfin, expérimentez !