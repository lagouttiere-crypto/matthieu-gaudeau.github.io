---
title: Subsomption
tags:
  - brooks
  - robotique
  - affordance
  - énaction
  - technique-alexander
---

# Subsomption

## Prendre le relais sans remplacer

Le concept de **subsomption** émerge de la robotique des années 1980 avec Rodney Brooks. Contrairement aux architectures hiérarchiques classiques où chaque niveau traite des "caractéristiques" pour les envoyer au niveau supérieur, l'architecture de subsomption propose que **chaque niveau soit fonctionnel en soi**.

Subsumer (du latin _subsumere_ : prendre dessous, inclure) signifie **prendre le relais tout en intégrant** : une couche supérieure utilise les fonctionnalités de la couche inférieure qui reste active, ajoute un niveau de contrôle supplémentaire, et peut moduler ou inhiber selon le contexte — mais ne remplace jamais.

---

## L'exemple du robot de Brooks

**Couche 1** (évitement d'obstacles) :

- Un sonar calcule une force répulsive si un mur est devant
- Cette couche est **fonctionnelle seule** — le robot évite les murs

**Couche 2** (déambulation) :

- Choisit une direction aléatoire à intervalles réguliers
- **Subsume** la couche 1 : combine sa direction avec la force du sonar
- La couche 1 continue de fonctionner, la couche 2 prend le relais du contrôle global

**Couche 3** (exploration) :

- Subsume les deux couches précédentes
- Ajoute des objectifs de navigation tout en préservant évitement et déambulation

**Principe clé** : À chaque niveau, l'ensemble des couches inférieures forme un système fonctionnel. Ce n'est jamais "en attente" du niveau supérieur pour avoir un sens.

La **morphological computation** prolonge cette idée ([[Concepts/Images-soft-robots|voir exemples visuels]]) : la structure physique du robot...

---

## Subsomption et [[Affordance|affordances]]

Si chaque niveau doit être fonctionnel, alors **ce qu'il perçoit ne peut pas être de simples "caractéristiques"** (contours, couleurs, intensités) qui n'ont de sens qu'une fois assemblées. Ce doit être des **affordances** : des possibilités d'interaction.

La couche d'évitement d'obstacles ne perçoit pas "une surface verticale à 2 mètres". Elle perçoit directement l'affordance "blocage du passage" qui déclenche une force répulsive. Cette affordance est **élémentaire**, pas dérivée.

James Gibson défendait l'idée que nous percevons **directement** les affordances. Cette affirmation prend tout son sens avec la subsomption : si les systèmes sensoriels fonctionnent comme des architectures de subsomption, alors **les affordances sont la base, pas le résultat final** de la perception.

---

## L'homme et le cheval : une analogie de la subsomption

Imaginons un cavalier aveugle sur un cheval. Le cheval est **parfaitement fonctionnel en soi** : il voit, il sent le terrain, il ajuste son équilibre, il évite les obstacles. Le cavalier **subsume** le cheval : il lui donne des directions, reçoit des signaux (nervosité, arrêt), mais n'a **aucun accès direct** aux sensations brutes du cheval.

Si un mur bloque le passage, le cheval s'arrête, devient nerveux. Le cavalier ne voit pas le mur, ne sent pas le sol comme le cheval, mais il **perçoit l'affordance "blocage"** via les réactions corporelles du cheval.

**Principe** : Le cavalier perçoit des affordances (blocage, nervosité, fluidité) sans accès aux sensations élémentaires qui les sous-tendent. Ces sensations restent actives dans le cheval, mais elles sont **subsumées** par le niveau de contrôle du cavalier.

---

## Subsomption et évolution

D'un point de vue évolutif, cette architecture fait sens. Lorsqu'une nouvelle structure apparaît (par exemple, le cortex chez les mammifères), elle s'ajoute à un ensemble de structures existantes qui **avaient déjà une fonction**. Le tronc cérébral coordonne la respiration, le tonus, les réflexes — c'est un système complet. Le cortex vient **subsumer** ces fonctions : il ajoute de la complexité, de l'intentionnalité, mais ne remplace pas.

Chaque niveau évolutif subsume le précédent sans l'effacer. Les affordances perçues par les niveaux inférieurs restent actives et continuent d'informer le système.

---

## Robotique morphologique et _soft robotics_

La **morphological computation** (calcul morphologique) prolonge cette idée : la structure physique du robot — sa déformabilité, ses matériaux, sa géométrie — **fait partie du système de contrôle**, pas seulement le logiciel.

**Exemples** :

- **Robots souples** (silicone, tissus pneumatiques) : la déformation elle-même encode de l'information et résout des problèmes de contrôle
- **Passive dynamic walkers** : robots bipèdes sans moteurs qui marchent grâce à leur géométrie et la gravité
- **Octobots** : exploitent la compliance des matériaux pour naviguer — la proprioception émerge de la déformation physique

Dans ces systèmes :

- La **structure physique déformable** = le cheval (fonctionnel en soi)
- Le **contrôleur de haut niveau** = le cavalier (qui subsume)
- Les **déformations matérielles** = les sensations que le cavalier ne perçoit pas directement, mais dont il perçoit les affordances

Le corps n'est pas un simple exécutant mais un **participant actif** dans la cognition, par sa structure même (Varela, Pfeifer).

---

## Subsomption et [[Geste]]

Le [[Geste]] opère selon une logique de subsomption. Les niveaux infra-intentionnels (tonus, réflexes, anticipation gravitaire) restent actifs et ne sont pas "dépassés" par la volonté consciente — ils sont **subsumés** par elle.

**Hypothèses et implications pour la pédagogie énactive** :

1. **L'inhibition alexandrienne** n'est pas un blocage mais une **modulation de la subsomption** — on change le couplage sans écraser les niveaux inférieurs

2. **Les affordances proprioceptives** restent actives et continuent d'informer le système — comme le cheval qui sent le terrain pendant que le cavalier dirige

3. **L'apprentissage** ne consiste pas à "reprogrammer" les réflexes mais à **enrichir les couches de subsomption** — ajouter de nouvelles modalités de coordination sans perdre les anciennes

4. **La [[Voix médiane]]** prend tout son sens : le sujet n'agit pas _sur_ son tonus mais _avec/à travers_ lui, en tant que couche subsumée qui reste agent

---

## Subsomption et coordination

Chez **Bernstein**, les synergies ne sont pas des "commandes" où chaque muscle est contrôlé individuellement — ce sont des patterns coordinatifs qui **subsument** les degrés de liberté.

Chez **Godard**, les pré-mouvements ne disparaissent pas avec l'action volontaire — ils sont subsumés par elle. La fonction tonique reste active sous l'action intentionnelle.

Le [[Contrôle-Primaire]] en Technique Alexander opère ainsi : on ne "tient" pas sa posture (contrôle actif), on ne s'abandonne pas (passif) — on permet qu'une organisation émerge par **subsomption des niveaux toniques et gravitaires**.

---

## Subsomption et conscience

Si la conscience fonctionne par subsomption, alors **ce que nous percevons directement** (nous = notre moi conscient) n'est pas constitué de "sensations brutes" mais d'**affordances**.

Le cavalier conscient ne sent pas le sol comme le cheval, mais il perçoit "passage fluide", "résistance", "blocage". Ces affordances émergent de la subsomption de niveaux sensoriels auxquels la conscience n'a pas d'accès direct — et elle n'en a pas besoin pour fonctionner.

La [[Récursivité]] s'exprime ici : les affordances perçues par les niveaux supérieurs reconfigurent le couplage des niveaux inférieurs, qui reconfigurent les affordances perçues.

---

## Liens

- [[Affordance]] — possibilités d'action directement perçues
- [[Geste]] — organisation émergente qui subsume les niveaux infra-intentionnels
- [[Voix médiane]] — ni actif ni passif, mais médian
- [[Récursivité]] — boucle perception-action
- [[L'expérience de la chute]] — perception directe des affordances gravitaires

---

_"Si chaque niveau doit être fonctionnel, alors ce qu'il perçoit ne peut pas être de simples caractéristiques, mais des affordances."_
