graph TD
    A[Daily Intelligence Intake] --> B[Fetch IP Reputation]
    B --> C[Normalize Data Schema]
    C --> D[Threat Triage Engine]
    D -- True --> E[Dispatch Security Alert]
