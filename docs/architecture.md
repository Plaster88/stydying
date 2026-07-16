# Architectural Overview: SecOps Intelligence Assistant

## 1. High-Level Concept
The SecOps Intelligence Assistant is an n8n-based automation workflow designed to triage security logs. It transforms a batch of raw log entries into a classified stream, allowing for automated response actions based on the severity of the log (e.g., separating "ERROR" events from standard "INFO" or "WARN" traffic).

## 2. Workflow Diagram
```mermaid
graph LR
    A[Start] --> B[Edit Fields: JSON Injection]
    B --> C[Set / Code Node: Normalization]
    C --> D[Split Out: Itemization]
    D --> E{IF: Classification}
    E -- True (ERROR) --> F[Code: Critical Action]
    E -- False (INFO/WARN) --> G[Code: Standard Action]
    