# SecOps Intelligence Assistant

An automated, zero-cost production pipeline for real-time security threat intelligence triage. Designed for SOC environments to automate repetitive analysis and expedite incident response.

## Overview
The SecOps Intelligence Assistant eliminates manual overhead by automating the threat intelligence lifecycle. It ingests scheduled security events, enriches them with IP reputation data, and performs intelligent triage to dispatch alerts only for high-priority threats.

## Workflow Architecture
The pipeline is built on **n8n** and consists of the following modular stages:

1. **Daily Intelligence Intake**: A scheduled trigger that initiates the workflow, simulating the start of a security operation shift.
2. **Fetch IP Reputation**: Queries external intelligence APIs to retrieve context on suspicious IP addresses.
3. **Normalize Data Schema**: Maps raw API output into a standardized, structured JSON format for consistent analysis.
4. **Threat Triage Engine**: Employs conditional logic (`If` nodes) to evaluate traffic risk based on business rules.
5. **Dispatch Security Alert**: Automatically triggers an outbound webhook notification upon detection of a security incident.

## Key Features
* **Automated Triage**: Reduces analyst fatigue by filtering legitimate traffic and alerting only on defined threats.
* **Zero-Cost Infra**: Optimized for lightweight, cost-effective infrastructure without reliance on enterprise-grade payment tiers.
* **Observability**: Real-time visibility into the incident response pipeline via Webhook monitoring.
* **Extensible**: Designed for modularity; alerting endpoints can be swapped (Slack, Email, PagerDuty, etc.) without reconfiguring core logic.

## Getting Started

### Prerequisites
* [n8n](https://n8n.io/) instance (Self-hosted or Cloud).
* Access to a webhook listener (e.g., [Webhook.site](https://webhook.site/)) for demo output verification.

### Configuration
1. **Import Workflow**: Import the provided JSON workflow file into your n8n instance.
2. **Pipeline Nodes**:
   - **Daily Intelligence Intake**: Configure the trigger intervals to match your demo cycle (e.g., 08:00 AM).
   - **Fetch IP Reputation**: Configure the HTTP request to your preferred threat intelligence source.
   - **Dispatch Security Alert**: Update the target URL with your designated endpoint (e.g., Webhook.site).
3. **Deploy**: Publish the workflow and verify execution outputs in the n8n monitor.

## License
MIT
