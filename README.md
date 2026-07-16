# SecOps Intelligence Assistant PoC

## Overview
This Proof-of-Concept (PoC) project implements an automated SecOps Intelligence Assistant designed to streamline log analysis. The primary goal is to automate log triage by classifying incoming log entries and routing critical errors for immediate attention, while filtering out routine operational noise.

## Features
- **Automated Log Triage**: Intelligent routing of log entries based on severity levels (ERROR vs INFO/WARN).
- **Workflow Pipeline**: Utilizes an iterative processing pipeline: Start → Edit Fields → Split Out → IF logic.
- **Operational Efficiency**: Reduces manual overhead by ensuring critical incidents trigger appropriate notification paths.

## Architecture
The workflow is built within [n8n](https://n8n.io/) and follows this logical structure:
1. **Input**: JSON-based log data injection.
2. **Processing**: Log items are split into individual execution streams for granular analysis.
3. **Classification**: Conditional logic filters logs to separate "ERROR" levels from standard operational data.

## Getting Started
To import this workflow into your local n8n instance:
1. Ensure your n8n environment is configured and running.
2. Navigate to the `workflows/` directory in this repository.
3. Copy the content of the `.json` file.
4. In n8n, create a new workflow, select "Import from File" or paste the JSON directly into the editor.

## Project Status
- **Phase 1**: Base workflow skeleton and logic implementation.
- **Phase 2**: (In Progress) Integration with external log sources and notification systems.
