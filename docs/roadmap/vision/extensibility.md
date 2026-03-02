# Open Core & Extensibility

- **Core:** App types, service packages, expansion commands — open source
- **Premium add-ons:** Advanced UI systems, enterprise templates, vertical presets
- **Community:** Custom stubs via `stubs/app-types/<id>/expansion/` override
- **Extensibility:** New app types and packages follow the same patterns

## Technology Alignment

- **Effect** and **registry** are extensible: new packages register; Effect layers compose. Registry pattern supports custom stubs.
- **Implementation implication:** Override stubs via `stubs/`; new packages follow PackageConfig + registry pattern.
- **Alternative philosophy:** Prompt-heavy (AI infers extensibility) vs structure-heavy (registry + stubs enforce) — structure-heavy enables override.
