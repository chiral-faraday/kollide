# Cypher Queries

**Date:** 2026-04-21
**Scope:** Early-stage electronics Zettelkasten / graph-native knowledgebase
**Focus entity example:** 1N4148 small-signal diode

# Current Graph Contents

## Core identity layer

### `:PartDesignation`

A single canonical node exists:

* `mpn: "1N4148"`
* `description: "Fast-switching small-signal diode"`

#### Meaning
This represents the *abstract, standardized identity* of an electronic component type as defined by its manufacturer part number (MPN).

## Component classification layer

### `:ComponentType`

* `name: "Small signal diode"`

#### Meaning
A general electrical category describing functional behavior, not a specific part number.

## Physical/manufacturer layer

### `:Manufacturer`

* Example: `Diotec Semiconductor`

### `:ManufacturerPart`

A detailed physical implementation of the 1N4148 exists with properties such as:

* forward voltage
* reverse recovery time
* surge current
* package type
* datasheet reference

#### Meaning
This represents a *real-world manufacturable instance* of a part designation.

## Knowledge layer (Zettelkasten notes)

### `:Note`

Contains atomic knowledge such as:

* behavioral properties of 1N4148
* usage constraints (switching vs rectification)

#### Meaning
Human-curated knowledge linked to technical entities, enabling reasoning and explanation.

## Legacy / transitional artifact (to be avoided going forward)

* No stable `:PART` node should remain conceptually relevant
* Any prior `:PART` usage has been superseded by `:PartDesignation`

## What the graph *means overall*

The system now encodes a **three-layer electronics knowledge model**:

### Layer A — Identity (Stable Reference Layer)

> “What is this part number?”

* `PartDesignation`

This is:

* unique per MPN
* immutable identity anchor
* enforced by uniqueness constraint

## Layer B — Physical Reality (Variability Layer)

> “What does a manufacturer actually produce?”

* `ManufacturerPart`
* manufacturer-specific specs
* tolerances, limits, packaging, datasheet metadata

This layer captures:

* real-world variation
* non-uniform specifications across vendors
* engineering constraints

## Layer C — Knowledge (Interpretation Layer)

> “What do we know about it?”

* `Note`

This layer provides:

* human interpretation
* usage guidance
* engineering insights
* contextual understanding

## Constraints and invariants

### Identity constraint (critical rule)

```cypher
ASSERT p:PartDesignation(mpn) IS UNIQUE
```

#### Meaning:

* One and only one node per MPN
* `mpn` functions as a **primary key**

## Implied invariants (system rules)

1. `PartDesignation` nodes must never be duplicated
2. All new parts must attach to existing or newly MERGED designations
3. Manufacturer-specific variation must never pollute identity layer
4. Notes must attach to stable nodes only

## Why this structure exists (design rationale)

### Preventing identity collapse

Early iterations showed:

* duplicate `PartDesignation` nodes
* conflicting `PART` vs `PartDesignation` semantics

This led to the decision:

> Separate identity from implementation explicitly

---

## Modeling real electronics correctly

In electronics:

* “1N4148” is not a single physical object
* it is a **specification family**

Thus:

| Concept             | Graph representation |
| ------------------- | -------------------- |
| Standard identity   | PartDesignation      |
| Physical variant    | ManufacturerPart     |
| Functional category | ComponentType        |
| Knowledge           | Note                 |

---

## Avoiding schema rigidity

Instead of enforcing a rigid ontology upfront, the system:

* evolved from observed duplication
* converged toward minimal stable primitives

This ensures:

* flexibility during exploration
* stability after convergence

## Implications for creating new data

### Mandatory write rule: identity-first creation

#### INCORRECT:

```cypher
CREATE (p:PartDesignation {mpn:"1N4148"})
```

#### CORRECT:

```cypher
MERGE (p:PartDesignation {mpn:"1N4148"})
```

## New data must follow layered insertion

### Step 1 — Identity layer

* `PartDesignation` (MERGE only)

### Step 2 — Physical layer

* `ManufacturerPart`

### Step 3 — Knowledge layer

* `Note`

## No direct mixing of layers

Forbidden patterns:

* Manufacturer specs directly on `PartDesignation`
* Notes attached to `ManufacturerPart` without reason
* duplicate identity nodes

## Expected evolution behavior

When adding new components:

* duplicates should never appear
* all MPNs resolve to exactly one node
* variation lives only in manufacturer layer

## System objectives

### Primary objective

Build a **graph-native electronics knowledgebase** where:

* components are uniquely identifiable
* variation is explicitly modeled
* knowledge is structurally linked

### Secondary objectives

* Support Zettelkasten-style atomic knowledge notes
* Enable reasoning across components (substitution, comparison)
* Allow schema evolution without breaking identity integrity

## Long-term objective

Transform the graph into a system that can answer:

* “What can replace this part?”
* “Why is this component used here?”
* “Which variants meet these constraints?”
* “How do electrical properties propagate across designs?”

## Design rationale summary

The key architectural decision is:

> **Identity must be separated from physical instantiation**

This leads to:

* stable querying
* scalable schema evolution
* elimination of duplication drift
* clean reasoning over components

## Current system maturity stage

The system is now in:

> **Stage 2: Stabilized Identity Graph**

Stages:

1. Exploratory graph (duplicates, evolving meaning)
2. Stabilized identity layer ✔
3. Rich relational reasoning (next stage)
4. Inference / recommendation layer (future)

## Next recommended evolution step

The next meaningful structural addition is:

> formalizing relationships such as:

* `SUBSTITUTABLE_WITH`
* `EQUIVALENT_TO`
* `PREFERRED_IN_APPLICATION`

These will turn the graph from a **catalog** into a **decision system**.

If you want, I can next produce a **formal “Graph Write Protocol v1”** (like a specification document) that your IDE/backend can enforce automatically so that:

* duplicates become impossible
* MERGE is enforced consistently
* notes and manufacturer data always attach correctly
