# Deep Research - Repeatable and Persistent
We seek to develop a deep research process which utilizes Claude Code subagents who will write to a local PostgreSQL database so that we might form a foundation of research facts which may grow into a comprehensive resource

1. Subagents record "Assertions" and "Entities"
2. Human researcher validates Assertions, these default to "Claim" and progress to "Evidence" only when the huamn researcher validates the claim
3. Goal of research is to identity Entities and form Assertions by observing claims made about those entities; for example: If we are reseaching Agentic SDLC tools then the obvious choice for "Entities" would be "Tools"; subagents will record each tool as an Entity and record claims as Assertions

## Pattern
1. Web search to discover relevant Entities, cast a broad net, this is a discovery, fact finding efort
2. Tool calling to search existing Entities
3. Existing Entities Assertions are refined as new data is discovered
4. New Entities Assertions are made as new Entities are discovered
5. Entitiess are supported by Evidence and Reasoning always backed by a relevant Source (URL)
6. Prior Evidence and Reasoning are considered when reviewing previously recorded Entities to ensure we only make meaningful additions or updates to Assertions and Reasoning - we only modify a Assertion or Reasoning when new and compelling data is discovered
7. Sources are recorded, sourced defaul to Proposed and progress to Validated only when huamn researcher validates the source
8. Research workflow is either "Discovery" where we cast a net and refine to identify Entities OR research workflow is "Analsysis" where we focus in on a given Entity

## Discovery
1. Deep web search, avoid early value judgement, focus on claims, prioritize vendor documentation, publicity and presentations; strongly consider community discussion, lens should be focused on "does this Entity match our search criteria?" and not focused on the veracity of claims

## Analysis
1. Deep dive into the efficacy of the Entity's claims